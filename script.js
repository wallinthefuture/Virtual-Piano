const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

const startSound = (event) => {
  event.target.classList.add('piano-key-active');
  const note = event.target.dataset.note;
  const src = `assets/audio/${note}.mp3`;
  playAudio(src);
};
const stopSound = (event) => {
  event.target.classList.remove('piano-key-active');
};

const startCorrespondOver = (event) => {
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.add('piano-key-active');
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
  }
  pianoКeys.forEach((el) => {
    el.addEventListener('mouseover', startSound);
    el.addEventListener('mouseout', stopSound);
  });
};
const stopCorrespondOver = (event) => {
  pianoКeys.forEach((el) => {
    el.classList.remove('piano-key-active');
    el.removeEventListener('mouseover', startSound);
    el.removeEventListener('mouseout', stopSound);
  });
};

piano.addEventListener('mousedown', startCorrespondOver, false);
piano.addEventListener('mouseup', stopCorrespondOver);

window.addEventListener('keydown', (event) => {
  if (event.repeat == false) {
    const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
    const note = document.querySelector(`div[data-key="${event.keyCode}"]`)
      .dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
    key.classList.add('piano-key-active');
  }
});

const btn = document.querySelector('.btn-container');
const btnKeys = document.querySelectorAll('.btn');

btn.addEventListener('click', (event) => {
  if (!event.target.classList.contains('btn-active')) {
    btnKeys.forEach((el) => {
      if (el.classList.contains('btn-active')) {
        el.classList.remove('btn-active');
      }
    });
    pianoКeys.forEach((el) => {
      if (el.classList.contains('piano-key-letter')) {
        el.classList.remove('piano-key-letter');
      } else {
        el.classList.add('piano-key-letter');
      }
    });
    event.target.classList.add('btn-active');
  }
});

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('piano-key-active');
}
pianoКeys.forEach((el) =>
  el.addEventListener('transitionend', removeTransition)
);

const flscreen = document.querySelector('.fullscreen');
flscreen.addEventListener('click', (event) => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});
