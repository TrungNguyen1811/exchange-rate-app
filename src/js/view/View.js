export default class View {
  _data

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError()

    this._data = data
    const markup = this._generateMarkup()

    if (!render) return markup

    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  _clear() {
    this._parentElement.innerHTML = ''
  }

  renderSpinner() {
    const markup = `<p>Loading...</p>`
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  renderError(message = this._errorMessage) {
    const markup = `<p>${message}</p>`
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }
}
