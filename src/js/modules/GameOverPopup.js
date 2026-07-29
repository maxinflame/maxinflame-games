class GameOverPopup {
  constructor(popup) {
    this._popup = popup;
    this._listeners = {};

    this._retryButton = popup.querySelector('[data-retry]');
    if (this._retryButton) {
      this._retryButton.addEventListener('click', () => this._emit('retry'));
    }
  }

  hide() {
    this._popup.classList.add('hidden');
    this._popup.classList.remove('error');
    this._popup.classList.remove('success');
  }

  show() {
    this._popup.classList.remove('hidden');
  }

  on(event, callback) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  _emit(event, data) {
    this._listeners[event]?.forEach((cb) => cb(data));
  }
}

export { GameOverPopup };
