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
    .shell-enhanced body {
      background:
        radial-gradient(circle at top, rgba(56, 189, 248, 0.14), transparent 30%),
        linear-gradient(180deg, #020617 0%, #0f172a 55%, #020617 100%);
    }

    .shell-panel {
      max-width: 1280px;
      margin: 24px auto 0;
      padding: 24px;
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 20px;
      background: linear-gradient(180deg, rgba(2, 6, 23, 0.95), rgba(15, 23, 42, 0.88));
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
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 16px;
      background: rgba(2, 6, 23, 0.82);
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
      color: #38bdf8;
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
      color: #38bdf8;
      text-shadow: 0 0 24px rgba(56, 189, 248, 0.3);
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
      border: 1px solid rgba(56, 189, 248, 0.28);
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.7);
      color: #e2e8f0;
      font-size: 0.82rem;
      cursor: pointer;
      transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
    }

    .shell-chip:hover {
      transform: translateY(-1px);
      border-color: rgba(56, 189, 248, 0.7);
      background: rgba(14, 165, 233, 0.15);
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
      background: rgba(2, 6, 23, 0.92);
      border: 1px solid rgba(56, 189, 248, 0.28);
      color: #f8fafc;
      border-radius: 10px;
      padding: 12px 14px;
      font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
      outline: none;
    }

    .shell-input:focus { border-color: #38bdf8; box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.12); }

    .shell-submit {
      border: 0;
      border-radius: 10px;
      padding: 12px 14px;
      background: linear-gradient(180deg, #38bdf8, #0ea5e9);
      color: #001018;
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

    .shell-card h3 { margin: 0 0 10px; color: #38bdf8; }
    .shell-card p { margin: 0 0 12px; color: #cbd5e1; font-size: 0.92rem; }
    .shell-card .meta { display: flex; flex-wrap: wrap; gap: 8px; }
    .shell-tag {
      padding: 4px 8px;
      border-radius: 999px;
      background: rgba(56, 189, 248, 0.12);
      color: #e0f2fe;
      border: 1px solid rgba(56, 189, 248, 0.2);
      font-size: 0.76rem;
    }

    .shell-cta {
      margin-top: 12px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .shell-button {
      border: 1px solid rgba(56, 189, 248, 0.32);
      background: rgba(15, 23, 42, 0.84);
      color: #f8fafc;
      border-radius: 10px;
      padding: 9px 12px;
      cursor: pointer;
      text-decoration: none;
      font-size: 0.85rem;
    }

    .shell-button.primary {
      background: linear-gradient(180deg, #38bdf8, #0ea5e9);
      color: #001018;
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

  const buildHome = () => {
    const container = document.querySelector('.container');
    if (!container || document.getElementById('portfolio-command-center')) {
      return;
    }

    const header = document.querySelector('body > header');
    if (header) {
      const title = header.querySelector('h1');
      const subtitle = header.querySelector('h2');
      if (title) {
        title.textContent = 'Game Dev Terminal';
      }
      if (subtitle) {
        subtitle.textContent = 'Interactive coding portfolio // type help to launch the hub';
      }
    }

    const panel = document.createElement('section');
    panel.id = 'portfolio-command-center';
    panel.className = 'shell-panel';
    panel.innerHTML = `
      <div class="shell-top">
        <div class="shell-terminal">
          <div class="shell-label">Portfolio Runtime</div>
          <h2 class="shell-title">> <span>Game Dev</span> Control Node</h2>
          <p class="shell-subtitle">Tape des commandes pour explorer le portfolio comme un mini jeu de navigation. Help, projects, skills et play sont disponibles.</p>
          <div class="shell-chips" id="portfolio-quick-chips"></div>
          <div class="shell-output" id="portfolio-terminal-output" aria-live="polite"></div>
          <div class="shell-input-row">
            <span class="shell-prompt">guest@portfolio:~$</span>
            <input class="shell-input" id="portfolio-command-input" autocomplete="off" placeholder="help, about, projects, skills, play 1" />
            <button class="shell-submit" id="portfolio-command-submit" type="button">Run</button>
          </div>
        </div>
        <aside class="shell-tree">
          <div class="tree-branch">
            <h3>Skill Tree</h3>
            ${skillNodes.map((node) => `
              <div class="tree-item">
                <span><strong>${node.label}</strong><em>${node.level}%</em></span>
                <div class="tree-bar"><i style="width:${node.level}%"></i></div>
              </div>
            `).join('')}
          </div>
          <div class="tree-branch">
            <h3>Daily Quests</h3>
            <div class="console-lines" id="portfolio-quest-list"></div>
          </div>
        </aside>
      </div>
      <div class="shell-grid" id="portfolio-command-grid"></div>
      <div class="shell-console">
        <div class="shell-label">Live Console</div>
        <div class="console-lines" id="portfolio-live-log"></div>
      </div>
    `;

    container.parentNode.insertBefore(panel, container);
    container.style.display = 'none';

    const output = panel.querySelector('#portfolio-terminal-output');
    const log = panel.querySelector('#portfolio-live-log');
    const questList = panel.querySelector('#portfolio-quest-list');
    const input = panel.querySelector('#portfolio-command-input');
    const submit = panel.querySelector('#portfolio-command-submit');
    const quickChips = panel.querySelector('#portfolio-quick-chips');
    const grid = panel.querySelector('#portfolio-command-grid');

    const write = (text) => appendConsoleLine(output, text);
    const logLine = (text) => appendConsoleLine(log, text);

    const commands = {
      help: () => [
        'help - afficher les commandes',
        'about - présenter le portfolio',
        'projects - lister les projets',
        'skills - afficher les compétences',
        'play <id|nom> - ouvrir un projet',
        'clear - nettoyer la console'
      ],
      about: () => [
        'Portfolio construit comme un cockpit de dev-game.',
        'Navigation pensée comme une expérience interactive.'
      ],
      projects: () => projects.map((project) => `${project.id}. ${project.title} // ${project.summary}`),
      skills: () => skillNodes.map((node) => `${node.label}: ${node.level}%`),
      clear: () => []
    };

    const showProjects = () => {
      grid.innerHTML = projects.map((project) => `
        <article class="shell-card" data-project-id="${project.id}">
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="meta">
            <span class="shell-tag">${project.skill}</span>
            <span class="shell-tag">Mission ${project.id}</span>
          </div>
          <div class="shell-cta">
            <button class="shell-button primary" data-project-open="${project.id}">Play</button>
            <a class="shell-button" href="${project.path}">Open dossier</a>
          </div>
        </article>
      `).join('');

      grid.querySelectorAll('[data-project-open]').forEach((button) => {
        button.addEventListener('click', () => {
          const project = projects.find((item) => item.id === button.getAttribute('data-project-open'));
          if (project) {
            logLine(`Launching ${project.title}...`);
            window.location.href = project.path;
          }
        });
      });
    };

    const renderQuests = () => {
      questList.innerHTML = [
        'Launch a project',
        'Read a code snippet',
        'Open the skill tree',
        'Try a command: help'
      ].map((quest) => `<div>${quest}</div>`).join('');
    };

    const renderQuickChips = () => {
      const quickActions = [
        ['Help', 'help'],
        ['Projects', 'projects'],
        ['Skills', 'skills'],
        ['Play 1', 'play 1'],
        ['Play 2', 'play 2'],
        ['About', 'about']
      ];
      quickChips.innerHTML = quickActions.map(([label, command]) => `<button type="button" class="shell-chip" data-command="${command}">${label}</button>`).join('');
      quickChips.querySelectorAll('[data-command]').forEach((chip) => {
        chip.addEventListener('click', () => runCommand(chip.getAttribute('data-command') || 'help'));
      });
    };

    const runCommand = (raw) => {
      const command = raw.trim();
      if (!command) {
        return;
      }

      write(`guest@portfolio:~$ ${command}`);

      const [action, ...rest] = command.toLowerCase().split(/\s+/);
      if (action === 'clear') {
        output.innerHTML = '';
        write('Console cleared.');
        return;
      }

      if (action === 'play') {
        const query = rest.join(' ');
        const project = projects.find((item) => item.aliases.some((alias) => alias === query || item.title.toLowerCase().includes(query) || query.includes(alias)));
        if (project) {
          logLine(`Mission ${project.id} selected: ${project.title}`);
          window.location.href = project.path;
          return;
        }

        write('Unknown project. Try: play 1, play 2, play 3...');
        return;
      }

      if (commands[action]) {
        const lines = commands[action]();
        if (!lines.length) {
          write('');
        } else {
          lines.forEach(write);
        }
        if (action === 'projects') {
          showProjects();
        }
        if (action === 'skills') {
          window.scrollTo({ top: panel.offsetTop, behavior: 'smooth' });
        }
        return;
      }

      const matched = projects.find((item) => item.aliases.some((alias) => command.includes(alias)));
      if (matched) {
        logLine(`Opening ${matched.title}...`);
        window.location.href = matched.path;
        return;
      }

      write(`Unknown command: ${command}`);
      write('Type help to see available actions.');
    };

    submit.addEventListener('click', () => {
      runCommand(input.value);
      input.value = '';
      input.focus();
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        runCommand(input.value);
        input.value = '';
      }
    });

    renderQuickChips();
    renderQuests();
    showProjects();
    logLine('Booting game-dev portfolio shell...');
    logLine('Terminal online. Type help to start the run.');
    write('System ready.');

    const existingCards = document.querySelectorAll('.card');
    existingCards.forEach((card, index) => {
      const project = projects[index];
      if (!project) return;
      card.setAttribute('data-project-id', project.id);
      const title = card.querySelector('.card-title');
      const description = card.querySelector('.card-description');
      if (title) {
        const badge = document.createElement('span');
        badge.className = 'shell-tag';
        badge.textContent = `Mission ${project.id}`;
        title.insertAdjacentElement('beforebegin', badge);
      }
      if (description) {
        description.insertAdjacentElement('afterend', (() => {
          const cta = document.createElement('div');
          cta.className = 'shell-cta';
          cta.innerHTML = `<a class="shell-button primary" href="${project.path}">Play mission</a><a class="shell-button" href="${project.path}">Open dossier</a>`;
          return cta;
        })());
      }
    });
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