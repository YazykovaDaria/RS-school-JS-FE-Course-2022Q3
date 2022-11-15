/* eslint-disable no-underscore-dangle */
import icon from '../../assets/icons/audio.png';
import { getTimeCodeFromNum } from './helpers';

class AudioPlayer {
  elements = {
    audioContainer: null,
    timeline: null,
    progressBar: null,
    volumeSlider: null,
    playBtn: null,
    volumeBtn: null,
  };

  anotherPlayer = false;

  constructor(sound, container) {
    this.audio = new Audio(sound);
    this.container = container;
  }

  init() {
    this._render();

    this.elements.volumeBtn = this.elements.audioContainer.querySelector('.volume-button');
    this.elements.playBtn = this.elements.audioContainer.querySelector('.toggle-play.play');
    this.elements.volumeSlider = this.elements.audioContainer.querySelector('.controls .volume-slider');
    this.elements.timeline = this.elements.audioContainer.querySelector('.timeline');
    this.elements.progressBar = this.elements.audioContainer.querySelector('.progress');

    this._attachEvents();
  }

  _render() {
    this.elements.audioContainer = document.createElement('div');
    this.elements.audioContainer.classList.add('audio-player');
    this.elements.audioContainer.innerHTML = `<div class="timeline">
  <div class="progress"></div>
</div>
<div class="controls">
  <div class="play-container">
    <div class="toggle-play play">
  </div>
  </div>
  <div class="time">
    <div class="current">0:00</div>
    <div class="divider">/</div>
    <div class="length"></div>
  </div>
  <div class="volume-container">
    <div class="volume-button">
      <div class="volume icono-volumeMedium">
        <img src="${icon}" alt="audio icon">
      </div>
    </div>

    <div class="volume-slider">
      <div class="volume-percentage"></div>
    </div>
  </div>
</div>`;
    this.container.append(this.elements.audioContainer);
  }

  _attachEvents() {
    this.audio.addEventListener(
      'canplaythrough',
      () => {
        this.elements.audioContainer.querySelector('.time .length').textContent = getTimeCodeFromNum(
          this.audio.duration,
        );
        this.audio.volume = 0.75;
      },
      false,
    );

    this.audio.addEventListener('ended', () => {
      this._changePlayBtnStyle('play', 'pause');
    });

    this.elements.playBtn.addEventListener(
      'click',
      () => {
        if (this.audio.paused) {
          this._changePlayBtnStyle('pause', 'play');
          this.audio.play();
          if (this.anotherPlayer) this.anotherPlayer.pause();
        } else {
          this._changePlayBtnStyle('play', 'pause');
          this.audio.pause();
        }
      },
      false,
    );

    this.elements.timeline.addEventListener('click', (e) => {
      const timelineWidth = window.getComputedStyle(this.elements.timeline).width;
      const timeToSeek = (e.offsetX / parseInt(timelineWidth, 10)) * this.audio.duration;
      this.audio.currentTime = timeToSeek;
    }, false);

    this.elements.volumeSlider.addEventListener('click', (e) => {
      const sliderWidth = window.getComputedStyle(this.elements.volumeSlider).width;
      const newVolume = e.offsetX / parseInt(sliderWidth, 10);
      this.audio.volume = newVolume;
      this.elements.audioContainer.querySelector('.controls .volume-percentage').style.width = `${newVolume * 100}%`;
    }, false);

    setInterval(() => {
      this.elements.progressBar.style.width = `${(this.audio.currentTime / this.audio.duration) * 100}%`;
      this.elements.audioContainer.querySelector('.time .current').textContent = getTimeCodeFromNum(
        this.audio.currentTime,
      );
    }, 500);
  }

  _changePlayBtnStyle(add, remove) {
    this.elements.playBtn.classList.remove(remove);
    this.elements.playBtn.classList.add(add);
  }

  pause() {
    this.audio.pause();
    this._changePlayBtnStyle('play', 'pause');
  }

  setAnotherPlayer(player) {
    this.anotherPlayer = player;
  }
}

export default AudioPlayer;
