class FullscreenButton {
  constructor() {
    this._button = document.querySelector('[data-fullscreen-button]');
    this._gameWrapper = document.querySelector('[data-game-wrapper]');

    this._openFullscreen = this._openFullscreen.bind(this);
    this._closeFullscreen = this._closeFullscreen.bind(this);
    this._buttonHandler = this._buttonHandler.bind(this);

    this._button.addEventListener('click', this._buttonHandler);
  }

  _openFullscreen() {
    this._gameWrapper.requestFullscreen();
    this._gameWrapper.classList.add('fullscreen-mode');
  }

  _closeFullscreen() {
    document.exitFullscreen();
    this._gameWrapper.classList.remove('fullscreen-mode');
  }

  _buttonHandler() {
    this._gameWrapper.classList.contains('fullscreen-mode')? this._closeFullscreen(): this._openFullscreen();
  }
}

export {FullscreenButton}