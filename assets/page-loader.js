(function () {
  const LOADER_FLAG = 'portfolio-page-loader';
  const MIN_VISIBLE_MS = 450;

  const style = document.createElement('style');
  style.textContent = `
    html.page-loading {
      overflow: hidden;
      background: #050816;
    }

    html.page-loading body {
      opacity: 0;
    }

    .page-loader-overlay {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 18px;
      background:
        radial-gradient(circle at top, rgba(0, 255, 102, 0.18), transparent 35%),
        linear-gradient(180deg, #020617 0%, #0f172a 100%);
      color: #f8fafc;
      transition: opacity 220ms ease, visibility 220ms ease;
    }

    .page-loader-overlay.is-hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .page-loader-title {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: clamp(2.4rem, 6vw, 4.8rem);
      letter-spacing: 0.28em;
      text-transform: uppercase;
      text-align: center;
      color: #6bff95;
      text-shadow: 0 0 32px rgba(0, 255, 102, 0.35);
    }

    .page-loader-spinner {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      border: 4px solid rgba(148, 163, 184, 0.22);
      border-top-color: #6bff95;
      animation: pageLoaderSpin 0.85s linear infinite;
    }

    .page-loader-subtitle {
      margin: 0;
      color: #cbd5e1;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 0.95rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    @keyframes pageLoaderSpin {
      to { transform: rotate(360deg); }
    }
  `;

  const overlay = document.createElement('div');
  overlay.className = 'page-loader-overlay';
  overlay.innerHTML = `
    <div class="page-loader-spinner" aria-hidden="true"></div>
    <h1 class="page-loader-title">Portfolio</h1>
    <p class="page-loader-subtitle">Chargement...</p>
  `;

  document.documentElement.classList.add('page-loading');
  document.head.appendChild(style);
  document.documentElement.appendChild(overlay);

  const hideLoader = () => {
    overlay.classList.add('is-hidden');
    document.documentElement.classList.remove('page-loading');
    sessionStorage.removeItem(LOADER_FLAG);
  };

  const startTime = Date.now();
  const finish = () => {
    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);
    window.setTimeout(hideLoader, delay);
  };

  window.addEventListener('load', finish, { once: true });

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    if (link.target === '_blank' || link.hasAttribute('download') || link.hasAttribute('data-no-loader')) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;

    sessionStorage.setItem(LOADER_FLAG, '1');
    overlay.classList.remove('is-hidden');
    document.documentElement.classList.add('page-loading');
  }, true);

  if (sessionStorage.getItem(LOADER_FLAG) === '1') {
    sessionStorage.removeItem(LOADER_FLAG);
  }
})();