const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const os = require('os');
// Ensure a WebSocket implementation is available for supabase realtime on Node < 22
if (typeof global.WebSocket === 'undefined') {
  try {
    global.WebSocket = require('ws');
  } catch (e) {
    // 'ws' may not be installed in some environments — realtime features may fail without it.
  }
}

const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;
const rootDir = __dirname;
const dataDir = path.join(rootDir, 'data');
const uploadsDir = path.join(rootDir, 'uploads');
const stateFile = path.join(dataDir, 'state.json');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseBucket = process.env.SUPABASE_BUCKET || 'portfolio-media';
const supabase = supabaseUrl && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null;

fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(stateFile)) {
  fs.writeFileSync(stateFile, JSON.stringify({}, null, 2), 'utf8');
}

app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(uploadsDir));
app.use(express.static(rootDir));

app.get('/', (_req, res) => {
  res.redirect('/Site.html');
});

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, uploadsDir),
    filename: (_req, file, callback) => {
      const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
      const uniquePrefix = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      callback(null, `${uniquePrefix}-${safeName}`);
    }
  })
});

const readState = () => {
  try {
    return JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  } catch {
    return {};
  }
};

const writeState = (state) => {
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf8');
};

const normalizePathKey = (value) => {
  if (typeof value !== 'string' || !value.trim()) {
    return null;
  }

  return value;
};

const getLocalStateForPath = (statePath) => {
  const state = readState();
  return state[statePath] || {};
};

const saveLocalStateForPath = (statePath, nextState) => {
  const allState = readState();
  allState[statePath] = nextState;
  writeState(allState);
};

const getRemoteStateForPath = async (statePath) => {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('portfolio_states')
    .select('state')
    .eq('path', statePath)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data?.state || {};
};

const saveRemoteStateForPath = async (statePath, nextState) => {
  if (!supabase) {
    return;
  }

  const { error } = await supabase
    .from('portfolio_states')
    .upsert({ path: statePath, state: nextState, updated_at: new Date().toISOString() }, { onConflict: 'path' });

  if (error) {
    throw error;
  }
};

app.get('/api/state', async (req, res) => {
  const requestedPath = normalizePathKey(req.query.path);

  if (!requestedPath) {
    res.json({ state: readState() });
    return;
  }

  try {
    if (supabase) {
      const remoteState = await getRemoteStateForPath(requestedPath);
      res.json({ state: remoteState || {} });
      return;
    }

    res.json({ state: getLocalStateForPath(requestedPath) });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to load state' });
  }
});

app.put('/api/state', async (req, res) => {
  const { path: statePath, state } = req.body || {};
  const normalizedPath = normalizePathKey(statePath);
  if (!normalizedPath) {
    res.status(400).json({ error: 'Missing state path' });
    return;
  }
  if (!state || typeof state !== 'object') {
    res.status(400).json({ error: 'Invalid state payload' });
    return;
  }

  try {
    if (supabase) {
      await saveRemoteStateForPath(normalizedPath, state);
    }

    saveLocalStateForPath(normalizedPath, state);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to save state' });
  }
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'Missing file' });
    return;
  }

  if (!supabase) {
    res.json({
      ok: true,
      name: req.file.originalname,
      type: req.file.mimetype,
      url: `/uploads/${req.file.filename}`
    });
    return;
  }

  (async () => {
    const fileBuffer = fs.readFileSync(req.file.path);
    const remotePath = `${Date.now()}-${req.file.filename}`;
    const { error: uploadError } = await supabase.storage
      .from(supabaseBucket)
      .upload(remotePath, fileBuffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    fs.unlinkSync(req.file.path);

    if (uploadError) {
      res.status(500).json({ error: uploadError.message || 'Upload failed' });
      return;
    }

    const { data } = supabase.storage.from(supabaseBucket).getPublicUrl(remotePath);
    res.json({
      ok: true,
      name: req.file.originalname,
      type: req.file.mimetype,
      url: data.publicUrl
    });
  })().catch((error) => {
    try {
      fs.unlinkSync(req.file.path);
    } catch {
      // ignore cleanup errors
    }
    res.status(500).json({ error: error.message || 'Upload failed' });
  });
});

const getLanAddress = () => {
  const interfaces = os.networkInterfaces();

  for (const addresses of Object.values(interfaces)) {
    for (const address of addresses || []) {
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }

  return null;
};

app.listen(port, '0.0.0.0', () => {
  const lanAddress = getLanAddress();
  console.log(`Portfolio server running at http://localhost:${port}`);
  if (lanAddress) {
    console.log(`Open from another device on the same network: http://${lanAddress}:${port}`);
  }
});