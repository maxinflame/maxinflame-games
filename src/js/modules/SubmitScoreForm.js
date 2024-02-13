class SubmitScoreForm {
  constructor(form) {
    this._form = form;
    this._scoreInput = form.querySelector('[name="score"]');
    this._popup = form.closest('[data-game-over]');
    this._scoreTable = document.querySelector('[data-result-table]');

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

    let json = await response.json();
    console.log(json);

    if (!response) {
      this._onError();
    } else {
      this._onSuccess(response);
    }
  }

  _onError() {
    this._popup.classList.add('error');
  }

  _onSuccess(response) {
    const results = Object.values(response);

    this._scoreTable.innerHTML = '';

    results.forEach(res => {
      
      const entries = Object.entries(res)
      
      console.log(entries)

      const tr = document.createElement('tr');
      const nameCell = document.createElement('td');
      const valueCell = document.createElement('td');

      nameCell.classList.add('score-table__cell');
      valueCell.classList.add('score-table__cell');

      nameCell.innerHTML = entries[0][0];
      valueCell.innerHTML = entries[0][1];

      tr.appendChild(nameCell);
      tr.appendChild(valueCell);

      this._scoreTable.appendChild(tr)
    })

    this._popup.classList.add('success')  
  }

  updateScore(score) {
    this._scoreInput.value = score;
  }
}

export {SubmitScoreForm}