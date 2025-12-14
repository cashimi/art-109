// Fake Minesweeper interaction + desktop-style windows
// - Certain tiles open persistent draggable windows
// - Windows host avatar.js content, sketch.js content, or an audio player

window.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('fake-minesweeper');

  // Hosts for avatar.js (Three.js scene) and sketch.js (p5 cookie game)
  const avatarBox = document.getElementById('avatar-box');
  const cookieBox = document.getElementById('cookie-game-box');

  // Hide the boxes until the user opens their windows
  if (avatarBox) {
    avatarBox.style.display = 'none';
  }
  if (cookieBox) {
    cookieBox.style.display = 'none';
  }

  // Window state
  let highestZ = 1000;
  let draggingWindow = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  let avatarWindow = null;
  let sketchWindow = null;
  let audioWindow = null;

  // ======================
  // WINDOW CREATION / DRAG
  // ======================

  function createAppWindow(title, startX, startY) {
    const win = document.createElement('div');
    win.className = 'app-window';
    win.style.left = (startX || 100) + 'px';
    win.style.top = (startY || 100) + 'px';
    win.style.zIndex = (++highestZ).toString();

    const header = document.createElement('div');
    header.className = 'app-window-header';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'app-window-title';
    titleSpan.textContent = title;

    header.appendChild(titleSpan);
    win.appendChild(header);

    const body = document.createElement('div');
    body.className = 'app-window-body';
    win.appendChild(body);

    document.body.appendChild(win);

    // Bring to front when clicked
    win.addEventListener('mousedown', () => {
      highestZ += 1;
      win.style.zIndex = highestZ.toString();
    });

    // Dragging via header
    header.addEventListener('mousedown', (e) => {
      draggingWindow = win;
      dragOffsetX = e.clientX - win.offsetLeft;
      dragOffsetY = e.clientY - win.offsetTop;
      highestZ += 1;
      win.style.zIndex = highestZ.toString();
      e.preventDefault();
    });

    return { win, body };
  }

  document.addEventListener('mousemove', (e) => {
    if (!draggingWindow) return;
    draggingWindow.style.left = (e.clientX - dragOffsetX) + 'px';
    draggingWindow.style.top = (e.clientY - dragOffsetY) + 'px';
  });

  document.addEventListener('mouseup', () => {
    draggingWindow = null;
  });

  // ======================
  // SPECIAL WINDOWS
  // ======================

  function showAvatarWindow() {
    if (!avatarBox) return;

    if (!avatarWindow) {
      const { win, body } = createAppWindow('run render', 140, 140);
      avatarWindow = { win, body };

      // move avatarBox into this window and show it
      avatarBox.style.display = 'block';
      body.appendChild(avatarBox);
    } else {
      highestZ += 1;
      avatarWindow.win.style.zIndex = highestZ.toString();
    }
  }

  function showSketchWindow() {
    if (!cookieBox) return;
  
    if (!sketchWindow) {
      const { win, body } = createAppWindow('n00b cL1cKr', 260, 180);
      sketchWindow = { win, body };
  
      cookieBox.style.display = 'block';
      body.appendChild(cookieBox);
    } else {
      highestZ += 1;
      sketchWindow.win.style.zIndex = highestZ.toString();
    }
  
    // ✅ Turn the game ON when the window is shown
    if (typeof window.cookieGameActive !== 'undefined') {
      window.cookieGameActive = true;
    }
  }
  

  function showAudioWindow() {
    // Grab the first audio track from the audio library
    const firstAudio = document.querySelector('#audio-library audio');
    if (!firstAudio) return;

    if (!audioWindow) {
      const { win, body } = createAppWindow('Now Playing', 320, 80);
      audioWindow = { win, body, audio: null };
      win.style.width = "500px";   // or 600px, 700px, etc.


      const heading = document.createElement('h3');
      heading.textContent = 'Now Playing';
      heading.style.fontSize = '1.4rem';
      heading.style.marginBottom = '6px';

      const trackLabel = document.createElement('p');
      trackLabel.textContent = 'From Audio Library';
      trackLabel.style.fontSize = '1.2rem';
      trackLabel.style.marginBottom = '6px';

      const audioClone = firstAudio.cloneNode(true);
      audioClone.controls = true;
      audioClone.autoplay = true;
      audioClone.style.width = '100%';

      body.appendChild(heading);
      body.appendChild(trackLabel);
      body.appendChild(audioClone);

      audioWindow.audio = audioClone;

      audioClone.play().catch(() => {
        // Ignore play errors (browser might require interaction, but tile click usually counts)
      });
    } else {
      highestZ += 1;
      audioWindow.win.style.zIndex = highestZ.toString();

      if (audioWindow.audio) {
        audioWindow.audio.currentTime = 0;
        audioWindow.audio.play().catch(() => {});
      }
    }
  }

  // ======================
  // MINESWEEPER TILE LOGIC
  // ======================

  if (grid) {
    grid.addEventListener('click', (e) => {
      const tile = e.target.closest('.ms-tile');
      if (!tile) return;
      if (tile.classList.contains('revealed')) return;
    
      const content = tile.getAttribute('data-content') || '';
      tile.textContent = content;
      tile.classList.add('revealed');
    
      const action = tile.dataset.action;
    
      if (action === 'play-audio') {
        const audioSrc = tile.dataset.audioSrc;
        const audioTitle = tile.dataset.audioTitle;
        openAudioWindow(audioTitle, audioSrc);
      }
  
      if (!action) return;

      if (action === 'show-avatar') {
        showAvatarWindow();
      } else if (action === 'show-sketch') {
        showSketchWindow();
      } else if (action === 'play-audio') {
        showAudioWindow();
      }
      
    });
  }
});

let highestZ = 1000;

function createAppWindow(title, x, y, width) {
  const win = document.createElement('div');
  win.className = 'app-window';
  win.style.position = 'absolute';
  win.style.left = (x || 120) + 'px';
  win.style.top = (y || 120) + 'px';
  win.style.zIndex = (++highestZ).toString();
  if (width) win.style.width = width + 'px';

  const header = document.createElement('div');
  header.className = 'app-window-header';

  const titleSpan = document.createElement('span');
  titleSpan.className = 'app-window-title';
  titleSpan.textContent = title || 'Window';

  header.appendChild(titleSpan);
  win.appendChild(header);

  const body = document.createElement('div');
  body.className = 'app-window-body';
  win.appendChild(body);

  document.body.appendChild(win);

  // bring to front on click
  win.addEventListener('mousedown', () => {
    highestZ += 1;
    win.style.zIndex = highestZ.toString();
  });

  // drag support
  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener('mousedown', (e) => {
    dragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    win.style.left = (e.clientX - offsetX) + 'px';
    win.style.top = (e.clientY - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
  });

  return { win, body };
}

function openAudioWindow(audioTitle, audioSrc) {
  if (!audioSrc) return;

  // create a new window every time
  const { win, body } = createAppWindow(audioTitle || 'Audio', 200, 150, 420);

  const heading = document.createElement('h3');
  heading.textContent = audioTitle || 'Now Playing';
  heading.style.margin = '0 0 6px 0';
  heading.style.fontSize = '1.4rem';

  const audio = document.createElement('audio');
  audio.controls = true;
  audio.autoplay = true;
  audio.style.width = '100%';
  audio.src = audioSrc;

  audio.volume = 0.1;   // try 0.2–0.4 to taste

  body.appendChild(heading);
  body.appendChild(audio);

  // try to play immediately
  audio.play().catch(() => {
    // ignore autoplay errors – user already clicked the tile
  });
}
