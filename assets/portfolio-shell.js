(function () {
  const projects = [
    {
      id: '1',
      title: 'Game Jam',
      path: 'pages/projet1.html',
      aliases: ['1', 'project1', 'projet1', 'game jam'],
      summary: 'Plateformer rapide avec focus sur le feeling et l\'UI.',
      skill: 'Unity / C#',
      log: 'Boot sequence compiled. Jump buffer online.'
    },
    {
      id: '2',
      title: 'Projet 3D',
      path: 'pages/projet2.html',
      aliases: ['2', 'project2', 'projet2', '3d'],
      summary: 'Prototype 3D orienté systèmes et State Machine.',
      skill: 'Unity 3D / C#',
      log: 'World streaming stable. Enemy AI responding.'
    },
    {
      id: '3',
      title: 'Projet Mobile',
      path: 'pages/projet3.html',
      aliases: ['3', 'project3', 'projet3', 'mobile'],
      summary: 'Version mobile pensée pour les contrôles tactiles.',
      skill: 'Unity Mobile',
      log: 'Touch controls mapped. Performance profile green.'
    },
    {
      id: '4',
      title: 'Multijoueur',
      path: 'pages/projet4.html',
      aliases: ['4', 'project4', 'projet4', 'multi', 'multiplayer'],
      summary: 'Architecture réseau et synchronisation des joueurs.',
      skill: 'Unity / Réseau',
      log: 'Replication graph synced. Lobby handshake done.'
    },
    {
      id: '5',
      title: 'SFML',
      path: 'pages/projet5.html',
      aliases: ['5', 'project5', 'projet5', 'sfml', 'cpp'],
      summary: 'Moteur en C++ avec boucle de jeu et collisions.',
      skill: 'C++ / SFML',
      log: 'Game loop locked. Memory safe path verified.'
    },
    {
      id: '6',
      title: 'CSFML',
      path: 'pages/projet6.html',
      aliases: ['6', 'project6', 'projet6', 'csfml', 'c'],
      summary: 'Bas niveau en C avec rendu graphique maîtrisé.',
      skill: 'C / CSFML',
      log: 'Render layer online. Struct layout indexed.'
    }
  ];

  const snippets = {
    '1': `if (canJump && grounded) {
  velocityY = jumpStrength;
  jumpBuffer = 0;
}`,
    '2': `switch (enemyState) {
  case 'patrol': updatePatrol(); break;
  case 'chase': updateChase(); break;
}`,
    '3': `if (touchCount > 0) {
  movePlayer(touches[0].deltaX);
  updateUI();
}`,
    '4': `void SyncPlayerState() {
  network.Send(position, velocity, score);
}`,
    '5': `while (window.isOpen()) {
  handleEvents();
  update(deltaTime);
  render();
}`,
    '6': `sfSprite_setPosition(sprite, playerPos);
sfRenderWindow_drawSprite(window, sprite, NULL);`
  };

  const skillNodes = [
    { label: 'Unity', level: 94 },
    { label: 'C#', level: 90 },
    { label: 'Gameplay', level: 95 },
    { label: 'Réseau', level: 78 },
    { label: 'C++ / C', level: 82 },
    { label: 'Web / JS', level: 76 }
  ];

  const isHome = Boolean(document.querySelector('.projects-grid'));
  const isProjectPage = Boolean(document.querySelector('.video-container') || document.querySelector('.media'));

  const css = `
    .shell-home body {
      margin: 0;
      overflow: hidden;
      background: #000;
    }

    .shell-home body > header,
    .shell-home body > .container {
      opacity: 0;
      pointer-events: none;
      user-select: none;
    }

    .shell-home #matrix-home-app {
      position: fixed;
      inset: 0;
      z-index: 10;
      background: #000;
      overflow: hidden;
    }

    .matrix-home-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      background: #000;
    }

    .matrix-home-glow {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at center, rgba(0, 255, 102, 0.12), transparent 42%),
        radial-gradient(circle at center, rgba(0, 200, 80, 0.08), transparent 62%);
      pointer-events: none;
      mix-blend-mode: screen;
    }

    .matrix-home-vignette {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        radial-gradient(circle at center, transparent 0%, transparent 58%, rgba(0, 0, 0, 0.28) 100%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.55), transparent 18%, transparent 82%, rgba(0, 0, 0, 0.68));
    }

    .matrix-home-center {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px;
      z-index: 2;
    }

    .matrix-console {
      width: min(920px, calc(100vw - 24px));
      min-height: min(72vh, 640px);
      border: 1px solid rgba(0, 255, 102, 0.35);
      border-radius: 18px;
      background: linear-gradient(180deg, rgba(0, 10, 0, 0.9), rgba(0, 14, 0, 0.78));
      box-shadow:
        0 0 0 1px rgba(0, 255, 102, 0.08),
        0 0 44px rgba(0, 255, 102, 0.16),
        0 24px 90px rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      display: grid;
      grid-template-rows: auto 1fr auto;
      overflow: hidden;
      position: relative;
    }

    .matrix-console::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 100% 3px;
      opacity: 0.16;
      mix-blend-mode: screen;
    }

    .matrix-console-header,
    .matrix-console-footer,
    .matrix-console-body {
      position: relative;
      z-index: 1;
    }

    .matrix-console-header {
      display: flex;
      justify-content: space-between;
      gap: 14px;
      align-items: center;
      padding: 18px 20px 14px;
      border-bottom: 1px solid rgba(0, 255, 102, 0.16);
      font-family: 'Consolas', 'Courier New', monospace;
    }

    .matrix-console-title {
      margin: 0;
      color: #d9ffe3;
      font-size: 1rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
    }

    .matrix-console-status {
      color: #6bff95;
      font-size: 0.78rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      text-align: right;
    }

    .matrix-console-body {
      display: grid;
      grid-template-columns: 1fr;
      padding: 18px 20px;
      min-height: 0;
    }

    .matrix-screen,
    .matrix-side {
      border: 1px solid rgba(0, 255, 102, 0.18);
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.4);
      min-height: 0;
    }

    .matrix-screen {
      display: grid;
      grid-template-rows: 1fr auto;
      overflow: hidden;
    }

    .matrix-output {
      margin: 0;
      padding: 16px;
      overflow: auto;
      color: #d7ffe0;
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 0.95rem;
      line-height: 1.6;
      white-space: pre-wrap;
    }

    .matrix-line {
      margin: 0 0 6px;
    }

    .matrix-line.muted {
      color: #7fd89a;
    }

    .matrix-line.accent {
      color: #6bff95;
    }

    .matrix-input-row {
      display: flex;
      gap: 10px;
      padding: 14px 16px 16px;
      border-top: 1px solid rgba(0, 255, 102, 0.14);
      align-items: center;
      font-family: 'Consolas', 'Courier New', monospace;
    }

    .matrix-prompt {
      color: #6bff95;
      flex: 0 0 auto;
    }

    .matrix-input {
      flex: 1;
      border: 0;
      outline: none;
      background: transparent;
      color: #f3fff6;
      font: inherit;
      min-width: 0;
    }

    .matrix-cursor {
      width: 10px;
      height: 18px;
      background: #6bff95;
      animation: matrixBlink 1s steps(1) infinite;
      flex: 0 0 auto;
    }

    .matrix-panel {
      border: 1px solid rgba(0, 255, 102, 0.12);
      border-radius: 12px;
      padding: 14px;
      background: rgba(0, 0, 0, 0.32);
    }

    .matrix-panel h2 {
      margin: 0 0 10px;
      color: #6bff95;
      font-size: 0.86rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .matrix-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 8px;
      color: #d7ffe0;
      font-size: 0.88rem;
    }

    .matrix-list a {
      color: #8affab;
      text-decoration: none;
    }

    .matrix-list a:hover {
      text-decoration: underline;
    }

    .matrix-console-footer {
      padding: 0 20px 18px;
      color: #7fd89a;
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 0.8rem;
      letter-spacing: 0.08em;
    }

    @keyframes matrixBlink {
      50% { opacity: 0; }
    }

    .shell-enhanced body {
      background:
        radial-gradient(circle at top, rgba(0, 255, 102, 0.12), transparent 30%),
        linear-gradient(180deg, #020617 0%, #0f172a 55%, #020617 100%);
    }

    .shell-panel {
      max-width: 1280px;
      margin: 24px auto 0;
      padding: 24px;
      border: 1px solid rgba(0, 255, 102, 0.28);
      border-radius: 20px;
      background: linear-gradient(180deg, rgba(2, 10, 2, 0.95), rgba(0, 18, 6, 0.88));
      box-shadow: 0 20px 70px rgba(0, 0, 0, 0.35);
      position: relative;
      overflow: hidden;
    }

    .shell-panel::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 100% 3px;
      opacity: 0.08;
      mix-blend-mode: screen;
    }

    .shell-top {
      display: grid;
      grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
      gap: 18px;
      align-items: stretch;
    }

    .shell-terminal, .shell-tree, .shell-card, .shell-code, .shell-console {
      position: relative;
      z-index: 1;
      border: 1px solid rgba(0, 255, 102, 0.22);
      border-radius: 16px;
      background: rgba(0, 10, 4, 0.82);
      box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.05);
    }

    .shell-terminal {
      padding: 18px;
      display: flex;
      flex-direction: column;
      min-height: 360px;
    }

    .shell-label {
      margin: 0 0 10px;
      font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: #6bff95;
      font-size: 0.78rem;
    }

    .shell-title {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: clamp(2rem, 5vw, 4rem);
      line-height: 0.95;
      color: #f8fafc;
    }

    .shell-title span {
      color: #6bff95;
      text-shadow: 0 0 24px rgba(0, 255, 102, 0.26);
    }

    .shell-subtitle {
      margin: 12px 0 18px;
      max-width: 56ch;
      color: #cbd5e1;
      font-size: 1rem;
    }

    .shell-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 18px;
    }

    .shell-chip {
      padding: 7px 11px;
      border: 1px solid rgba(0, 255, 102, 0.24);
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.7);
      color: #e2e8f0;
      font-size: 0.82rem;
      cursor: pointer;
      transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
    }

    .shell-chip:hover {
      transform: translateY(-1px);
      border-color: rgba(0, 255, 102, 0.7);
      background: rgba(0, 255, 102, 0.12);
    }

    .shell-input-row {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px solid rgba(148, 163, 184, 0.16);
    }

    .shell-prompt {
      color: #22c55e;
      font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
      flex: 0 0 auto;
    }

    .shell-input {
      flex: 1;
      background: rgba(0, 10, 4, 0.92);
      border: 1px solid rgba(0, 255, 102, 0.24);
      color: #f8fafc;
      border-radius: 10px;
      padding: 12px 14px;
      font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
      outline: none;
    }

    .shell-input:focus { border-color: #6bff95; box-shadow: 0 0 0 3px rgba(0, 255, 102, 0.12); }

    .shell-submit {
      border: 0;
      border-radius: 10px;
      padding: 12px 14px;
      background: linear-gradient(180deg, #6bff95, #22c55e);
      color: #001408;
      font-weight: 800;
      cursor: pointer;
    }

    .shell-output {
      margin: 0;
      padding: 14px;
      min-height: 150px;
      overflow: auto;
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.42);
      border: 1px solid rgba(148, 163, 184, 0.12);
      font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
      color: #cbd5e1;
      white-space: pre-wrap;
      line-height: 1.5;
    }

    .shell-tree {
      padding: 18px;
      display: grid;
      gap: 12px;
      align-content: start;
    }

    .tree-branch {
      padding: 12px;
      border-radius: 12px;
      background: linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(2, 6, 23, 0.8));
      border: 1px solid rgba(34, 197, 94, 0.18);
    }

    .tree-branch h3 {
      margin: 0 0 8px;
      font-size: 0.88rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #86efac;
    }

    .tree-item { display: grid; gap: 6px; margin-bottom: 10px; }
    .tree-item:last-child { margin-bottom: 0; }
    .tree-item span { display: flex; justify-content: space-between; color: #cbd5e1; font-size: 0.85rem; }
    .tree-bar { height: 8px; border-radius: 999px; background: rgba(148, 163, 184, 0.14); overflow: hidden; }
    .tree-bar i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #22c55e, #38bdf8); }

    .shell-grid {
      margin-top: 18px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }

    .shell-card {
      padding: 16px;
      transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
    }

    .shell-card:hover { transform: translateY(-3px); border-color: rgba(56, 189, 248, 0.58); box-shadow: 0 18px 40px rgba(0,0,0,0.25); }

    .shell-card:hover { transform: translateY(-3px); border-color: rgba(0, 255, 102, 0.58); box-shadow: 0 18px 40px rgba(0,0,0,0.25); }

    .shell-card h3 { margin: 0 0 10px; color: #6bff95; }
    .shell-card p { margin: 0 0 12px; color: #cbd5e1; font-size: 0.92rem; }
    .shell-card .meta { display: flex; flex-wrap: wrap; gap: 8px; }
    .shell-tag {
      padding: 4px 8px;
      border-radius: 999px;
      background: rgba(0, 255, 102, 0.12);
      color: #d9ffe3;
      border: 1px solid rgba(0, 255, 102, 0.2);
      font-size: 0.76rem;
    }

    .shell-cta {
      margin-top: 12px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .shell-button {
      border: 1px solid rgba(0, 255, 102, 0.28);
      background: rgba(0, 10, 4, 0.84);
      color: #f8fafc;
      border-radius: 10px;
      padding: 9px 12px;
      cursor: pointer;
      text-decoration: none;
      font-size: 0.85rem;
    }

    .shell-button.primary {
      background: linear-gradient(180deg, #6bff95, #22c55e);
      color: #001408;
      border-color: transparent;
      font-weight: 800;
    }

    .shell-console {
      margin-top: 18px;
      padding: 16px;
    }

    .console-lines {
      margin: 0;
      display: grid;
      gap: 8px;
      color: #cbd5e1;
      font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
      font-size: 0.88rem;
    }

    .project-hud {
      max-width: 1100px;
      margin: 18px auto 0;
      padding: 0 20px;
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(260px, 0.8fr);
      gap: 16px;
    }

    .mission-card, .code-snippet {
      border: 1px solid rgba(56, 189, 248, 0.24);
      background: linear-gradient(180deg, rgba(2, 6, 23, 0.92), rgba(15, 23, 42, 0.86));
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 18px 40px rgba(0,0,0,0.18);
    }

    .mission-card h2, .code-snippet h2 { margin: 0 0 10px; color: #38bdf8; font-size: 1.05rem; }
    .mission-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px; }

    .code-snippet pre {
      margin: 0;
      overflow: auto;
      padding: 14px;
      border-radius: 12px;
      background: #020617;
      color: #e2e8f0;
      font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
      font-size: 0.84rem;
      line-height: 1.55;
      border: 1px solid rgba(148, 163, 184, 0.14);
    }

    .project-console {
      max-width: 1100px;
      margin: 16px auto 0;
      padding: 0 20px;
    }

    .project-console .console-lines { padding: 16px; border-radius: 16px; border: 1px solid rgba(56, 189, 248, 0.2); background: rgba(2, 6, 23, 0.82); }

    @media (max-width: 920px) {
      .shell-top, .project-hud { grid-template-columns: 1fr; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  document.documentElement.classList.add('shell-enhanced');

  const projectForPath = (path) => {
    const normalized = path.replace(/\/$/, '');
    return projects.find((project) => normalized.endsWith(project.path) || project.aliases.some((alias) => normalized.includes(alias)));
  };

  const getProjectNameFromPage = () => {
    const title = document.querySelector('header h1')?.textContent?.trim() || document.title;
    return title.replace(/^\[|\]$/g, '');
  };

  const appendConsoleLine = (container, text) => {
    const line = document.createElement('div');
    line.textContent = `> ${text}`;
    container.appendChild(line);
    container.scrollTop = container.scrollHeight;
  };

  const renderTextLines = (container, lines, className = '') => {
    container.innerHTML = '';
    lines.forEach((line) => {
      const entry = document.createElement('div');
      entry.className = `matrix-line${className ? ` ${className}` : ''}`;
      entry.textContent = line;
      container.appendChild(entry);
    });
    container.scrollTop = container.scrollHeight;
  };

  const buildHome = () => {
    if (document.getElementById('matrix-home-app')) {
      return;
    }

    document.documentElement.classList.add('shell-home');

    const app = document.createElement('section');
    app.id = 'matrix-home-app';
    app.innerHTML = `
      <canvas class="matrix-home-canvas" id="matrix-home-canvas" aria-hidden="true"></canvas>
      <div class="matrix-home-glow" aria-hidden="true"></div>
      <div class="matrix-home-vignette" aria-hidden="true"></div>
      <div class="matrix-home-center">
        <section class="matrix-console" aria-label="Console du portfolio">
          <div class="matrix-console-header">
            <h1 class="matrix-console-title">Portfolio Matrix</h1>
            <div class="matrix-console-status">Online // Type help</div>
          </div>
          <div class="matrix-console-body">
            <div class="matrix-screen">
              <div class="matrix-output" id="matrix-output" aria-live="polite"></div>
              <div class="matrix-input-row">
                <span class="matrix-prompt">C:\\portfolio&gt;</span>
                <input class="matrix-input" id="matrix-input" autocomplete="off" spellcheck="false" placeholder="help" />
                <span class="matrix-cursor" aria-hidden="true"></span>
              </div>
            </div>
          </div>
          <div class="matrix-console-footer">Minimal shell interface // green mode // keyboard first</div>
        </section>
      </div>
    `;

    document.body.insertBefore(app, document.body.firstChild);

    const output = app.querySelector('#matrix-output');
    const input = app.querySelector('#matrix-input');
    const canvas = app.querySelector('#matrix-home-canvas');
    const context = canvas.getContext('2d');

    const write = (text, className = '') => {
      const line = document.createElement('div');
      line.className = `matrix-line${className ? ` ${className}` : ''}`;
      line.textContent = text;
      output.appendChild(line);
      output.scrollTop = output.scrollHeight;
    };

    const getSocialEntries = () => {
      const headerLinks = Array.from(document.querySelectorAll('header .links a')).map((link) => ({
        label: link.textContent.trim(),
        href: link.getAttribute('href') || '#'
      }));

      if (headerLinks.length) {
        return headerLinks;
      }

      return [
        { label: 'GitHub', href: 'https://github.com/' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
        { label: 'Email', href: 'mailto:you@example.com' }
      ];
    };

    const renderProjectList = () => {
      write('Projects available:');
      projects.forEach((project) => {
        write(`${project.id}. ${project.title} — ${project.summary}`, 'muted');
      });
      write('Use open <id> to launch a project.', 'accent');
    };

    const renderSocialList = () => {
      write('Social links:');
      getSocialEntries().forEach((entry) => {
        const item = document.createElement('div');
        item.className = 'matrix-line muted';
        item.innerHTML = `${entry.label} — <a href="${entry.href}" target="_blank" rel="noreferrer">${entry.href}</a>`;
        output.appendChild(item);
      });
      output.scrollTop = output.scrollHeight;
    };

    const commands = {
      help: () => {
        write('help');
        write('  help   : affiche la liste des commandes', 'muted');
        write('  project: affiche la liste des projets', 'muted');
        write('  social : affiche les reseaux', 'muted');
        write('  open X : ouvre le projet X', 'muted');
        write('  clear  : nettoie la console', 'muted');
      },
      project: () => renderProjectList(),
      social: () => renderSocialList(),
      clear: () => {
        output.innerHTML = '';
        write('Console cleared.', 'accent');
      },
      cls: () => {
        output.innerHTML = '';
        write('Console cleared.', 'accent');
      }
    };

    const runCommand = (raw) => {
      const command = raw.trim();
      if (!command) {
        return;
      }

      write(`C:\\portfolio> ${command}`, 'accent');

      const [action, ...rest] = command.toLowerCase().split(/\s+/);

      if (action === 'open') {
        const target = rest.join(' ');
        const project = projects.find((item) => item.id === target || item.title.toLowerCase().includes(target) || item.aliases.some((alias) => alias === target));
        if (project) {
          window.location.href = project.path;
          return;
        }

        write('Projet introuvable. Essaie open 1, open 2, open 3...', 'muted');
        return;
      }

      const commandHandler = commands[action];
      if (commandHandler) {
        commandHandler();
        return;
      }

      write(`Commande inconnue: ${command}`, 'muted');
      write('Tape help pour voir les commandes disponibles.', 'muted');
    };

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const columns = [];
    const drawMatrix = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const fontSize = 18;
      const columnCount = Math.max(1, Math.floor(width / fontSize));

      if (columns.length !== columnCount) {
        columns.length = 0;
        for (let index = 0; index < columnCount; index += 1) {
          columns.push(Math.random() * height * 0.5);
        }
      }

      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, width, height);
      context.font = `${fontSize}px Consolas, monospace`;

      for (let index = 0; index < columns.length; index += 1) {
        const char = Math.random() > 0.5 ? '1' : '0';
        const x = index * fontSize;
        const y = columns[index] * fontSize;
        const isBright = Math.random() > 0.94;

        context.fillStyle = isBright ? 'rgba(180, 255, 205, 0.96)' : 'rgba(0, 255, 120, 0.72)';
        context.fillText(char, x, y);

        if (y > height && Math.random() > 0.99) {
          columns[index] = 0;
        } else {
          columns[index] += 0.35 + Math.random() * 0.18;
        }
      }

      window.requestAnimationFrame(drawMatrix);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawMatrix();

    write('Matrix console initialized.');
    write('Tape help pour commencer.', 'muted');
    write('Commandes: help, project, social, open <id>, clear', 'muted');

    input.focus();
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const value = input.value;
        input.value = '';
        runCommand(value);
      }
    });

    app.addEventListener('click', () => input.focus());
  };

  const buildProjectPage = () => {
    const media = document.querySelector('.video-container, .media');
    const container = document.querySelector('.container, .main, main');
    if (!media || !container || document.getElementById('project-hud')) {
      return;
    }

    const project = projectForPath(window.location.pathname) || {
      id: '0',
      title: getProjectNameFromPage(),
      summary: 'Mission dossier',
      skill: 'Game Dev',
      log: 'Session loaded.'
    };

    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
      headerTitle.textContent = project.title;
    }
    document.title = `Mission ${project.id} - ${project.title}`;

    const hud = document.createElement('section');
    hud.id = 'project-hud';
    hud.className = 'project-hud';
    hud.innerHTML = `
      <div class="mission-card">
        <h2>Mission ${project.id}: ${project.title}</h2>
        <p>${project.summary}</p>
        <div class="mission-row">
          <button class="shell-button primary" id="project-play-button" type="button">Play trailer</button>
          <a class="shell-button" href="../Site.html">Return hub</a>
        </div>
        <div class="mission-row">
          <span class="shell-tag">${project.skill}</span>
          <span class="shell-tag">Playable showcase</span>
        </div>
      </div>
      <div class="code-snippet">
        <h2>Code Snippet</h2>
        <pre><code>${snippets[project.id] || snippets['1']}</code></pre>
      </div>
    `;

    container.parentNode.insertBefore(hud, container);

    const consoleWrap = document.createElement('div');
    consoleWrap.className = 'project-console';
    consoleWrap.innerHTML = `
      <div class="console-lines">
        <div>MISSION LOG: ${project.log}</div>
        <div>ASSETS: trailer, screenshots, build links</div>
        <div>STATUS: ready</div>
      </div>
    `;
    container.insertAdjacentElement('afterend', consoleWrap);

    const playButton = hud.querySelector('#project-play-button');
    playButton.addEventListener('click', () => {
      media.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const video = media.querySelector('video');
      if (video) {
        video.play().catch(() => {});
      }
    });
  };

  window.addEventListener('DOMContentLoaded', () => {
    if (isHome) {
      buildHome();
    }
    if (isProjectPage) {
      buildProjectPage();
    }
  });
})();