(function () {
  const projects = [
    {
      id: '1',
      title: 'Game Jam',
      role: 'Gameplay Programmer',
      path: 'pages/projet1.html',
      variant: 'featured',
      summary: 'Plateformer rapide centré sur le feeling, le jump buffer et l\'UI.',
      pitch: 'Un projet conçu pour une Game Jam, pensé pour être lisible, nerveux et immédiatement jouable.',
      bullets: [
        'Prototype du déplacement et du saut avec coyote time et jump buffer.',
        'Mise en place de l\'UI de base et des écrans de fin de partie.',
        'Intégration des retours visuels pour rendre le gameplay plus lisible.'
      ],
      tech: ['Unity', 'C#', 'Git'],
      team: 'Équipe de 2 : 1 programmeur, 1 artiste.',
      context: 'Game Jam de 48h.',
      build: '',
      source: '',
      trailer: 'Trailer gameplay à intégrer.',
      gallery: ['Capture de gameplay', 'UI / menu', 'Mécanique clé'],
      cover: 'linear-gradient(135deg, #111111 0%, #3f3f46 42%, #cbd5e1 100%)'
    },
    {
      id: '2',
      title: 'Projet 3D',
      role: 'Systems Programmer',
      path: 'pages/projet2.html',
      variant: 'medium',
      summary: 'Prototype 3D orienté systèmes, IA ennemie et State Machine.',
      pitch: 'Un prototype 3D où j\'ai surtout travaillé la structure des comportements et la lisibilité des systèmes.',
      bullets: [
        'Création et refactoring de la State Machine des ennemis.',
        'Mise en place des comportements de poursuite et de patrouille.',
        'Travail en équipe avec Git pour garder un code propre et intégrable.'
      ],
      tech: ['Unity 3D', 'C#', 'Git'],
      team: 'Équipe de 7 : 3 programmeurs, 3 artistes, 1 sound designer.',
      context: 'Projet étudiant sur plusieurs semaines.',
      build: '',
      source: '',
      trailer: 'Trailer gameplay à intégrer.',
      gallery: ['Environnement 3D', 'IA ennemie', 'HUD'],
      cover: 'linear-gradient(135deg, #0f172a 0%, #334155 50%, #dbeafe 100%)'
    },
    {
      id: '3',
      title: 'Projet Mobile',
      role: 'Mobile Gameplay Programmer',
      path: 'pages/projet3.html',
      variant: 'medium',
      summary: 'Version mobile pensée pour les contrôles tactiles et la performance.',
      pitch: 'Un projet mobile centré sur la prise en main tactile, la stabilité et l\'optimisation Android.',
      bullets: [
        'Intégration des contrôles tactiles et de leur retour visuel.',
        'Optimisation des performances pour une exécution fluide sur mobile.',
        'Gestion de la progression et des données de session.'
      ],
      tech: ['Unity', 'C#', 'Android'],
      team: 'Équipe de 7 : pôles programme, art et audio.',
      context: 'Projet étudiant orienté mobile.',
      build: '',
      source: '',
      trailer: 'Trailer gameplay à intégrer.',
      gallery: ['UI tactile', 'Gameplay portrait', 'Optimisation'],
      cover: 'linear-gradient(135deg, #111827 0%, #52525b 48%, #f3f4f6 100%)'
    },
    {
      id: '4',
      title: 'Multijoueur',
      role: 'Network Gameplay Programmer',
      path: 'pages/projet4.html',
      variant: 'small',
      summary: 'Architecture réseau et synchronisation des joueurs.',
      pitch: 'Un projet multijoueur où l\'objectif était de garder les interactions claires, stables et synchronisées.',
      bullets: [
        'Mise en place de la base réseau et des échanges de données.',
        'Synchronisation des déplacements, des collisions et du score.',
        'Organisation du code pour faciliter les tests en coopération.'
      ],
      tech: ['Unity', 'C#', 'Réseau'],
      team: 'Projet en duo.',
      context: 'Prototype réseau étudié en cours.',
      build: '',
      source: '',
      trailer: 'Trailer gameplay à intégrer.',
      gallery: ['Lobby', 'Sync joueurs', 'Partie réseau'],
      cover: 'linear-gradient(135deg, #0f172a 0%, #1f2937 48%, #e5e7eb 100%)'
    },
    {
      id: '5',
      title: 'SFML',
      role: 'C++ Systems Programmer',
      path: 'pages/projet5.html',
      variant: 'small',
      summary: 'Moteur en C++ avec boucle de jeu et collisions.',
      pitch: 'Un projet bas niveau où j\'ai travaillé la boucle de jeu, la structure du code et les collisions.',
      bullets: [
        'Création de la boucle de jeu et du pipeline de rendu.',
        'Gestion de la mémoire et des structures de données en C++.',
        'Système de collision 2D simple et robuste.'
      ],
      tech: ['C++', 'SFML', 'Git'],
      team: 'Équipe de 7 : répartition par modules.',
      context: 'Projet technique sur moteur 2D.',
      build: '',
      source: '',
      trailer: 'Trailer gameplay à intégrer.',
      gallery: ['Boucle de jeu', 'Collision', 'Rendu'],
      cover: 'linear-gradient(135deg, #111827 0%, #374151 45%, #fafafa 100%)'
    },
    {
      id: '6',
      title: 'CSFML',
      role: 'C Systems Programmer',
      path: 'pages/projet6.html',
      variant: 'small',
      summary: 'Bas niveau en C avec rendu graphique maîtrisé.',
      pitch: 'Un projet orienté C où j\'ai travaillé sur l\'affichage, les structures et la logique de jeu.',
      bullets: [
        'Programmation du rendu et de la logique principale en C.',
        'Structuration des données et allocation mémoire.',
        'Travail sur la clarté du code et l\'organisation des fichiers.'
      ],
      tech: ['C', 'CSFML', 'Git'],
      team: 'Équipe de 7 : projet collectif.',
      context: 'Projet technique en langage C.',
      build: '',
      source: '',
      trailer: 'Trailer gameplay à intégrer.',
      gallery: ['Rendu CSFML', 'Structures', 'Prototype'],
      cover: 'linear-gradient(135deg, #09090b 0%, #3f3f46 52%, #d4d4d8 100%)'
    }
  ];

  const projectByPath = (pathname) => projects.find((project) => pathname.endsWith(project.path));

  const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const renderTags = (items) => items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join('');

  const renderCard = (project) => {
    const coverStyle = `--card-bg: ${project.cover};`;
    return `
      <a class="card card--${project.variant}" href="${project.path}">
        <div class="card-img-placeholder" style="${coverStyle}"></div>
        <div class="card-content">
          <p class="card-kicker">${escapeHtml(project.role)}</p>
          <h3 class="card-title">${escapeHtml(project.title)}</h3>
          <p class="card-summary">${escapeHtml(project.summary)}</p>
          <div class="card-meta">${renderTags(project.tech)}</div>
          <div class="card-footer">
            <span class="card-note">${project.variant === 'featured' ? 'Projet phare' : 'Plus d\'info'}</span>
            <span class="card-cta">Voir le projet</span>
          </div>
        </div>
      </a>
    `;
  };

  const renderHome = () => {
    const cards = projects.map(renderCard).join('');

    document.title = 'Portfolio - Développeur Jeu Vidéo';
    document.body.innerHTML = `
      <main class="portfolio-shell portfolio-home">
        <header class="site-header">
          <div class="site-heading">
            <p class="site-kicker">Portfolio développeur jeu vidéo</p>
            <h1 class="site-title">6 projets, une lecture rapide.</h1>
            <p class="site-lead">Une grille bento sobre pour présenter les projets les plus solides, avec une hiérarchie claire et des accès directs à chaque deep dive.</p>
          </div>
          <div class="site-actions">
            <a class="button" href="#projects">Voir les projets</a>
            <a class="button secondary" href="#contact">CV / Contact</a>
          </div>
        </header>

        <section class="intro-strip" aria-label="Résumé du portfolio">
          <div class="intro-chip"><span>Unity</span><strong>C# / Gameplay</strong></div>
          <div class="intro-chip"><span>SFML</span><strong>C++ / C</strong></div>
          <div class="intro-chip"><span>Focus</span><strong>Lisibilité et impact recruteur</strong></div>
        </section>

        <section class="projects-section" id="projects">
          <div class="section-header">
            <p class="site-kicker">Grille bento</p>
            <h2>Projets sélectionnés</h2>
            <p>Le projet phare prend plus de place, les projets secondaires restent lisibles, et chaque carte donne accès à une page détaillée.</p>
          </div>
          <div class="projects-grid">
            ${cards}
          </div>
        </section>

        <section class="contact-strip" id="contact">
          <div>
            <p class="site-kicker">Contact</p>
            <h2>À brancher avec tes liens finaux</h2>
            <p>Ajoute ici LinkedIn, GitHub et CV PDF pour finaliser la page d\'accueil.</p>
          </div>
          <div class="site-actions">
            <a class="button" href="#projects">Retour aux projets</a>
          </div>
        </section>
      </main>
    `;
  };

  const renderListItems = (items) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');

  const renderProjectPage = (project) => {
    const buildButton = project.build
      ? `<a class="btn btn-primary" href="${project.build}" target="_blank" rel="noreferrer">Jouer / Télécharger le Build</a>`
      : '<span class="btn btn-primary is-disabled">Jouer / Télécharger le Build</span>';

    const sourceButton = project.source
      ? `<a class="btn" href="${project.source}" target="_blank" rel="noreferrer">Code Source</a>`
      : '<span class="btn is-disabled">Code Source</span>';

    document.title = `${project.title} - Portfolio`;
    document.body.innerHTML = `
      <main class="portfolio-shell project-shell">
        <a class="back-link" href="../Site.html">← Retour au portfolio</a>

        <section class="project-hero">
          <div class="media">
            <div class="media-placeholder" style="background: ${project.cover};">
              <p class="media-label">Trailer</p>
              <h1>${escapeHtml(project.title)}</h1>
              <p>${escapeHtml(project.trailer)}</p>
              <span class="media-meta">${escapeHtml(project.role)}</span>
            </div>
          </div>
          <div class="project-title-row">
            <div>
              <p class="site-kicker">Projet ${escapeHtml(project.id)}</p>
              <h1 class="project-title">${escapeHtml(project.title)} — ${escapeHtml(project.role)}</h1>
              <p class="project-role">${escapeHtml(project.summary)}</p>
            </div>
          </div>
        </section>

        <section class="project-grid">
          <article class="panel">
            <h2>Pitch</h2>
            <p>${escapeHtml(project.pitch)}</p>

            <h2>Ce que j\'ai fait</h2>
            <ul class="list description-list">
              ${renderListItems(project.bullets)}
            </ul>

            <h2>Galerie</h2>
            <div class="grid">
              ${project.gallery.map((item) => `<div class="shot">${escapeHtml(item)}</div>`).join('')}
            </div>
          </article>

          <aside class="meta-grid">
            <div class="panel meta-block">
              <h2>Technologies</h2>
              <p>${project.tech.map(escapeHtml).join(' • ')}</p>
            </div>
            <div class="panel meta-block">
              <h2>Équipe</h2>
              <p>${escapeHtml(project.team)}</p>
            </div>
            <div class="panel meta-block">
              <h2>Contexte</h2>
              <p>${escapeHtml(project.context)}</p>
            </div>
          </aside>
        </section>

        <section class="downloads">
          ${buildButton}
          ${sourceButton}
        </section>
      </main>
    `;
  };

  const injectStyles = () => {
    if (document.getElementById('portfolio-shell-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'portfolio-shell-styles';
    style.textContent = `
      :root {
        color-scheme: light;
        --bg: #f5f3ee;
        --surface: #ffffff;
        --surface-soft: #faf9f6;
        --surface-ink: #111111;
        --text-main: #111111;
        --text-muted: #52525b;
        --border: #dfddd6;
        --shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
      }

      html, body {
        min-height: 100%;
      }

      body {
        margin: 0;
        background: linear-gradient(180deg, #ffffff 0%, var(--bg) 100%);
        color: var(--text-main);
        font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      }

      a {
        color: inherit;
      }

      .portfolio-shell {
        width: min(1360px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 28px 0 56px;
      }

      .site-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 24px;
        margin-bottom: 22px;
      }

      .site-heading {
        max-width: 68ch;
      }

      .site-kicker {
        margin: 0 0 12px;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 0.76rem;
        color: var(--text-muted);
      }

      .site-title,
      .section-header h2,
      .contact-strip h2,
      .project-title {
        margin: 0;
        letter-spacing: -0.05em;
        line-height: 0.96;
      }

      .site-title {
        font-size: clamp(2.6rem, 6vw, 5rem);
        max-width: 10ch;
      }

      .site-lead,
      .section-header p,
      .contact-strip p,
      .project-role,
      .panel p,
      .card-summary {
        color: var(--text-muted);
        line-height: 1.65;
      }

      .site-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }

      .button,
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 46px;
        padding: 12px 18px;
        border-radius: 999px;
        border: 1px solid var(--surface-ink);
        background: var(--surface-ink);
        color: #ffffff;
        text-decoration: none;
        font-weight: 700;
        transition: transform 160ms ease, background 160ms ease, color 160ms ease, border-color 160ms ease;
      }

      .button.secondary,
      .btn:not(.btn-primary) {
        background: transparent;
        color: var(--surface-ink);
      }

      .button:hover,
      .btn:hover {
        transform: translateY(-1px);
      }

      .button.secondary:hover,
      .btn:not(.btn-primary):hover {
        background: rgba(17, 17, 17, 0.06);
      }

      .is-disabled {
        opacity: 0.55;
        pointer-events: none;
      }

      .intro-strip,
      .contact-strip {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
        margin-bottom: 18px;
      }

      .intro-chip,
      .contact-strip,
      .panel {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 24px;
        box-shadow: var(--shadow);
      }

      .intro-chip {
        padding: 18px;
      }

      .intro-chip span {
        display: block;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.14em;
        font-size: 0.72rem;
        margin-bottom: 8px;
      }

      .intro-chip strong {
        display: block;
        font-size: 1rem;
      }

      .projects-section {
        margin-top: 26px;
      }

      .section-header {
        display: grid;
        gap: 8px;
        margin-bottom: 18px;
      }

      .section-header h2 {
        font-size: clamp(1.8rem, 3vw, 2.6rem);
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 18px;
      }

      .card {
        position: relative;
        min-height: 240px;
        border-radius: 28px;
        overflow: hidden;
        border: 1px solid var(--border);
        background: var(--surface);
        box-shadow: var(--shadow);
        text-decoration: none;
        color: inherit;
        display: flex;
        align-items: flex-end;
        isolation: isolate;
      }

      .card::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 18%, rgba(0, 0, 0, 0.58) 100%);
        z-index: 1;
      }

      .card-img-placeholder {
        position: absolute;
        inset: 0;
        background: var(--card-bg);
        transform: scale(1);
        transition: transform 420ms ease;
        z-index: 0;
      }

      .card:hover .card-img-placeholder {
        transform: scale(1.04);
      }

      .card-content {
        position: relative;
        z-index: 2;
        width: 100%;
        padding: 22px;
        color: #ffffff;
        display: grid;
        gap: 12px;
      }

      .card-kicker {
        margin: 0;
        color: rgba(255, 255, 255, 0.8);
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 0.74rem;
      }

      .card-title {
        margin: 0;
        font-size: clamp(1.35rem, 2.6vw, 2.1rem);
        letter-spacing: -0.04em;
      }

      .card-summary {
        margin: 0;
        max-width: 42ch;
        color: rgba(255, 255, 255, 0.84);
      }

      .card-meta {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .tag {
        display: inline-flex;
        align-items: center;
        padding: 7px 10px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.14);
        color: #ffffff;
        backdrop-filter: blur(10px);
        font-size: 0.78rem;
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
        margin-top: 4px;
      }

      .card-note {
        font-size: 0.78rem;
        color: rgba(255, 255, 255, 0.72);
      }

      .card-cta {
        padding: 9px 12px;
        border-radius: 999px;
        background: #ffffff;
        color: #111111;
        font-weight: 800;
        font-size: 0.82rem;
      }

      .card--featured {
        grid-column: span 7;
        min-height: 520px;
      }

      .card--medium {
        grid-column: span 5;
        min-height: 250px;
      }

      .card--small {
        grid-column: span 4;
        min-height: 230px;
      }

      .card--featured .card-content {
        padding: 28px;
      }

      .contact-strip {
        grid-template-columns: minmax(0, 1.6fr) auto;
        align-items: center;
        padding: 22px;
        margin-top: 28px;
      }

      .contact-strip h2 {
        font-size: clamp(1.5rem, 2.5vw, 2.1rem);
      }

      .project-shell {
        width: min(1180px, calc(100vw - 32px));
        padding-top: 24px;
      }

      .back-link {
        display: inline-flex;
        margin-bottom: 18px;
        text-decoration: none;
        color: var(--text-muted);
        font-weight: 700;
      }

      .project-hero {
        display: grid;
        gap: 18px;
      }

      .media {
        border: 1px solid var(--border);
        border-radius: 30px;
        background: var(--surface-ink);
        color: #ffffff;
        overflow: hidden;
        min-height: 520px;
        box-shadow: var(--shadow);
      }

      .media-placeholder {
        min-height: 520px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        text-align: center;
        padding: 32px;
        background: var(--hero-bg);
      }

      .media-placeholder h1 {
        margin: 0;
        font-size: clamp(1.9rem, 4vw, 3.8rem);
        letter-spacing: -0.05em;
      }

      .media-placeholder p,
      .media-placeholder .media-meta,
      .media-label {
        color: rgba(255, 255, 255, 0.84);
      }

      .media-label {
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 0.74rem;
      }

      .project-title-row {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        align-items: flex-end;
        flex-wrap: wrap;
      }

      .project-title {
        font-size: clamp(2rem, 4vw, 3.8rem);
      }

      .project-role {
        margin: 10px 0 0;
      }

      .project-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
        gap: 18px;
        margin-top: 20px;
      }

      .panel {
        padding: 22px;
        border-radius: 24px;
      }

      .panel h2 {
        margin: 0 0 12px;
        font-size: 1.05rem;
      }

      .panel h2:not(:first-child) {
        margin-top: 22px;
      }

      .list {
        margin: 0;
        padding-left: 18px;
        display: grid;
        gap: 10px;
      }

      .list li {
        color: var(--text-muted);
      }

      .meta-grid {
        display: grid;
        gap: 18px;
      }

      .meta-block {
        display: grid;
        gap: 6px;
      }

      .meta-block p {
        margin: 0;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
        margin-top: 14px;
      }

      .shot {
        min-height: 160px;
        border-radius: 18px;
        border: 1px dashed #d1d5db;
        background: #fafafa;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
        text-align: center;
        padding: 16px;
      }

      .downloads {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-top: 20px;
      }

      @media (max-width: 1080px) {
        .site-header,
        .contact-strip,
        .project-grid {
          grid-template-columns: 1fr;
          display: grid;
        }

        .site-header {
          align-items: start;
        }

        .intro-strip,
        .grid {
          grid-template-columns: 1fr;
        }

        .card--featured,
        .card--medium,
        .card--small {
          grid-column: span 12;
        }

        .media-placeholder,
        .media {
          min-height: 360px;
        }
      }

      @media (max-width: 720px) {
        .portfolio-shell {
          width: min(100vw - 20px, 1360px);
        }

        .projects-grid {
          grid-template-columns: 1fr;
        }

        .card,
        .card--featured,
        .card--medium,
        .card--small {
          grid-column: auto;
          min-height: 220px;
        }

        .card-footer {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `;

    document.head.appendChild(style);
  };

  const init = () => {
    injectStyles();

    const currentProject = projectByPath(window.location.pathname);
    document.documentElement.classList.add('portfolio-app');

    if (currentProject) {
      document.documentElement.classList.add('portfolio-project-page');
      renderProjectPage(currentProject);
      return;
    }

    document.documentElement.classList.add('portfolio-home-page');
    renderHome();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
