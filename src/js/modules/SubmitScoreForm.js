class SubmitScoreForm {
  constructor(form) {
    this._form = form;
    this._scoreInput = form.querySelector('[name="score"]');


    this._submitHandler = this._submitHandler.bind(this);

    this._init();
  }

  _init() {
    this._form.addEventListener('submit', this._submitHandler);
  }

  async _submitHandler(e) {
    e.preventDefault();
    const url = `${window.location.origin}/scores/snake`;

    let response = await fetch(url, {
      method: 'POST',
      body: new FormData(this._form),
    })
  }

  updateScore(score) {
    this._scoreInput.value = score;
    console.log(score)
  }
}

export {SubmitScoreForm}