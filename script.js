const form = document.querySelector('#note-form');
const yesBtn = document.querySelector('#yes-button');
const noBtn = document.querySelector('#maybe-button');
const zone = document.querySelector('#answer-zone');
const caption = document.querySelector('#mascot-caption');
const decor = document.querySelector('#decor-layer');
const stars = document.querySelector('#star-field');

if (stars) {
  const starCount = matchMedia('(max-width:600px)').matches ? 38 : 68;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('span');
    star.className = `star${i % 9 === 0 ? ' star-cross' : ''}`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${2.2 + Math.random() * 3.8}s`);
    star.style.animationDelay = `${Math.random() * -5}s`;
    stars.append(star);
  }
}

if (decor) {
  const patterns = {
    tulip: ['....PPP....', '...PPAPP...', '..PPPPPPP..', '..PPPPPPP..', '...PPPPP...', '....PCP....', '.....S.....', '...GGSGG...', '.....S.....', '....GGG....', '.....S.....'],
    orchid: ['....PPP....', '...PAAAP...', '..PAAAAAP..', '.PPAPCAPPP.', '..PAAAAAP..', '...PAAAP...', '....PPP....', '.....S.....', '....GSG....', '.....S.....', '...GGSGG...'],
    rose: ['....PPP....', '...PPAPP...', '..PPPPPPP..', '..PAPPPAP..', '..PPPCPPP..', '...PPPPP...', '....PPP....', '.....S.....', '...GGSGG...', '.....S.....', '....GGG....']
  };
  const positions = [
    ['tulip', '3%', '9%', 1.05], ['orchid', '89%', '12%', 1.15],
    ['rose', '8%', '36%', .85], ['tulip', '94%', '40%', .85],
    ['orchid', '3%', '66%', 1.08], ['rose', '89%', '73%', 1.08],
    ['tulip', '13%', '88%', .78], ['orchid', '81%', '91%', .9],
    ['rose', '48%', '3%', .7], ['tulip', '56%', '94%', .7],
    ['rose', '1%', '22%', .72], ['orchid', '93%', '26%', .8],
    ['tulip', '2%', '49%', .9], ['rose', '91%', '55%', .8],
    ['orchid', '5%', '80%', .8], ['rose', '89%', '86%', .75],
    ['tulip', '29%', '97%', .62], ['orchid', '70%', '5%', .68]
  ];
  const flowerColors = {
    P: 'flower-petal',
    A: 'flower-light',
    C: 'flower-center',
    G: 'flower-leaf',
    S: 'flower-stem'
  };

  positions.forEach(([type, left, top, scale], index) => {
    const flower = document.createElement('span');
    flower.className = `floating-flower flora-${type}`;
    flower.style.left = left;
    flower.style.top = top;
    flower.style.setProperty('--flower-scale', scale);
    flower.style.setProperty('--flora-duration', `${5.5 + Math.random() * 4}s`);
    flower.style.animationDelay = `${index * -.57}s`;
    patterns[type].forEach(row => {
      [...row].forEach(pixel => {
        const cell = document.createElement('span');
        cell.className = `flower-pixel ${flowerColors[pixel] || ''}`;
        flower.append(cell);
      });
    });
    decor.append(flower);
  });

  for (let i = 0; i < 17; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = ['♥', '♡', '✧', '♥'][i % 4];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty('--drift-x', `${Math.round(Math.random() * 140 - 70)}px`);
    heart.style.setProperty('--duration', `${10 + Math.random() * 10}s`);
    heart.style.setProperty('--heart-size', `${12 + Math.random() * 13}px`);
    heart.style.setProperty('--heart-color', ['#ff8fc5', '#d3b2ff', '#ffd0e8', '#c4a5ff'][i % 4]);
    heart.style.animationDelay = `${Math.random() * -18}s`;
    decor.append(heart);
  }
}

let previousPosition = null;
let noCount = 0;

function sparkleAt(target, amount = 8) {
  const bounds = target.getBoundingClientRect();
  for (let i = 0; i < amount; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle-pop';
    sparkle.textContent = i % 2 ? '✦' : '♡';
    sparkle.style.left = `${bounds.left + Math.random() * bounds.width}px`;
    sparkle.style.top = `${bounds.top + Math.random() * bounds.height}px`;
    sparkle.style.fontSize = `${10 + Math.random() * 12}px`;
    document.body.append(sparkle);
    sparkle.addEventListener('animationend', () => sparkle.remove(), { once: true });
  }
}

function dodge() {
  noCount++;
  const maxX = Math.max(0, zone.clientWidth - noBtn.offsetWidth);
  const maxY = Math.max(0, zone.clientHeight - noBtn.offsetHeight);
  const yesLeft = yesBtn.offsetLeft;
  const yesTop = yesBtn.offsetTop;
  const safetyGap = 4;
  let position = { left: 0, top: 0 };

  for (let i = 0; i < 20; i++) {
    position = {
      left: Math.round(Math.random() * maxX),
      top: Math.round(Math.random() * maxY)
    };
    const overlapsYes = position.left < yesLeft + yesBtn.offsetWidth
      && position.left + noBtn.offsetWidth > yesLeft
      && position.top < yesTop + yesBtn.offsetHeight + safetyGap
      && position.top + noBtn.offsetHeight > yesTop - safetyGap;
    const movedEnough = !previousPosition || Math.hypot(position.left - previousPosition.left, position.top - previousPosition.top) > 48;
    if (!overlapsYes && movedEnough) break;
  }

  const overlapsYes = position.left < yesLeft + yesBtn.offsetWidth
    && position.left + noBtn.offsetWidth > yesLeft
    && position.top < yesTop + yesBtn.offsetHeight + safetyGap
    && position.top + noBtn.offsetHeight > yesTop - safetyGap;
  if (overlapsYes) {
    position = { left: 0, top: Math.min(maxY, yesTop + yesBtn.offsetHeight + safetyGap) };
  }

  previousPosition = position;
  noBtn.classList.add('is-dodging');
  noBtn.style.setProperty('--no-left', `${position.left}px`);
  noBtn.style.setProperty('--no-top', `${position.top}px`);
  window.pixelMascot.setSceneMood('sad');
  if (caption) caption.innerHTML = (noCount > 2
    ? "Dimo talaga ko wab???? okayy. "
    : "Okay okay mhpp hmpphhh  hwaudhausuifs ") + '<span>♡</span>';
  sparkleAt(noBtn, 5);
}

form?.addEventListener('submit', event => {
  event.preventDefault();
  sparkleAt(document.querySelector('#yes-button'), 18);
  setTimeout(() => location.assign(new URL('yes.html', location.href)), 180);
});

noBtn?.addEventListener('click', dodge);
noBtn?.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse' && noCount > 0) dodge();
});

document.addEventListener('pointerdown', event => {
  if (event.target.closest('button')) return;
  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle-pop';
  sparkle.textContent = ['✦', '♡', '✧'][Math.floor(Math.random() * 3)];
  sparkle.style.left = `${event.clientX}px`;
  sparkle.style.top = `${event.clientY}px`;
  sparkle.style.fontSize = `${12 + Math.random() * 12}px`;
  document.body.append(sparkle);
  sparkle.addEventListener('animationend', () => sparkle.remove(), { once: true });
});
