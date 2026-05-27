(function () {
  const manifestUrl = 'assets/museum-data.json';
  const logList = document.getElementById('museum-log');
  const appRoot = document.getElementById('museum-app');
  const canvasRoot = document.getElementById('museum-canvas');

  const pushLog = (message) => {
    if (!logList) return;
    const item = document.createElement('li');
    item.textContent = message;
    logList.prepend(item);
    while (logList.children.length > 5) {
      logList.removeChild(logList.lastChild);
    }
  };

  const makePlaceholderData = (title, accent) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#${accent.toString(16).padStart(6, '0')}" />
          </linearGradient>
        </defs>
        <rect width="512" height="512" fill="url(#g)" />
        <rect x="32" y="32" width="448" height="448" rx="24" fill="rgba(2,6,23,0.65)" stroke="rgba(255,255,255,0.14)" stroke-width="4" />
        <text x="50%" y="48%" fill="#e2e8f0" font-family="Segoe UI, Arial, sans-serif" font-size="34" text-anchor="middle">${title}</text>
        <text x="50%" y="58%" fill="#94a3b8" font-family="Segoe UI, Arial, sans-serif" font-size="18" text-anchor="middle">Add your preview in museum-data.json</text>
      </svg>
    `;
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
  };

  const setup = async () => {
    if (!window.Phaser) {
      if (appRoot) {
        appRoot.innerHTML = '<div style="padding:24px;color:#fff;">Phaser n\'a pas chargé. Vérifie la connexion CDN.</div>';
      }
      return;
    }

    const response = await fetch(manifestUrl);
    const data = await response.json();

    const projects = data.projects || [];
    const playerSettings = data.player || { spawn: { x: 180, y: 420 }, speed: 220 };
    const museum = data.museum || { floorColor: 0x1d2b53, wallColor: 0x0f172a, accentColor: 0x38bdf8 };

    const config = {
      type: Phaser.AUTO,
      parent: 'museum-canvas',
      width: 1280,
      height: 760,
      backgroundColor: '#050816',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 760
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: {
        preload,
        create,
        update
      }
    };

    let game;
    let player;
    let cursors;
    let wasd;
    let currentExhibit = null;
    let interactionLabel;
    let interactHint;
    let backdrop;
    let floor;
    let walls;
    let boundaryRects = [];

    function preload() {
      projects.forEach((project) => {
        if (project.assetType === 'video') {
          const key = `project-video-${project.id}`;
          this.load.video(key, project.asset, 'loadeddata', false, true);
          project._assetKey = key;
        } else {
          const key = `project-image-${project.id}`;
          const assetPath = project.asset || null;
          if (assetPath) {
            this.load.image(key, assetPath);
            project._assetKey = key;
          } else {
            project._assetKey = null;
          }
        }
      });
    }

    function create() {
      const { width, height } = this.scale;

      backdrop = this.add.rectangle(width / 2, height / 2, width, height, 0x050816).setScrollFactor(0);
      this.add.graphics()
        .lineStyle(1, 0x38bdf8, 0.06)
        .strokeRect(48, 48, width - 96, height - 96);

      this.add.text(width / 2, 46, 'GAME DEV MUSEUM', {
        fontFamily: 'Segoe UI, sans-serif',
        fontSize: '20px',
        color: '#38bdf8'
      }).setOrigin(0.5);

      floor = this.add.rectangle(width / 2, height - 130, width - 120, 160, museum.floorColor, 1);
      floor.setStrokeStyle(3, museum.accentColor, 0.8);

      walls = this.physics.add.staticGroup();
      addWallRect(this, 90, height / 2, 40, height - 180);
      addWallRect(this, width - 90, height / 2, 40, height - 180);
      addWallRect(this, width / 2, 90, width - 180, 40);
      addWallRect(this, width / 2, height - 70, width - 180, 30);

      addStatues(this, data.decor || []);
      addDoors(this, projects);
      addExhibits(this, projects);

      player = this.physics.add.sprite(playerSettings.spawn.x, playerSettings.spawn.y, null);
      player.setVisible(false);
      player.body.setCircle(18);
      player.body.setSize(26, 34, true);
      player.body.setOffset(6, 8);
      player.setCollideWorldBounds(true);
      player.setDepth(20);

      const body = this.add.ellipse(player.x, player.y, 28, 36, 0x38bdf8, 1).setDepth(20);
      const visor = this.add.circle(player.x + 5, player.y - 4, 4, 0xe0f2fe, 1).setDepth(21);
      player.setData('visuals', { body, visor });

      this.physics.add.collider(player, walls);

      cursors = this.input.keyboard.createCursorKeys();
      wasd = this.input.keyboard.addKeys('W,A,S,D,SHIFT,E,ESC');

      interactHint = this.add.text(width / 2, height - 34, 'WASD / arrows - move | E - inspect exhibit | Esc - close panel', {
        fontFamily: 'JetBrains Mono, Consolas, monospace',
        fontSize: '14px',
        color: '#cbd5e1'
      }).setOrigin(0.5).setDepth(30);

      interactionLabel = this.add.text(0, 0, '', {
        fontFamily: 'JetBrains Mono, Consolas, monospace',
        fontSize: '13px',
        color: '#001018',
        backgroundColor: '#38bdf8',
        padding: { x: 8, y: 4 }
      }).setDepth(30).setVisible(false);

      this.input.keyboard.on('keydown-E', () => {
        if (currentExhibit) {
          pushLog(`Opening ${currentExhibit.title}...`);
          window.location.href = currentExhibit.page;
        }
      });

      this.input.keyboard.on('keydown-ESC', () => {
        currentExhibit = null;
      });

      this.cameras.main.setBounds(0, 0, width, height);
      this.cameras.main.startFollow(player, true, 0.08, 0.08);

      pushLog('Museum boot sequence loaded.');
      pushLog('Explore the hall and press E near an exhibit.');
      pushLog('Edit assets/museum-data.json to add new rooms and images.');

      game = this;

      function addWallRect(scene, x, y, w, h) {
        const rect = scene.add.rectangle(x, y, w, h, museum.wallColor, 0.92);
        rect.setStrokeStyle(2, museum.accentColor, 0.25);
        scene.physics.add.existing(rect, true);
        walls.add(rect);
        boundaryRects.push(rect);
      }

      function addStatues(scene, decor) {
        decor.forEach((item) => {
          const statue = scene.add.rectangle(item.x, item.y, item.w, item.h, item.color || museum.accentColor, 0.6);
          scene.add.text(item.x, item.y - item.h / 2 - 20, item.title || 'Statue', {
            fontFamily: 'JetBrains Mono, Consolas, monospace',
            fontSize: '12px',
            color: '#e2e8f0'
          }).setOrigin(0.5);
          scene.physics.add.existing(statue, true);
          walls.add(statue);
        });
      }

      function addDoors(scene, items) {
        items.forEach((item) => {
          const door = scene.add.rectangle(item.x, item.y + item.h / 2 + 18, item.w - 20, 16, item.frameColor || museum.accentColor, 0.5);
          scene.physics.add.existing(door, true);
          walls.add(door);
        });
      }

      function addExhibits(scene, items) {
        items.forEach((item) => {
          const frame = scene.add.rectangle(item.x, item.y, item.w, item.h, item.frameColor || museum.accentColor, 0.18);
          frame.setStrokeStyle(4, item.frameColor || museum.accentColor, 1);

          const artBg = scene.add.rectangle(item.x, item.y, item.w - 18, item.h - 18, 0x020617, 1);

          let artNode = null;
          if (item.assetType === 'video' && item.asset) {
            const video = scene.add.video(item.x, item.y).setDisplaySize(item.w - 18, item.h - 18);
            video.loadURL(item.asset);
            video.setLoop(true);
            video.setMute(true);
            video.play(true);
            artNode = video;
          } else if (item._assetKey && scene.textures.exists(item._assetKey)) {
            artNode = scene.add.image(item.x, item.y, item._assetKey).setDisplaySize(item.w - 18, item.h - 18);
          } else if (item.asset) {
            const placeholder = makePlaceholderData(item.title, item.frameColor || 0x38bdf8);
            const key = `fallback-${item.id}`;
            if (!scene.textures.exists(key)) {
              scene.textures.addBase64(key, placeholder);
            }
            artNode = scene.add.image(item.x, item.y, key).setDisplaySize(item.w - 18, item.h - 18);
          } else {
            artNode = scene.add.rectangle(item.x, item.y, item.w - 18, item.h - 18, 0x0f172a, 1);
          }

          const label = scene.add.text(item.x, item.y + item.h / 2 + 20, `${item.shortTitle} · ${item.subtitle}`, {
            fontFamily: 'JetBrains Mono, Consolas, monospace',
            fontSize: '13px',
            color: '#e2e8f0'
          }).setOrigin(0.5);

          const hitZone = scene.add.rectangle(item.x, item.y, item.w + 20, item.h + 20, 0xffffff, 0.001);
          scene.physics.add.existing(hitZone, true);
          item._frame = frame;
          item._art = artNode;
          item._label = label;
          item._hit = hitZone;
          hitZone.setData('project', item);
          walls.add(hitZone);
        });
      }
    }

    function update(_, delta) {
      if (!player || !player.body) return;

      const speed = (playerSettings.speed || 220) * ((wasd.SHIFT?.isDown) ? 1.55 : 1);
      const velocity = { x: 0, y: 0 };

      if (cursors.left.isDown || wasd.A.isDown) velocity.x -= speed;
      if (cursors.right.isDown || wasd.D.isDown) velocity.x += speed;
      if (cursors.up.isDown || wasd.W.isDown) velocity.y -= speed;
      if (cursors.down.isDown || wasd.S.isDown) velocity.y += speed;

      player.body.setVelocity(velocity.x, velocity.y);
      if (velocity.x !== 0 && velocity.y !== 0) {
        player.body.velocity.scale(0.75);
      }

      const visuals = player.getData('visuals');
      if (visuals) {
        visuals.body.setPosition(player.x, player.y);
        visuals.visor.setPosition(player.x + 5, player.y - 4);
      }

      currentExhibit = null;
      const nearby = projects.find((project) => Phaser.Math.Distance.Between(player.x, player.y, project.x, project.y) < 110);
      if (nearby) {
        currentExhibit = nearby;
        interactionLabel.setVisible(true);
        interactionLabel.setText(`E to open ${nearby.title}`);
        interactionLabel.setPosition(nearby.x - 66, nearby.y - nearby.h / 2 - 34);
      } else {
        interactionLabel.setVisible(false);
      }
    }

    new Phaser.Game(config);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true });
  } else {
    setup();
  }
})();