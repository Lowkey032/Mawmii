const audio = document.querySelector('#music-audio');
const toggle = document.querySelector('#music-toggle');
const label = document.querySelector('#music-label');
const status = document.querySelector('#music-status');
const savedTimeKey = 'pahintulot-playback-time';
const savedPlaybackTime = Number(sessionStorage.getItem(savedTimeKey));
let lastSavedPosition = Number.isFinite(savedPlaybackTime) ? savedPlaybackTime : 0;

function savePlaybackTime() {
  if (!Number.isFinite(audio.currentTime)) return;

  const isLoopingFromEnd = lastSavedPosition >= audio.duration - 1 && audio.currentTime < 1;
  const movedBackwards = audio.currentTime + 1 < lastSavedPosition && !isLoopingFromEnd;
  if (movedBackwards) return;

  lastSavedPosition = audio.currentTime;
  sessionStorage.setItem(savedTimeKey, String(lastSavedPosition));
}

function updateButton() {
  const isPlaying = !audio.paused;
  toggle.setAttribute('aria-pressed', String(isPlaying));
  toggle.setAttribute('aria-label', `${isPlaying ? 'Pause' : 'Play'} Pahintulot`);
  label.textContent = isPlaying ? 'Now playing · Pahintulot' : 'Pahintulot · tap to play';
}

audio.addEventListener('playing', () => {
  updateButton();
  status.textContent = 'Now playing Pahintulot · Tumutugtog na.';
});

audio.addEventListener('pause', updateButton);

audio.addEventListener('timeupdate', savePlaybackTime);
window.addEventListener('pagehide', savePlaybackTime);
document.addEventListener('click', event => {
  if (event.target.closest('#yes-button, .return-question')) savePlaybackTime();
}, true);
document.addEventListener('submit', savePlaybackTime, true);

audio.addEventListener('loadeddata', () => {
  if (audio.paused) status.textContent = 'Starting Pahintulot automatically.';
});

audio.addEventListener('error', () => {
  label.textContent = 'Audio error · tap to retry';
  status.textContent = 'Unable to load pahintulot.mp3.';
  console.error('Could not load pahintulot.mp3.');
});

toggle.addEventListener('click', async () => {
  if (!audio.paused) {
    audio.pause();
    return;
  }

  try {
    await audio.play();
    updateButton();
  } catch (error) {
    status.textContent = 'Could not play audio. Try again or check the MP3 file.';
    console.error('Audio playback failed:', error);
  }
});

let playbackStarted = false;
function startFromSavedPosition() {
  if (playbackStarted) return;
  playbackStarted = true;

  if (Number.isFinite(savedPlaybackTime) && savedPlaybackTime > 0 && savedPlaybackTime < audio.duration) {
    audio.currentTime = savedPlaybackTime;
  }

  audio.play().then(updateButton).catch(() => {
    if (!audio.error) {
      label.textContent = 'Autoplay blocked';
      status.textContent = 'This browser blocks automatic sound. Tap the music pill once to allow playback.';
    }
  });
}

audio.addEventListener('loadedmetadata', startFromSavedPosition, { once: true });
if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) startFromSavedPosition();
