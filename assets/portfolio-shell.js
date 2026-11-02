(function () {
  // Infos personnelles : un lien vide n'est pas affiché sur le site.
  const profile = {
    name: 'Andrea Catanese',
    role: 'Gameplay Programmer',
    school: 'Creajeux',
    schoolUrl: 'https://www.creajeux.fr/',
    email: 'andrea.catanese1@gmail.com',
    phone: '+33 6 15 04 18 59',
    linkedin: 'https://www.linkedin.com/in/andrea-catanèse-908654251/',
    github: 'https://github.com/ucilla',
    itch: '',
    cv: 'assets/CV_Andrea_Catanese.pdf'
  };

  const projects = [
    {
      id: '1',
      slug: 'escape-moscow',
      title: 'Escape Moscow',
      tagline: 'Retrouvez la surface',
      role: 'Gameplay Programmer',
      path: 'pages/projet1.html',
      variant: 'featured',
      accent: '#f5a524',
      year: '2026',
      level: '3e année',
      platform: 'PC',
      genre: 'FPS',
      duration: '8 semaines',
      languages: 'Anglais, Russe',
      summary: 'FPS de survie post-apocalyptique dans le métro de Moscou : déplacements nerveux, ambiance lourde et vagues d\'ennemis.',
      pitch: 'Dans un métro infesté, un homme immunisé utilise ses pouvoirs pour récolter des ressources, fabriquer une combinaison de survie et se frayer un chemin jusqu\'à un hôpital afin de créer un remède.',
      bullets: [
        'Player controller complet : wall run, glissade, grappin…',
        'Level design des niveaux 1 et 2, environment art compris.',
        'Système de vagues et d\'ennemis : sirènes, déplacements et comportements de l\'IA.',
        'Atmosphère : éclairage, brouillard, shaders d\'eau et de fumée.',
        'Feedback de tir et de déplacement : head bob, effets de FOV, recul.',
        'Inventaire avec sauvegarde et mécaniques de récolte de ressources.',
        'Puzzles et cinématiques des niveaux 1 et 2.',
        'VFX : impacts, étincelles, explosions, effets de mort.',
        'Sound design et SFX.'
      ],
      tech: ['Unity', 'C#', 'Git'],
      team: [
        { label: 'Programmation', names: ['Thomas Berville', 'Andrea Catanese', 'Emilien Chastel', 'Matéo Goncalves', 'Romain Le Corre', 'Clément Martin', 'Raphaël Travers'] },
        { label: 'Infographie', names: ['Ethan Dunand', 'Max Vancaeneghem', 'Lilou Michel-Cuny'] },
        { label: 'Sons et musiques', names: ['Andrea Catanese', 'Ewan Georget', 'Raphaël Travers'] }
      ],
      context: 'Projet de 3e année à Creajeux. La boucle de gameplay, la progression des niveaux et les systèmes de survie sont en place ; le contenu restant et le polish sont en cours.',
      build: 'https://www.creajeux.fr/download/projets2026/escapemoscow.zip',
      source: '',
      creajeux: 'https://www.creajeux.fr/projet/escape-moscow/',
      trailer: { type: 'youtube', id: '8ZHNlsrWzFA', poster: 'assets/projects/escape-moscow/hero.jpg' },
      cover: 'assets/projects/escape-moscow/hero.jpg',
      thumb: 'assets/projects/escape-moscow/card.jpg',
      gallery: ['assets/projects/escape-moscow/hero.jpg', 'assets/projects/escape-moscow/shot-1.jpg']
    },
    {
      id: '7',
      slug: 'projet-de-soutenance',
      title: 'Projet de soutenance',
      tagline: '70 000 entités à 60+ FPS',
      role: 'Technical Programmer',
      path: 'pages/projet7.html',
      variant: 'tall',
      accent: '#38bdf8',
      year: '',
      level: '',
      platform: 'PC',
      genre: 'Démo technique',
      duration: '',
      languages: '',
      summary: 'Démo technique sous Unity DOTS : une nuée de 70 000 agents qui se déplace, change de forme et s\'assemble en temps réel.',
      pitch: 'Ce projet de soutenance simule une nuée de dizaines de milliers d\'agents avec l\'ECS de Unity. Les agents suivent des flux générés par splines, épousent la forme de modèles 3D et s\'assemblent en structures qui réagissent physiquement aux impacts, le tout en gardant plus de 60 FPS.',
      bullets: [
        'Performance & ECS : rendu et instanciation massive de 70 000 entités à plus de 60 FPS grâce à DOTS.',
        'IA & nuée : algorithme des boids de Reynolds (séparation, alignement, cohésion) couplé à Unity Physics.',
        'Algorithmique : morphing par assignation dynamique des agents sur les vertices des meshes, sans croisement de trajectoires.',
        'Splines : intégration de Unity Splines pour générer des flux adaptatifs et des tentacules.',
        'Physique : transition dynamique des masses et comportement cinématique des structures assemblées lors des impacts.'
      ],
      tech: ['Unity', 'DOTS / ECS', 'C#', 'Unity Physics', 'Unity Splines'],
      pattern: 'swarm',
      team: 'Projet réalisé seul.',
      status: 'En cours',
      context: 'Projet technique de soutenance, toujours en cours de développement.',
      build: '',
      source: '',
      creajeux: '',
      trailer: null,
      cover: '',
      thumb: '',
      gallery: []
    },
    {
      id: '2',
      slug: 'ninja-frog',
      title: 'Ninja Frog',
      tagline: 'Party game de parcours en multijoueur',
      role: 'Gameplay Programmer & Level Designer',
      path: 'pages/projet2.html',
      variant: 'tall',
      accent: '#4ade80',
      year: '',
      level: '',
      platform: 'PC',
      genre: 'Party game',
      duration: '',
      languages: '',
      summary: 'Party game multijoueur de parcours au style cartoon, construit autour d\'un système de mouvement nerveux.',
      pitch: 'Ninja Frog est un party game multijoueur dans lequel les joueurs s\'affrontent sur des parcours au style cartoon. J\'y ai conçu tout le système de déplacement du personnage ainsi que le level design des niveaux.',
      bullets: [
        'Système de déplacement complet du personnage.',
        'Wall run.',
        'Dash.',
        'Glissade (slide).',
        'Grappin.',
        'Level design des niveaux.'
      ],
      tech: ['Unity', 'C#', 'Git'],
      team: [
        { label: 'Programmation', names: ['Andrea Catanese', 'Clément Martin'] }
      ],
      context: 'Projet étudiant réalisé en binôme.',
      build: '',
      source: '',
      creajeux: '',
      trailer: null,
      cover: '',
      thumb: '',
      gallery: []
    },
    {
      id: '4',
      slug: 'heavens-doom',
      title: "Heaven's Doom",
      tagline: 'Combattez et éjectez votre adversaire',
      role: 'Gameplay Programmer',
      path: 'pages/projet4.html',
      variant: 'half',
      accent: '#ef4444',
      year: '2025',
      level: '2e année',
      platform: 'PC',
      genre: 'Combat 2D',
      duration: '8 semaines',
      languages: 'Anglais',
      summary: 'Jeu de combat 2D en vue de dessus : incarnez un viking ou une sorcière et éjectez votre adversaire de la plateforme.',
      pitch: 'Heaven\'s Doom est un jeu de combat 2D en vue de dessus où des combattants de cultures différentes, un viking et une sorcière, s\'affrontent pour la dernière place au paradis. Pour gagner, il faut éjecter son adversaire de l\'arène : plus un combattant encaisse de coups, plus il est projeté loin.',
      bullets: [
        'Player controller complet du viking, inspiré de Thor : marteau, foudre et attaques spéciales.',
        'Système d\'objets à ramasser pendant les combats.',
        'Événements dynamiques sur deux arènes : pluie de météorites et trou noir.',
        'Menu hub explorable donnant accès à l\'arène, à la salle d\'entraînement et aux crédits.',
        'Système de pourcentage de dégâts : plus un joueur prend de coups, plus il est éjecté loin.'
      ],
      tech: ['Unity', 'C#', 'Git'],
      team: [
        { label: 'Programmation', names: ['Alexis Boyer', 'Andrea Catanese', 'Amandine Celerier', 'Emilien Chastel', 'Léon Devals', 'Clément Martin', 'Raphaël Travers'] },
        { label: 'Infographie', names: ['Ewan Georget', 'Lenny Martinez', 'Kévin Mollon'] },
        { label: 'Sons et musiques', names: ['Alexis Boyer', 'Ewan Georget', 'Raphaël Travers'] }
      ],
      context: 'Projet de 2e année à Creajeux, réalisé en 8 semaines.',
      build: 'https://www.creajeux.fr/download/projets2025/heavensdoom.zip',
      source: '',
      creajeux: 'https://www.creajeux.fr/projet/heavens-doom/',
      trailer: { type: 'video', src: 'assets/projects/heavens-doom/trailer.mp4', poster: 'assets/projects/heavens-doom/hero.jpg' },
      cover: 'assets/projects/heavens-doom/hero.jpg',
      thumb: 'assets/projects/heavens-doom/card.jpg',
      gallery: []
    },
    {
      id: '3',
      slug: 'pulsar',
      title: 'Pulsar',
      tagline: 'Tower defense mobile',
      role: 'Mobile Gameplay Programmer',
      path: 'pages/projet3.html',
      variant: 'half',
      accent: '#22d3ee',
      year: '',
      level: '',
      platform: 'iOS, Android',
      genre: 'Tower defense',
      duration: '',
      languages: '',
      summary: 'Tower defense mobile jouable sur iOS et Android, avec joystick virtuel et rendu stylisé.',
      pitch: 'Pulsar est un tower defense pensé pour le mobile. J\'y ai travaillé aussi bien le rendu que l\'équilibrage et la prise en main tactile, avec un objectif : que le jeu tourne et s\'affiche correctement sur tous les téléphones.',
      bullets: [
        'Rendu : éclairages, ombres et shader d\'outline.',
        'Gameplay : équilibrage de la difficulté du tower defense.',
        'UI / Input : intégration d\'un joystick virtuel pour mobile.',
        'VFX : effets de muzzle flash lors des tirs.',
        'Compatibilité : adaptation du jeu à tous les types de téléphones, sur iOS comme sur Android.'
      ],
      tech: ['Unity', 'C#', 'iOS', 'Android'],
      team: [
        { label: 'Programmation', names: ['Clément Martin', 'Andrea Catanese', 'Seven Fabris', 'Thomas Berville', 'Raphaël Travers', 'Emilien Chastel', 'Léon Devals'] },
        { label: 'Infographie', names: ['Ewan Georget', 'Kévin Mollon', 'Ismael Zebar'] }
      ],
      context: 'Projet étudiant orienté mobile, réalisé en équipe de 10 personnes.',
      build: '',
      source: '',
      creajeux: '',
      trailer: null,
      cover: '',
      thumb: '',
      gallery: []
    },
    {
      id: '6',
      slug: 'soulbound',
      title: 'SoulBound',
      tagline: 'Choisissez votre route !',
      role: 'Gameplay Programmer',
      path: 'pages/projet6.html',
      variant: 'half',
      accent: '#a78bfa',
      year: '2024',
      level: '1re année',
      platform: 'PC',
      genre: 'Platformer',
      duration: '8 semaines',
      languages: 'Anglais',
      summary: 'Platformer qui mélange exploration et combats sur une grande carte aux nombreuses routes possibles.',
      pitch: 'SoulBound mélange exploration et combats à travers une grande carte pensée pour donner au joueur une sensation de liberté, avec de nombreuses routes possibles, différentes et variées.',
      bullets: [
        'Programmation du rendu et de la logique principale en C.',
        'Structuration des données et allocation mémoire.',
        'Travail sur la clarté du code et l\'organisation des fichiers.',
        'Sons et musiques.'
      ],
      tech: ['C', 'CSFML', 'Git'],
      team: [
        { label: 'Programmation', names: ['Luna Carausse', 'Andrea Catanèse', 'Emilien Chastel', 'Loan Colleoni', 'Léon Devals', 'Clément Martin', 'Raphaël Travers'] },
        { label: 'Infographie', names: ['Nicolas Cottel', 'Arnaud Gros-Desir', 'Luna Carausse', 'Raphaël Travers'] },
        { label: 'Sons et musiques', names: ['Andrea Catanèse', 'Loan Colleoni'] }
      ],
      context: 'Projet de 1re année à Creajeux, réalisé en 8 semaines.',
      build: 'https://www.creajeux.fr/download/projets2024/SoulBound.zip',
      source: '',
      creajeux: 'https://www.creajeux.fr/projet/soulbound/',
      trailer: null,
      cover: 'assets/projects/soulbound/hero.webp',
      thumb: 'assets/projects/soulbound/hero.webp',
      gallery: []
    },
    {
      id: '5',
      slug: 'ghost-and-protocol',
      title: 'Ghost and Protocol',
      tagline: 'Coop à deux, réalisé en 48 h',
      role: 'Gameplay Programmer',
      path: 'pages/projet5.html',
      variant: 'half',
      accent: '#facc15',
      year: '',
      level: '',
      platform: 'PC',
      genre: 'Coop / énigmes',
      duration: '48 h (game jam)',
      languages: '',
      summary: 'Jeu coopératif à deux en local, dans l\'esprit d\'It Takes Two : il faut s\'entraider pour résoudre les énigmes.',
      pitch: 'Réalisé en 48 heures lors d\'une game jam, Ghost and Protocol est un jeu coopératif à deux en local, dans l\'esprit d\'It Takes Two. Chaque joueur a son propre écran, et les deux doivent communiquer et s\'entraider pour résoudre les énigmes.',
      bullets: [
        'Contrôleur et déplacements des personnages.',
        'Caméra en écran partagé (split screen).',
        'Conception et programmation des énigmes.'
      ],
      tech: ['Unity', 'C#'],
      team: [
        { label: 'Programmation', names: ['Andrea Catanese', 'Clément Martin'] }
      ],
      context: 'Game jam de 48 heures, en binôme.',
      build: '',
      source: '',
      creajeux: '',
      trailer: { type: 'youtube', id: 'ye56rUxkFWk', poster: 'assets/projects/ghost-and-protocol/hero.jpg' },
      cover: 'assets/projects/ghost-and-protocol/hero.jpg',
      thumb: 'assets/projects/ghost-and-protocol/hero.jpg',
      gallery: []
    }
  ];

  const isProjectPage = /\/pages\//.test(window.location.pathname);
  const base = isProjectPage ? '../' : '';
  const asset = (path) => (path && !/^https?:/.test(path) ? base + path : path);

  const projectByPath = (pathname) => projects.find((project) => pathname.endsWith(project.path));

  const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const pad = (value) => String(value).padStart(2, '0');

  const filterGroup = (project) => (project.tech.includes('Unity') ? 'unity' : 'native');

  const renderTags = (items) => items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join('');

  const renderCover = (project, image) => {
    if (image) {
      return `<img src="${asset(image)}" alt="" loading="lazy" decoding="async">`;
    }

    // Pas encore de capture : visuel généré à partir du titre et de la couleur du projet
    return `
      <div class="cover-art${project.pattern ? ` cover-art--${project.pattern}` : ''}" aria-hidden="true">
        <span class="cover-art__title">${escapeHtml(project.title)}</span>
      </div>
    `;
  };

  const contactLinks = () => [
    profile.email && { label: profile.email, href: `mailto:${profile.email}`, primary: true },
    profile.phone && { label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, primary: true },
    profile.linkedin && { label: 'LinkedIn', href: profile.linkedin },
    profile.github && { label: 'GitHub', href: profile.github },
    profile.itch && { label: 'itch.io', href: profile.itch },
    profile.cv && { label: 'CV (PDF)', href: asset(profile.cv) }
  ].filter(Boolean);

  const renderNav = () => {
    const cvButton = profile.cv
      ? `<a class="nav-cta" href="${asset(profile.cv)}" target="_blank" rel="noreferrer">CV</a>`
      : `<a class="nav-cta" href="${base}Site.html#contact">Contact</a>`;

    return `
      <header class="nav">
        <a class="nav-brand" href="${base}Site.html" aria-label="Accueil">
          <span class="nav-brand__mark">AC</span>
          <span class="nav-brand__name">${escapeHtml(profile.name)}</span>
        </a>
        <nav class="nav-links" aria-label="Navigation principale">
          <a href="${base}Site.html#projets">Projets</a>
          <a href="${base}Site.html#parcours">Parcours</a>
          <a href="${base}Site.html#contact">Contact</a>
        </nav>
        ${cvButton}
      </header>
    `;
  };

  const renderFooter = () => `
    <footer class="footer">
      <span>© ${new Date().getFullYear()} ${escapeHtml(profile.name)}</span>
      <span class="mono">Codé à la main · HTML / CSS / JS</span>
    </footer>
  `;

  const renderCard = (project, index) => {
    const meta = [project.year, project.genre].filter(Boolean).join(' · ');
    return `
      <a class="card card--${project.variant}" href="${project.path}" style="--accent: ${project.accent};" data-group="${filterGroup(project)}" data-reveal>
        <div class="card-img-placeholder">${renderCover(project, project.thumb)}</div>
        <div class="card-top">
          <span class="card-index">${pad(index + 1)}</span>
          ${meta ? `<span class="card-chip">${escapeHtml(meta)}</span>` : ''}
        </div>
        <div class="card-content">
          <p class="card-kicker">${escapeHtml(project.role)}</p>
          <h3 class="card-title">${escapeHtml(project.title)}</h3>
          <p class="card-summary">${escapeHtml(project.summary)}</p>
          <div class="card-meta">${renderTags(project.tech)}</div>
        </div>
        <span class="card-arrow" aria-hidden="true">↗</span>
      </a>
    `;
  };

  const renderHome = () => {
    const showcase = projects.filter((project) => project.cover);
    const cards = projects.map(renderCard).join('');
    const timeline = projects
      .filter((project) => project.year)
      .sort((a, b) => a.year.localeCompare(b.year))
      .map((project) => `
        <li class="timeline-item" style="--accent: ${project.accent};" data-reveal>
          <span class="timeline-year mono">${escapeHtml(project.year)}</span>
          <div>
            <p class="timeline-level mono">${escapeHtml(project.level)} · ${escapeHtml(project.genre)}</p>
            <a class="timeline-title" href="${project.path}">${escapeHtml(project.title)}</a>
            <p class="timeline-text">${escapeHtml(project.tech.filter((tech) => tech !== 'Git').join(' / '))} — ${escapeHtml(project.duration)}, équipe de ${new Set(project.team.flatMap((group) => group.names)).size} personnes.</p>
          </div>
        </li>
      `).join('');
    const links = contactLinks();
    const stack = ['Unity', 'DOTS / ECS', 'C#', 'C', 'CSFML', 'Git', 'Gameplay', 'Player controller', 'IA & boids', 'Level design', 'Shaders', 'VFX', 'Mobile', 'Sound design'];
    const marquee = stack.map((item) => `<span>${escapeHtml(item)}</span>`).join('<i aria-hidden="true">✦</i>');

    document.title = `${profile.name} — ${profile.role}`;
    document.body.innerHTML = `
      ${renderNav()}
      <main class="portfolio-shell portfolio-home">
        <section class="hero">
          <div class="hero-copy">
            <p class="kicker mono"><span class="status-dot"></span>${escapeHtml(profile.role)} · ${escapeHtml(profile.school)}</p>
            <h1 class="hero-title">
              <span class="hero-line">Andrea</span>
              <span class="hero-line hero-line--outline">Catanese</span>
            </h1>
            <p class="hero-lead">Je conçois les systèmes qui rendent un jeu agréable à jouer : contrôleurs, IA, feedback et ambiance. Du platformer en C au FPS sous Unity, jusqu'à une nuée de 70 000 entités sous DOTS.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="#projets">Voir les projets</a>
              <a class="btn" href="${projects[0].path}">Jouer à ${escapeHtml(projects[0].title)}</a>
            </div>
          </div>

          <a class="hero-screen" href="${showcase[0].path}" aria-label="Projet à la une">
            <div class="hero-screen__frame">
              ${showcase.map((project, index) => `
                <figure class="hero-slide${index === 0 ? ' is-active' : ''}" data-path="${project.path}" data-title="${escapeHtml(project.title)}" data-meta="${escapeHtml([project.genre, project.year].filter(Boolean).join(' · '))}" style="--accent: ${project.accent};">
                  <img src="${asset(project.cover)}" alt="Capture de ${escapeHtml(project.title)}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
                </figure>
              `).join('')}
              <span class="hud hud--tl"></span><span class="hud hud--tr"></span><span class="hud hud--bl"></span><span class="hud hud--br"></span>
            </div>
            <div class="hero-screen__caption">
              <span class="mono hero-screen__rec">● NOW PLAYING</span>
              <strong class="hero-screen__title">${escapeHtml(showcase[0].title)}</strong>
              <span class="mono hero-screen__meta">${escapeHtml([showcase[0].genre, showcase[0].year].filter(Boolean).join(' · '))}</span>
            </div>
          </a>
        </section>

        <div class="marquee" aria-label="Compétences">
          <div class="marquee-track">${marquee}<i aria-hidden="true">✦</i>${marquee}<i aria-hidden="true">✦</i></div>
        </div>

        <section class="projects-section" id="projets">
          <div class="section-header" data-reveal>
            <div>
              <p class="kicker mono">// Projets sélectionnés</p>
              <h2 class="section-title">Ce que j'ai<br>construit.</h2>
            </div>
            <div class="filters" role="group" aria-label="Filtrer les projets">
              <button class="filter is-active" type="button" data-filter="all">Tous <span>${pad(projects.length)}</span></button>
              <button class="filter" type="button" data-filter="unity">Unity <span>${pad(projects.filter((project) => filterGroup(project) === 'unity').length)}</span></button>
              <button class="filter" type="button" data-filter="native">C <span>${pad(projects.filter((project) => filterGroup(project) === 'native').length)}</span></button>
            </div>
          </div>
          <div class="projects-grid">
            ${cards}
          </div>
        </section>

        <section class="about" id="parcours">
          <div class="about-intro" data-reveal>
            <p class="kicker mono">// Parcours</p>
            <h2 class="section-title">Un jeu complet<br>par an.</h2>
            <p class="about-text">Formé à ${escapeHtml(profile.school)}, j'ai livré un jeu complet chaque année avec des équipes de programmeurs, d'artistes et de sound designers. J'aime toucher à tout ce qui se ressent manette en main, et je m'occupe aussi du son quand l'équipe en a besoin.</p>
            <div class="skills">
              <div class="skill" data-reveal>
                <span class="skill-label mono">Moteurs &amp; libs</span>
                <p>Unity (DOTS / ECS) · CSFML</p>
              </div>
              <div class="skill" data-reveal>
                <span class="skill-label mono">Langages</span>
                <p>C# · C</p>
              </div>
              <div class="skill" data-reveal>
                <span class="skill-label mono">Spécialités</span>
                <p>Player controller · IA &amp; nuées · Optimisation · Level design · VFX &amp; shaders · Sound design</p>
              </div>
            </div>
          </div>
          <ol class="timeline">
            ${timeline}
          </ol>
        </section>

        <section class="contact" id="contact" data-reveal>
          <p class="kicker mono">// Contact</p>
          <h2 class="contact-title">Un stage, une alternance,<br>un projet&nbsp;? <span>Parlons-en.</span></h2>
          <div class="contact-links">
            ${links.map((link) => `<a class="btn${link.primary ? ' btn-primary' : ''}" href="${escapeHtml(link.href)}"${link.primary ? '' : ' target="_blank" rel="noreferrer"'}>${escapeHtml(link.label)}${link.primary ? '' : ' ↗'}</a>`).join('')}
            <a class="btn" href="${profile.schoolUrl}projets/" target="_blank" rel="noreferrer">Mes projets sur Creajeux ↗</a>
          </div>
        </section>
      </main>
      ${renderFooter()}
    `;

    setupFilters();
    setupHeroSlides();
  };

  const renderListItems = (items) => items.map((item, index) => `
    <li><span class="mono">${pad(index + 1)}</span><p>${escapeHtml(item)}</p></li>
  `).join('');

  const renderTeam = (team) => {
    if (typeof team === 'string') {
      return `<p>${escapeHtml(team)}</p>`;
    }

    return team.map((group) => `
      <div class="credit-group">
        <span class="mono">${escapeHtml(group.label)}</span>
        <p>${group.names.map((name) => (/catan[eè]se/i.test(name) ? `<strong>${escapeHtml(name)}</strong>` : escapeHtml(name))).join('<br>')}</p>
      </div>
    `).join('');
  };

  const renderTrailer = (project) => {
    if (!project.trailer) {
      return '';
    }

    const { trailer } = project;
    const player = trailer.type === 'youtube'
      ? `
        <button class="video-facade" type="button" data-youtube="${escapeHtml(trailer.id)}" aria-label="Lire le trailer de ${escapeHtml(project.title)}">
          <img src="${asset(trailer.poster)}" alt="" loading="lazy">
          <span class="play-button" aria-hidden="true"></span>
        </button>
      `
      : `<video src="${asset(trailer.src)}" poster="${asset(trailer.poster)}" controls playsinline preload="none"></video>`;

    return `
      <section class="trailer" id="trailer" data-reveal>
        <div class="block-heading">
          <p class="kicker mono">// Trailer</p>
        </div>
        <div class="media">
          <div class="media-player">${player}</div>
        </div>
      </section>
    `;
  };

  const renderGallery = (project) => {
    if (!project.gallery.length) {
      return '';
    }

    return `
      <section class="gallery" data-reveal>
        <div class="block-heading">
          <p class="kicker mono">// Captures</p>
        </div>
        <div class="grid">
          ${project.gallery.map((image, index) => `
            <button class="shot" type="button" data-full="${asset(image)}" aria-label="Agrandir la capture ${index + 1}">
              <img src="${asset(image)}" alt="Capture ${index + 1} de ${escapeHtml(project.title)}" loading="lazy">
            </button>
          `).join('')}
        </div>
      </section>
    `;
  };

  const renderProjectPage = (project) => {
    const index = projects.indexOf(project);
    const previous = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];
    const stats = [
      ['Rôle', project.role],
      ['Année', [project.year, project.level].filter(Boolean).join(' · ')],
      ['Genre', project.genre],
      ['Plateforme', project.platform],
      ['Durée', project.duration],
      ['Statut', project.status],
      ['Langues', project.languages]
    ].filter(([, value]) => value);

    const actions = [
      project.build && `<a class="btn btn-primary" href="${project.build}" target="_blank" rel="noreferrer">Télécharger le jeu ↓</a>`,
      project.trailer && '<a class="btn" href="#trailer">Voir le trailer</a>',
      project.source && `<a class="btn" href="${project.source}" target="_blank" rel="noreferrer">Code source</a>`,
      project.creajeux && `<a class="btn btn-ghost" href="${project.creajeux}" target="_blank" rel="noreferrer">Fiche Creajeux ↗</a>`
    ].filter(Boolean).join('');

    document.title = `${project.title} — ${profile.name}`;
    document.documentElement.style.setProperty('--accent', project.accent);
    document.body.innerHTML = `
      ${renderNav()}
      <main class="project-shell">
        <section class="project-hero">
          <div class="project-hero__bg">${renderCover(project, project.cover)}</div>
          <div class="project-hero__content portfolio-shell">
            <a class="back-link mono" href="../Site.html#projets">← Tous les projets</a>
            <p class="kicker mono">Projet ${pad(index + 1)} / ${pad(projects.length)}${project.tagline ? ` — ${escapeHtml(project.tagline)}` : ''}</p>
            <h1 class="project-title">${escapeHtml(project.title)}</h1>
            <p class="project-lead">${escapeHtml(project.summary)}</p>
            ${actions ? `<div class="hero-actions">${actions}</div>` : ''}
          </div>
        </section>

        <div class="portfolio-shell">
          <dl class="stats" data-reveal>
            ${stats.map(([label, value]) => `<div><dt class="mono">${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}
          </dl>

          <section class="project-grid">
            <article class="project-main">
              <div class="block" data-reveal>
                <p class="kicker mono">// Le pitch</p>
                <p class="pitch">${escapeHtml(project.pitch)}</p>
              </div>
              <div class="block" data-reveal>
                <p class="kicker mono">// Ce que j'ai fait</p>
                <ul class="work-list description-list">
                  ${renderListItems(project.bullets)}
                </ul>
              </div>
            </article>

            <aside class="project-aside" data-reveal>
              <div class="aside-block">
                <span class="mono aside-label">Technologies</span>
                <div class="tags">${renderTags(project.tech)}</div>
              </div>
              <div class="aside-block">
                <span class="mono aside-label">Contexte</span>
                <p>${escapeHtml(project.context)}</p>
              </div>
              ${project.team ? `
                <div class="aside-block">
                  <span class="mono aside-label">Crédits</span>
                  ${renderTeam(project.team)}
                </div>
              ` : ''}
            </aside>
          </section>

          ${renderTrailer(project)}
          ${renderGallery(project)}

          <nav class="pager" aria-label="Autres projets">
            <a class="pager-link" href="../${previous.path}" style="--accent: ${previous.accent};">
              <span class="mono">← Précédent</span>
              <strong>${escapeHtml(previous.title)}</strong>
            </a>
            <a class="pager-link pager-link--next" href="../${next.path}" style="--accent: ${next.accent};">
              <span class="mono">Suivant →</span>
              <strong>${escapeHtml(next.title)}</strong>
            </a>
          </nav>
        </div>
      </main>
      ${renderFooter()}
      <dialog class="lightbox" aria-label="Capture agrandie">
        <form method="dialog"><button class="lightbox-close" aria-label="Fermer">✕</button></form>
        <img alt="">
      </dialog>
    `;

    setupVideoFacade();
    setupLightbox();
  };

  const setupFilters = () => {
    const buttons = document.querySelectorAll('.filter');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        buttons.forEach((other) => other.classList.toggle('is-active', other === button));
        document.querySelectorAll('.projects-grid .card').forEach((card) => {
          card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.group !== filter);
        });
        document.querySelector('.projects-grid').classList.toggle('is-filtered', filter !== 'all');
      });
    });
  };

  const setupHeroSlides = () => {
    const slides = Array.from(document.querySelectorAll('.hero-slide'));
    const screen = document.querySelector('.hero-screen');
    if (slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let current = 0;
    window.setInterval(() => {
      if (document.hidden) {
        return;
      }
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      const slide = slides[current];
      slide.classList.add('is-active');
      screen.href = slide.dataset.path;
      screen.style.setProperty('--accent', slide.style.getPropertyValue('--accent'));
      screen.querySelector('.hero-screen__title').textContent = slide.dataset.title;
      screen.querySelector('.hero-screen__meta').textContent = slide.dataset.meta;
    }, 4200);
  };

  const setupVideoFacade = () => {
    document.querySelectorAll('[data-youtube]').forEach((button) => {
      button.addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(button.dataset.youtube)}?autoplay=1&rel=0`;
        iframe.title = 'Trailer';
        iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
        iframe.allowFullscreen = true;
        button.replaceWith(iframe);
      });
    });
  };

  const setupLightbox = () => {
    const dialog = document.querySelector('.lightbox');
    if (!dialog || typeof dialog.showModal !== 'function') {
      return;
    }

    const image = dialog.querySelector('img');
    document.querySelectorAll('.shot[data-full]').forEach((shot) => {
      shot.addEventListener('click', () => {
        image.src = shot.dataset.full;
        image.alt = shot.querySelector('img')?.alt || '';
        dialog.showModal();
      });
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  };

  const setupReveal = () => {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    targets.forEach((target) => observer.observe(target));
  };

  const setupSpotlight = () => {
    document.addEventListener('pointermove', (event) => {
      const card = event.target.closest && event.target.closest('.card, .pager-link');
      if (!card) {
        return;
      }
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  };

  const setupNav = () => {
    const nav = document.querySelector('.nav');
    const update = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
  };

  const init = () => {
    const currentProject = projectByPath(window.location.pathname);
    document.documentElement.classList.add('portfolio-app');

    if (currentProject) {
      document.documentElement.classList.add('portfolio-project-page');
      renderProjectPage(currentProject);
    } else {
      document.documentElement.classList.add('portfolio-home-page');
      renderHome();
    }

    setupNav();
    setupReveal();
    setupSpotlight();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
