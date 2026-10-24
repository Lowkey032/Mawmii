const stars = document.querySelector('#star-field');
const decor = document.querySelector('#decor-layer');

window.pixelMascot.setSceneMood('happy');

if (stars) {
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('span');
    star.className = `star${i % 9 === 0 ? ' star-cross' : ''}`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
    star.style.animationDelay = `${Math.random() * -5}s`;
    stars.append(star);
  }
}

if (decor) {
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = ['♥', '♡', '✧'][i % 3];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty('--drift-x', `${Math.random() * 140 - 70}px`);
    heart.style.setProperty('--duration', `${8 + Math.random() * 12}s`);
    heart.style.setProperty('--heart-size', `${12 + Math.random() * 14}px`);
    heart.style.animationDelay = `${Math.random() * -18}s`;
    decor.append(heart);
  }
}
