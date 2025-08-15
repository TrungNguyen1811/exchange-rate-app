import View from './View.js'
import { getNameCurrency } from '../helper.js'

class SubmitTimeHistory extends View {
  _parentElement = document.querySelector('.history-currency')
  _errorMessage = 'Something went wrong. Please try again.'

  _firstRender = true
  _codes = []

  _generateMarkup() {
    return `
      <table class='table-history'>
          <thead>
            <tr class='table-header'>
              <th>
                currency code
              </th>
              <th>name</th>
              <th>units per ${this._data.base}</th>
              <th>${this._data.base} per units</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(this._data.rates)
              .map(
                ([code, rate]) => `
                  <tr>
                    <td>${code}</td>
                    <td>${getNameCurrency(code)}</td>
                    <td>${rate}</td>
                    <td>${(1 / rate).toFixed(6)}</td>
                  </tr>
                `
              )
              .join('')}
          </tbody>
        </table>
      `
  }

  renderCurrencyOptions(codes) {
    const data = this._parentElement.querySelector('.currencyCodes')
    const codeEl = this._parentElement.querySelector('#codeCurrency')
    const currentCode = codeEl.value

    this._codes = codes

    data.innerHTML = ''
    codes.forEach(({ code }) => {
      const option = `<option value="${code}">${code}</option>`
      data.insertAdjacentHTML('beforeend', option)
    })

    if (this._firstRender) {
      codeEl.value = 'EUR'
      this._firstRender = false
    } else {
      codeEl.value = currentCode
    }
  }

  addHandlerTimeHistory(handler) {
    const codeEl = this._parentElement.querySelector('#codeCurrency')
    const time = this._parentElement.querySelector('#date')

    const update = () => {
      const selectedDate = new Date(time.value)
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
      const day = String(selectedDate.getDate()).padStart(2, '0')

      handler({
        base_code: codeEl.value,
        year,
        month,
        day,
      })
    }

    time.addEventListener('input', update)
    codeEl.addEventListener('change', update)
  }

  render(data) {
    this._data = data
    const markup = this._generateMarkup()
    this._parentElement.insertAdjacentHTML('beforeend', markup)
  }
}

export default new SubmitTimeHistory()
