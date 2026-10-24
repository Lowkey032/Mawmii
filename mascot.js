(() => {
  const sprite = document.querySelector('#sprite');
  if (!sprite) return;

  const rows = [
    '....HHH.......HHH....',
    '...HHHHH.....HHHHH...',
    '..HHHHHHH...HHHHHHH..',
    '.HHHHHHHHH.HHHHHHHHH.',
    '.HHHHHHHHHHHHHHHHHHH.',
    '..HHHHHHHHHHHHHHHHH..',
    '...HHHHHHHHHHHHHHH...',
    '....HHHHHHHHHHHHH....',
    '.....HHHHHHHHHHH.....',
    '....HHHH.PPP.HHHH....',
    '...HHHHH.PEP.HHHHH...',
    '..HHHHHH.PPP.HHHHH..',
    '..HHHHHHHHHHHHHHH..',
    '.HHHHHFFFFFFFFFHHHHH.',
    'HHHHFFFFFFFFFFFFFHHHH',
    'HHHFFFFFFFFFFFFFFFHHH',
    'HHFFFFFFFFFFFFFFFFFHH',
    'HHHFFFFFFFFFFFFFFFHHH',
    '.HHHHFFFFFFFFFHHHHH.',
    '..HHHHHHHHHHHHHHH..',
    '...HHH..HHHHH..HHH...',
    '..HHHH..HHHHH..HHHH..',
    '..HHHHHBBBBBBBHHHHH..',
    '...HHHHBBBBBBBHHHH...',
    '....HHHBBBPBBBHHH....',
    '.....HHHBBBBBHHH.....',
    '.....HHHH...HHHH.....',
    '....HHHHH...HHHHH....'
  ];
  const colors = {
    H: 'pixel-hood',
    F: 'pixel-face',
    P: 'pixel-pink',
    B: 'pixel-body',
    E: 'pixel-eye'
  };

  rows.forEach(row => {
    const centeredRow = row.padStart(21, '.').padEnd(21, '.');
    [...centeredRow].forEach(pixel => {
      const cell = document.createElement('span');
      cell.className = `sprite-pixel ${colors[pixel] || ''}`;
      sprite.append(cell);
    });
  });

  function addFeature(name, x, y, width = 1, height = 1) {
    const feature = document.createElement('span');
    feature.className = `sprite-feature ${name}`;
    feature.style.gridColumn = `${x + 1} / span ${width}`;
    feature.style.gridRow = `${y + 1} / span ${height}`;
    sprite.append(feature);
  }

  function setMood(mood) {
    sprite.dataset.mood = mood;
    sprite.querySelectorAll('.sprite-feature').forEach(feature => feature.remove());

    if (mood === 'sad') {
      addFeature('pixel-brow', 7, 13, 2);
      addFeature('pixel-brow', 12, 13, 2);
      addFeature('pixel-eye', 7, 15);
      addFeature('pixel-eye', 13, 15);
      addFeature('pixel-mouth', 9, 17);
      addFeature('pixel-mouth', 10, 16);
      addFeature('pixel-mouth', 11, 17);
      addFeature('pixel-tear', 7, 16);
      addFeature('pixel-tear', 13, 16);
      sprite.setAttribute('aria-label', 'Sad pixel bunny with tiny tears');
      return;
    }

    if (mood === 'happy') {
      addFeature('pixel-eye', 7, 14);
      addFeature('pixel-eye', 8, 15);
      addFeature('pixel-eye', 9, 14);
      addFeature('pixel-eye', 12, 14);
      addFeature('pixel-eye', 13, 15);
      addFeature('pixel-eye', 14, 14);
      addFeature('pixel-mouth', 9, 17);
      addFeature('pixel-mouth', 10, 18);
      addFeature('pixel-mouth', 11, 17);
      addFeature('pixel-cheek', 5, 16);
      addFeature('pixel-cheek', 15, 16);
      sprite.setAttribute('aria-label', 'Happy pixel bunny with a big smile');
      return;
    }

    addFeature('pixel-eye', 7, 14);
    addFeature('pixel-eye', 13, 14);
    addFeature('pixel-mouth', 10, 17);
    sprite.setAttribute('aria-label', 'Pixel bunny mascot');
  }

  window.pixelMascot = {
    setMood,
    setSceneMood(mood) {
      setMood(mood);
      sprite.closest('.portrait-frame')?.classList.toggle('mood-sad', mood === 'sad');
      sprite.closest('.portrait-frame')?.classList.toggle('mood-happy', mood === 'happy');
    }
  };

  setMood('idle');
})();
