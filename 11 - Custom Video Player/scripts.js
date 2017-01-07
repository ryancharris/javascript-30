// SELECT OUR ELEMENTS
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// DEFINE OUR FUNCTIONS
function togglePlay() {
  // check to see if the video is paused b/c there is no 'playing' property
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  // if 'this' (the video) is paused, change the button to a play symbol
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// HOOK UP THE EVENT LISTENERS
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

// add 'click' listeners to each of the skip buttons
skipButtons.forEach(button => {
  button.addEventListener('click', skip);
});

// add 'change' listeners to each of the range sliders
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
});

// add 'mousemove' listeners to each of the range sliders
ranges.forEach(range => {
  range.addEventListener('mousemove', handleRangeUpdate);
});

// add 'click' listener to the progress bar
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
