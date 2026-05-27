(function () {
    const pageKey = 'portfolio-dev-mode:' + window.location.pathname;
    const toggleKey = 'd';
    const canUseNetworkStorage = window.location.protocol !== 'file:';
    const stateEndpoint = '/api/state';
    const uploadEndpoint = '/api/upload';
    const mediaDatabaseName = 'portfolio-dev-media';
    const mediaStoreName = 'media-files';
    const objectUrlCache = new Map();

    const selectorsByPage = () => {
        if (document.querySelector('.projects-grid')) {
            return [
                { label: 'Nom du site', selector: 'header h1', type: 'text' },
                { label: 'Sous-titre', selector: 'header h2', type: 'text' },
                { label: 'Lien LinkedIn', selector: '.links a:nth-child(1)', type: 'link' },
                { label: 'Lien GitHub', selector: '.links a:nth-child(2)', type: 'link' },
                { label: 'Lien CV', selector: '.links a:nth-child(3)', type: 'link' },
                ...Array.from(document.querySelectorAll('.card')).flatMap((card, index) => {
                    const cardNumber = index + 1;
                    return [
                        { label: `Projet ${cardNumber} - Titre`, selector: `.card:nth-of-type(${cardNumber}) .card-title`, type: 'text' },
                        { label: `Projet ${cardNumber} - Image / GIF`, selector: `.card:nth-of-type(${cardNumber}) .card-img-placeholder`, type: 'html' },
                        { label: `Projet ${cardNumber} - Lien`, selector: `.card:nth-of-type(${cardNumber})`, type: 'link' },
                        { label: `Projet ${cardNumber} - Description`, selector: `.card:nth-of-type(${cardNumber}) .card-description`, type: 'html' }
                    ];
                })
            ];
        }

        return [
            { label: 'Titre du projet', selector: 'header h1', type: 'text' },
            { label: 'Lien retour', selector: '.back-link', type: 'link' },
            { label: 'Bloc vidéo', selector: '.media > div', type: 'html' },
            { label: 'Résumé', selector: '.container .panel > p', type: 'text' },
            { label: 'Section détails', selector: '.description-list', type: 'html' },
            { label: 'Galerie', selector: '.grid', type: 'html' },
            { label: 'Bouton build 1', selector: '.downloads .btn:nth-child(1)', type: 'link' },
            { label: 'Bouton build 2', selector: '.downloads .btn:nth-child(2)', type: 'link' }
        ];
    };

    const ensureStyle = () => {
        if (document.getElementById('dev-mode-style')) {
            return;
        }
        const style = document.createElement('style');
        style.id = 'dev-mode-style';
        style.textContent = `
            .dev-mode-panel {
                position: fixed;
                top: 16px;
                right: 16px;
                width: min(420px, calc(100vw - 32px));
                max-height: calc(100vh - 32px);
                overflow: auto;
                z-index: 99999;
                background: rgba(15, 23, 42, 0.98);
                color: #f8fafc;
                border: 1px solid #38bdf8;
                border-radius: 14px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
                padding: 16px;
                font-family: Segoe UI, Tahoma, sans-serif;
            }
            .dev-mode-hidden { display: none !important; }
            .dev-mode-panel h3 { margin: 0 0 12px 0; font-size: 1.1rem; }
            .dev-mode-panel .meta { color: #94a3b8; font-size: 0.9rem; margin-bottom: 12px; }
            .dev-mode-field { margin-bottom: 12px; }
            .dev-mode-field label { display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 4px; }
            .dev-mode-field input, .dev-mode-field textarea {
                width: 100%;
                box-sizing: border-box;
                border-radius: 8px;
                border: 1px solid #334155;
                background: #020617;
                color: #f8fafc;
                padding: 8px 10px;
                font: inherit;
            }
            .dev-mode-field textarea { min-height: 100px; resize: vertical; }
            .dev-mode-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
            .dev-mode-actions button {
                border: 0;
                border-radius: 8px;
                padding: 8px 12px;
                font-weight: 700;
                cursor: pointer;
                background: #38bdf8;
                color: #000;
            }
            .dev-mode-actions button.secondary { background: #1e293b; color: #f8fafc; border: 1px solid #334155; }
            .dev-highlight { outline: 2px dashed #38bdf8 !important; outline-offset: 4px !important; }
        `;
        document.head.appendChild(style);
    };

    const getState = () => {
        try {
            return JSON.parse(localStorage.getItem(pageKey) || '{}');
        } catch {
            return {};
        }
    };

    const saveState = (state) => {
        localStorage.setItem(pageKey, JSON.stringify(state));
    };

    const fetchServerState = async () => {
        if (!canUseNetworkStorage) {
            return null;
        }

        try {
            const response = await fetch(`${stateEndpoint}?path=${encodeURIComponent(pageKey)}`);
            if (!response.ok) {
                return null;
            }
            const payload = await response.json();
            if (payload && payload.state && typeof payload.state === 'object') {
                return payload.state;
            }
        } catch {
            return null;
        }

        return null;
    };

    const persistState = async (state) => {
        saveState(state);
        if (!canUseNetworkStorage) {
            return;
        }

        try {
            await fetch(stateEndpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ path: pageKey, state })
            });
        } catch (error) {
            console.warn('Unable to persist state to server.', error);
        }
    };

    const openMediaDatabase = () => new Promise((resolve, reject) => {
        const request = indexedDB.open(mediaDatabaseName, 1);
        request.onupgradeneeded = () => {
            request.result.createObjectStore(mediaStoreName);
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

    const writeMediaFile = async (key, file) => {
        const database = await openMediaDatabase();
        await new Promise((resolve, reject) => {
            const transaction = database.transaction(mediaStoreName, 'readwrite');
            transaction.objectStore(mediaStoreName).put(file, key);
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
        database.close();
    };

    const readMediaFile = async (key) => {
        const database = await openMediaDatabase();
        const file = await new Promise((resolve, reject) => {
            const transaction = database.transaction(mediaStoreName, 'readonly');
            const request = transaction.objectStore(mediaStoreName).get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
        database.close();
        return file;
    };

    const uploadMediaFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(uploadEndpoint, {
            method: 'POST',
            body: formData
        });

        let payload = null;
        try {
            payload = await response.json();
        } catch {
            payload = null;
        }

        if (!response.ok) {
            const message = payload?.error || payload?.warning || `Upload failed (${response.status})`;
            throw new Error(message);
        }

        return payload || {};
    };

    const isMediaField = (field) => field.label.includes('Image / GIF') || field.label.includes('Bloc vidéo') || field.label.includes('Galerie');

    const pickFileForField = async (field, element) => {
        const acceptsVideo = field.label.includes('vidéo') || field.label.includes('Bloc vidéo');
        const acceptsImage = field.label.includes('Image') || field.label.includes('GIF') || field.label.includes('Galerie');
        const types = [];

        if (acceptsImage) {
            types.push({ description: 'Images', accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] } });
        }
        if (acceptsVideo) {
            types.push({ description: 'Vidéos', accept: { 'video/*': ['.mp4', '.webm', '.mov'] } });
        }
        if (!types.length) {
            types.push({ description: 'Tous les fichiers', accept: { '*/*': ['.*'] } });
        }

        const chooser = document.createElement('input');
        chooser.type = 'file';
        chooser.style.display = 'none';
        chooser.accept = types
            .flatMap((type) => Object.values(type.accept))
            .flat()
            .join(',');

        chooser.addEventListener('change', async () => {
            const file = chooser.files?.[0];
            if (!file) {
                chooser.remove();
                return;
            }

            const updatedState = getState();

            if (canUseNetworkStorage) {
                const uploaded = await uploadMediaFile(file);
                updatedState[field.label] = JSON.stringify({
                    name: uploaded.name || file.name,
                    type: uploaded.type || file.type,
                    url: uploaded.url,
                    storage: uploaded.storage || 'remote'
                });
                await persistState(updatedState);
            } else {
                const storageKey = `${pageKey}:${field.label}`;
                await writeMediaFile(storageKey, file);
                updatedState[field.label] = JSON.stringify({
                    name: file.name,
                    type: file.type,
                    key: storageKey
                });
                await persistState(updatedState);
            }

            await applySavedState();
            buildPanel();
            chooser.remove();
        }, { once: true });

        document.body.appendChild(chooser);
        chooser.click();
    };

    const applyStateToElement = async (element, field) => {
        const state = getState();
        const value = state[field.label];
        if (value == null) {
            return;
        }

        if (isMediaField(field)) {
            try {
                const media = JSON.parse(value);
                let objectUrl = null;
                if (media.key) {
                    objectUrl = objectUrlCache.get(media.key) || null;
                    if (!objectUrl) {
                        const file = await readMediaFile(media.key);
                        if (file) {
                            objectUrl = URL.createObjectURL(file);
                            objectUrlCache.set(media.key, objectUrl);
                        }
                    }
                } else if (media.url && !media.url.startsWith('blob:')) {
                    objectUrl = media.url;
                }
                if (element.tagName === 'DIV') {
                    element.innerHTML = '';
                    if (objectUrl && media.type && media.type.startsWith('video/')) {
                        const video = document.createElement('video');
                        video.src = objectUrl;
                        video.controls = true;
                        video.playsInline = true;
                        video.muted = false;
                        video.volume = 1;
                        video.preload = 'metadata';
                        video.style.width = '100%';
                        video.style.height = '100%';
                        video.style.objectFit = 'cover';
                        element.appendChild(video);
                    } else if (objectUrl) {
                        const img = document.createElement('img');
                        img.src = objectUrl;
                        img.alt = media.name || field.label;
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                        element.appendChild(img);
                    } else {
                        element.textContent = media.name || field.label;
                    }
                }
            } catch {
                element.innerHTML = value;
            }
            return;
        }

        if (field.type === 'text') {
            element.textContent = value;
            return;
        }
        if (field.type === 'html') {
            element.innerHTML = value;
            return;
        }
        if (field.type === 'link') {
            const parts = value.split('\n');
            if (parts[0]) {
                element.setAttribute('href', parts[0]);
            }
        }
    };

    const applySavedState = () => {
        const fields = selectorsByPage();
        const pending = [];
        for (const field of fields) {
            const element = document.querySelector(field.selector);
            if (!element) {
                continue;
            }
            pending.push(applyStateToElement(element, field));
        }
        return Promise.all(pending);
    };

    const buildPanel = () => {
        ensureStyle();
        const existing = document.getElementById('dev-mode-panel');
        if (existing) {
            existing.remove();
        }

        const panel = document.createElement('aside');
        panel.id = 'dev-mode-panel';
        panel.className = 'dev-mode-panel';
        panel.innerHTML = '<h3>Mode dev</h3><div class="meta">Appuie sur D pour ouvrir/fermer. Les modifications sont sauvegardées localement.</div>';

        const fields = selectorsByPage();
        const state = getState();

        fields.forEach((field) => {
            const element = document.querySelector(field.selector);
            if (!element) {
                return;
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'dev-mode-field';
            const label = document.createElement('label');
            label.textContent = field.label;
            wrapper.appendChild(label);

            const input = field.type === 'html' ? document.createElement('textarea') : document.createElement('input');
            if (isMediaField(field)) {
                try {
                    const media = JSON.parse(state[field.label] ?? 'null');
                    input.value = media?.name || media?.url || element.textContent.trim();
                } catch {
                    input.value = element.textContent.trim();
                }
            } else if (field.type === 'html') {
                input.value = state[field.label] ?? element.innerHTML;
            } else if (field.type === 'link') {
                input.value = state[field.label] ?? element.getAttribute('href') ?? '';
            } else {
                input.value = state[field.label] ?? element.textContent.trim();
            }

            if (isMediaField(field)) {
                const chooser = document.createElement('button');
                chooser.type = 'button';
                chooser.textContent = 'Choisir fichier';
                chooser.className = 'secondary';
                chooser.style.marginTop = '8px';
                chooser.addEventListener('click', async () => {
                    try {
                        await pickFileForField(field, element);
                        buildPanel();
                    } catch (error) {
                        console.error(error);
                        alert('Impossible de choisir ce fichier. Vérifie que le navigateur autorise le sélecteur de fichiers.');
                    }
                });
                wrapper.appendChild(chooser);
            }

            input.addEventListener('input', () => {
                const updatedState = getState();
                updatedState[field.label] = input.value;
                persistState(updatedState);
                applySavedState();
            });
            input.addEventListener('focus', () => element.classList.add('dev-highlight'));
            input.addEventListener('blur', () => element.classList.remove('dev-highlight'));
            wrapper.appendChild(input);
            panel.appendChild(wrapper);
        });

        const actions = document.createElement('div');
        actions.className = 'dev-mode-actions';

        const exportButton = document.createElement('button');
        exportButton.textContent = 'Exporter JSON';
        exportButton.addEventListener('click', () => {
            const blob = new Blob([JSON.stringify(getState(), null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'portfolio-dev-state.json';
            link.click();
            URL.revokeObjectURL(url);
        });

        const resetButton = document.createElement('button');
        resetButton.textContent = 'Réinitialiser';
        resetButton.className = 'secondary';
        resetButton.addEventListener('click', () => {
            localStorage.removeItem(pageKey);
            if (canUseNetworkStorage) {
                fetch(stateEndpoint, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ path: pageKey, state: {} })
                }).catch(() => {});
            }
            window.location.reload();
        });

        actions.appendChild(exportButton);
        actions.appendChild(resetButton);
        panel.appendChild(actions);
        document.body.appendChild(panel);

        document.querySelectorAll('.card-img-placeholder, .media, .shot').forEach((target) => {
            target.style.cursor = 'pointer';
            target.title = 'Clique pour choisir un fichier en mode dev';
            target.addEventListener('click', async () => {
                if (!devEnabled) {
                    return;
                }
                const fields = selectorsByPage().filter((field) => isMediaField(field));
                const matchingField = fields.find((field) => document.querySelector(field.selector) === target || target.contains(document.querySelector(field.selector)));
                if (!matchingField) {
                    return;
                }
                try {
                    await pickFileForField(matchingField, document.querySelector(matchingField.selector));
                    buildPanel();
                } catch (error) {
                    console.error(error);
                }
            });
        });
    };

    let devEnabled = false;
    const syncMode = () => {
        document.body.classList.toggle('dev-mode-hidden', false);
        if (devEnabled) {
            buildPanel();
        } else {
            const panel = document.getElementById('dev-mode-panel');
            if (panel) {
                panel.remove();
            }
            document.querySelectorAll('.dev-highlight').forEach((node) => node.classList.remove('dev-highlight'));
        }
    };

    window.addEventListener('keydown', (event) => {
        if (event.key.toLowerCase() === toggleKey && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')) {
            devEnabled = !devEnabled;
            syncMode();
        }
        if (event.key === 'Escape' && devEnabled) {
            devEnabled = false;
            syncMode();
        }
    });

    window.addEventListener('DOMContentLoaded', () => {
        fetchServerState().then((serverState) => {
            if (serverState) {
                saveState(serverState);
            }
            applySavedState();
        });
    });
})();