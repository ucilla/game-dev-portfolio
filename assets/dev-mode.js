(function () {
    const pageKey = 'portfolio-dev-mode:' + window.location.pathname;
    const toggleKey = 'F10';
    const canUseNetworkStorage = false;
    const stateEndpoint = '/api/state';
    const uploadEndpoint = '/api/upload';
    const mediaDatabaseName = 'portfolio-dev-media';
    const mediaStoreName = 'media-files';
    const objectUrlCache = new Map();
    let uploadStatusNode = null;
    let modeIndicatorNode = null;
    let activeEditorNode = null;
    let activeTargetElement = null;

    const selectorsByPage = () => {
        if (document.querySelector('.projects-grid')) {
            return [
                ...Array.from(document.querySelectorAll('.card')).flatMap((card, index) => {
                    const cardNumber = index + 1;
                    return [
                        { label: `Projet ${cardNumber} - Image / GIF`, selector: `.card:nth-of-type(${cardNumber}) .card-img-placeholder`, type: 'html' },
                    ];
                }),
            ];
        }

        return [
            { label: 'Bloc vidéo', selector: '.media > div', type: 'html' },
            ...Array.from(document.querySelectorAll('.grid .shot')).map((shot, index) => ({
                label: `Gallery Item ${index + 1}`,
                selector: `.grid .shot:nth-of-type(${index + 1})`,
                type: 'html'
            })),
        ];
    };

    const ensureStyle = () => {
        if (document.getElementById('dev-mode-style')) {
            return;
        }
        const style = document.createElement('style');
        style.id = 'dev-mode-style';
        style.textContent = `
            body.dev-mode-active {
                box-shadow: inset 0 0 0 9999px rgba(56, 189, 248, 0.06);
            }

            .dev-mode-badge {
                position: fixed;
                top: 16px;
                left: 50%;
                transform: translateX(-50%) translateY(-8px);
                z-index: 100000;
                padding: 10px 14px;
                border-radius: 999px;
                background: rgba(0, 0, 0, 0.92);
                color: #f8fafc;
                border: 1px solid #38bdf8;
                box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35), 0 0 24px rgba(56, 189, 248, 0.2);
                font-family: Segoe UI, Tahoma, sans-serif;
                font-size: 0.9rem;
                letter-spacing: 0.06em;
                opacity: 0;
                pointer-events: none;
                transition: opacity 180ms ease, transform 180ms ease;
            }

            .dev-mode-badge.is-visible {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }

            .dev-mode-status {
                display: none;
                margin: 0 0 12px 0;
                padding: 10px 12px;
                border-radius: 8px;
                font-size: 0.88rem;
                line-height: 1.4;
                background: rgba(15, 23, 42, 0.95);
                border: 1px solid #334155;
                color: #cbd5e1;
            }
            .dev-mode-status.is-visible { display: block; }
            .dev-mode-status.is-loading { border-color: #38bdf8; color: #e0f2fe; }
            .dev-mode-status.is-success { border-color: #22c55e; color: #dcfce7; }
            .dev-mode-status.is-error { border-color: #ef4444; color: #fee2e2; }
            .dev-mode-editor {
                position: fixed;
                z-index: 100000;
                width: min(420px, calc(100vw - 24px));
                max-height: min(80vh, 720px);
                overflow: auto;
                background: rgba(0, 0, 0, 0.96);
                color: #f8fafc;
                border: 1px solid #38bdf8;
                border-radius: 14px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55), 0 0 30px rgba(56, 189, 248, 0.18);
                padding: 14px;
                font-family: Segoe UI, Tahoma, sans-serif;
            }

            .dev-mode-editor h3 { margin: 0 0 10px 0; font-size: 1rem; color: #38bdf8; }
            .dev-mode-editor .meta { color: #dbeafe; font-size: 0.88rem; margin-bottom: 12px; }
            .dev-mode-field { margin-bottom: 12px; }
            .dev-mode-field label { display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 4px; }
            .dev-mode-field input, .dev-mode-field textarea {
                width: 100%;
                box-sizing: border-box;
                border-radius: 8px;
                border: 1px solid #334155;
                background: #020202;
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
                color: #001018;
            }
            .dev-mode-actions button.secondary { background: #111827; color: #f8fafc; border: 1px solid #334155; }
            .dev-highlight { outline: 2px dashed #38bdf8 !important; outline-offset: 4px !important; }
            .dev-mode-hint {
                position: fixed;
                right: 16px;
                bottom: 16px;
                z-index: 100000;
                background: rgba(0, 0, 0, 0.9);
                color: #f8fafc;
                border: 1px solid #38bdf8;
                padding: 10px 12px;
                border-radius: 10px;
                font-size: 0.85rem;
                box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
            }
        `;
        document.head.appendChild(style);
    };

    const clearActiveEditor = () => {
        if (activeEditorNode) {
            activeEditorNode.remove();
            activeEditorNode = null;
        }
        if (activeTargetElement) {
            activeTargetElement.classList.remove('dev-highlight');
            activeTargetElement = null;
        }
    };

    const showModeIndicator = (message) => {
        if (!modeIndicatorNode) {
            modeIndicatorNode = document.createElement('div');
            modeIndicatorNode.className = 'dev-mode-badge';
            document.body.appendChild(modeIndicatorNode);
        }

        modeIndicatorNode.textContent = message;
        modeIndicatorNode.classList.add('is-visible');
        window.clearTimeout(showModeIndicator.hideTimer);
        showModeIndicator.hideTimer = window.setTimeout(() => {
            if (modeIndicatorNode) {
                modeIndicatorNode.classList.remove('is-visible');
            }
        }, 1600);
    };

    const findFieldForTarget = (target) => {
        const fields = selectorsByPage();

        for (const field of fields) {
            const element = document.querySelector(field.selector);
            if (!element) {
                continue;
            }

            if (element === target || element.contains(target) || (target.closest && target.closest(field.selector))) {
                return { field, element };
            }
        }

        return null;
    };

    const buildDomPath = (element) => {
        if (!element || element === document.body) {
            return 'body';
        }

        const parts = [];
        let current = element;
        while (current && current !== document.body) {
            const tag = current.tagName.toLowerCase();
            const siblings = Array.from(current.parentElement?.children || []).filter((node) => node.tagName === current.tagName);
            const index = siblings.length > 1 ? siblings.indexOf(current) + 1 : null;
            parts.unshift(index ? `${tag}:nth-of-type(${index})` : tag);
            current = current.parentElement;
        }

        return `body > ${parts.join(' > ')}`;
    };

    const resolveEditableTarget = (target) => {
        const element = target instanceof Element ? target : target?.parentElement;
        if (!element) {
            return null;
        }

        const mediaSelectors = ['.card-img-placeholder', '.media', '.shot'];
        const mediaTarget = mediaSelectors.map((selector) => element.closest(selector)).find(Boolean);
        if (mediaTarget) {
            const matchedMedia = selectorsByPage().find((field) => document.querySelector(field.selector) === mediaTarget || mediaTarget.matches(field.selector));
            if (matchedMedia) {
                return { field: matchedMedia, element: mediaTarget };
            }
            return { field: { label: 'Media', type: 'html' }, element: mediaTarget };
        }

        return null;
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

    const persistState = async (state) => {
        saveState(state);
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

        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', uploadEndpoint, true);

            request.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    setUploadStatus(`Envoi de ${file.name}... ${percent}%`, 'loading');
                } else {
                    setUploadStatus(`Envoi de ${file.name}...`, 'loading');
                }
            });

            request.addEventListener('load', () => {
                let payload = null;
                try {
                    payload = JSON.parse(request.responseText || '{}');
                } catch {
                    payload = null;
                }

                if (request.status < 200 || request.status >= 300) {
                    const message = payload?.error || payload?.warning || `Upload failed (${request.status})`;
                    setUploadStatus(message, 'error');
                    reject(new Error(message));
                    return;
                }

                if (payload?.warning) {
                    setUploadStatus(payload.warning, 'success');
                } else {
                    setUploadStatus(`Upload terminé: ${payload?.name || file.name}`, 'success');
                }

                resolve(payload || {});
            });

            request.addEventListener('error', () => {
                const message = 'Erreur réseau pendant l’upload';
                setUploadStatus(message, 'error');
                reject(new Error(message));
            });

            request.addEventListener('abort', () => {
                const message = 'Upload annulé';
                setUploadStatus(message, 'error');
                reject(new Error(message));
            });

            request.send(formData);
        });
    };

    const setUploadStatus = (message, type) => {
        if (!uploadStatusNode) {
            return;
        }

        uploadStatusNode.textContent = message;
        uploadStatusNode.className = 'dev-mode-status is-visible';
        if (type) {
            uploadStatusNode.classList.add(`is-${type}`);
        }
    };

    const isMediaField = (field) => field.type === 'html';

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

        return new Promise((resolve, reject) => {
            chooser.addEventListener('change', async () => {
                const file = chooser.files?.[0];
                if (!file) {
                    chooser.remove();
                    resolve(null);
                    return;
                }

                try {
                    const updatedState = getState();
                    let uploadedMeta = null;

                    if (canUseNetworkStorage) {
                        const uploaded = await uploadMediaFile(file);
                        updatedState[field.label] = JSON.stringify({
                            name: uploaded.name || file.name,
                            type: uploaded.type || file.type,
                            url: uploaded.url,
                            storage: uploaded.storage || 'remote'
                        });
                        uploadedMeta = uploaded;
                    } else {
                        const storageKey = `${pageKey}:${field.label}`;
                        await writeMediaFile(storageKey, file);
                        updatedState[field.label] = JSON.stringify({
                            name: file.name,
                            type: file.type,
                            key: storageKey
                        });
                        uploadedMeta = {
                            name: file.name,
                            type: file.type,
                            key: storageKey,
                            storage: 'local'
                        };
                    }

                    await persistState(updatedState);
                    await applySavedState();
                    chooser.remove();
                    resolve(uploadedMeta);
                } catch (error) {
                    chooser.remove();
                    reject(error);
                }
            }, { once: true });

            document.body.appendChild(chooser);
            chooser.click();
        });
    };

    const applyStateToElement = async (element, field) => {
        const state = getState();
        const value = state[field.label] ?? state[`dom:${field.selector}`];
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
    };

    const applySavedState = () => {
        return Promise.resolve();
    };

    const buildPanel = () => {
        ensureStyle();
        const existing = document.getElementById('dev-mode-panel');
        if (existing) {
            existing.remove();
        }
        clearActiveEditor();

        if (modeIndicatorNode) {
            modeIndicatorNode.remove();
            modeIndicatorNode = null;
        }

        if (devEnabled) {
            showModeIndicator('MODE DEV ACTIF - clique une image ou une video');
            const hint = document.createElement('div');
            hint.className = 'dev-mode-hint';
            hint.textContent = 'F10 pour quitter le mode dev';
            document.body.appendChild(hint);
            window.setTimeout(() => {
                hint.remove();
            }, 2400);
        }
    };

    const openEditorForField = async (field, element) => {
        clearActiveEditor();
        activeTargetElement = element;
        activeTargetElement.classList.add('dev-highlight');

        const editor = document.createElement('aside');
        editor.className = 'dev-mode-editor';
        editor.setAttribute('role', 'dialog');
        editor.setAttribute('aria-label', `Edition de ${field.label}`);

        const rect = element.getBoundingClientRect();
        const width = Math.min(420, window.innerWidth - 24);
        const left = Math.max(12, Math.min(rect.left, window.innerWidth - width - 12));
        const top = rect.bottom + 12 + 420 > window.innerHeight ? Math.max(12, rect.top - 12 - 320) : Math.min(window.innerHeight - 12, rect.bottom + 12);
        editor.style.left = `${left}px`;
        editor.style.top = `${top}px`;

        const state = getState();
        let currentValue = state[field.label];
        let mediaMeta = null;

        if (isMediaField(field)) {
            try {
                mediaMeta = JSON.parse(currentValue ?? 'null');
            } catch {
                mediaMeta = null;
            }
        }

        const title = document.createElement('h3');
        title.textContent = field.label;
        editor.appendChild(title);

        const meta = document.createElement('div');
        meta.className = 'meta';
        meta.textContent = 'Clique pour remplacer le media local ou distant.';
        editor.appendChild(meta);

        const form = document.createElement('div');

        const saveAndRefresh = async (nextValue) => {
            const updatedState = getState();
            const key = field.selector && field.selector.startsWith('body >') ? `dom:${field.selector}` : field.label;
            updatedState[key] = field.selector && field.selector.startsWith('body >') ? { kind: field.type, value: nextValue } : nextValue;
            await persistState(updatedState);
            await applySavedState();
            showModeIndicator('Modif sauvegardee');
        };

        if (isMediaField(field)) {
            const preview = document.createElement('div');
            preview.className = 'dev-mode-status is-visible';
            preview.textContent = mediaMeta?.name || element.textContent.trim() || 'Aucun media selectionne';
            form.appendChild(preview);

            const chooser = document.createElement('button');
            chooser.type = 'button';
            chooser.textContent = 'Choisir un fichier';
            chooser.className = 'secondary';
            chooser.addEventListener('click', async () => {
                try {
                    setUploadStatus(`Préparation de ${field.label}...`, 'loading');
                    const updated = await pickFileForField(field, element);
                    preview.textContent = updated?.name || field.label;
                    await applySavedState();
                    showModeIndicator('Media mis a jour');
                } catch (error) {
                    console.error(error);
                    setUploadStatus(error.message || 'Impossible d’uploader ce fichier.', 'error');
                }
            });
            form.appendChild(chooser);
        } else {
            const fallback = document.createElement('div');
            fallback.className = 'dev-mode-status is-visible is-error';
            fallback.textContent = 'This mode is media only.';
            form.appendChild(fallback);
        }

        editor.appendChild(form);

        activeEditorNode = editor;
        document.body.appendChild(editor);
    };

    let devEnabled = false;
    const syncMode = () => {
        document.body.classList.toggle('dev-mode-active', devEnabled);
        if (devEnabled) {
            buildPanel();
        } else {
            clearActiveEditor();
            const panel = document.getElementById('dev-mode-panel');
            if (panel) {
                panel.remove();
            }
            if (modeIndicatorNode) {
                modeIndicatorNode.remove();
                modeIndicatorNode = null;
            }
            document.querySelectorAll('.dev-highlight').forEach((node) => node.classList.remove('dev-highlight'));
        }
    };

    window.addEventListener('keydown', (event) => {
        if (event.key === toggleKey) {
            event.preventDefault();
            devEnabled = !devEnabled;
            syncMode();
        }
        if (event.key === 'Escape' && devEnabled) {
            if (activeEditorNode) {
                clearActiveEditor();
                return;
            }
            devEnabled = false;
            syncMode();
        }
    });

    document.addEventListener('click', (event) => {
        if (!devEnabled) {
            return;
        }

        if (event.target.closest('.dev-mode-editor, .dev-mode-badge, .dev-mode-hint')) {
            return;
        }

        const match = resolveEditableTarget(event.target) || findFieldForTarget(event.target);
        if (!match) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        openEditorForField(match.field, match.element).catch((error) => {
            console.error(error);
            setUploadStatus(error.message || 'Impossible d’ouvrir l’éditeur.', 'error');
        });
    }, true);

    window.addEventListener('DOMContentLoaded', () => {
        applySavedState();
    });
})();