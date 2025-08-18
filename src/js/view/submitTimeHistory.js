import View from './View.js'
import { getNameCurrency } from '../helper.js'

class SubmitTimeHistory extends View {
  _parentElement = document.querySelector('.history')
  _addSection = document.querySelector('.history__table')
  _errorMessage = 'Something went wrong. Please try again.'

  _firstRender = true
  _codes = []
  _currentPage = 1
  _rowsPerPage = 10

  _generateMarkup() {
    const entries = Object.entries(this._data.rates)
    const totalPages = Math.ceil(entries.length / this._rowsPerPage)

    const start = (this._currentPage - 1) * this._rowsPerPage
    const end = start + this._rowsPerPage
    const currentEntries = entries.slice(start, end)

    return `
      <h3>Currency Table: ${this._data.base}</h3>
      <table class='table__history'>
          <thead>
            <tr class='table-header'>
              <th>currency code</th>
              <th>name</th>
              <th>units per ${this._data.base}</th>
              <th>${this._data.base} per units</th>
            </tr>
          </thead>
          <tbody>
            ${currentEntries
              .map(
                ([code, rate]) => `
                  <tr>
                    <td>${code}</td>
                    <td>${
                      getNameCurrency(code) ? getNameCurrency(code) : '-'
                    }</td>
                    <td>${rate}</td>
                    <td>${(1 / rate).toFixed(6)}</td>
                  </tr>
                `
              )
              .join('')}
          </tbody>
        </table>
        <div class="history__pagination">
          <button class="prev" ${
            this._currentPage === 1 ? 'disabled' : ''
          }>Prev</button>
          <span>Page ${this._currentPage} of ${totalPages}</span>
          <button class="next" ${
            this._currentPage === totalPages ? 'disabled' : ''
          }>Next</button>
        </div>
    `
  }

  _addPaginationHandler() {
    const pagination = this._addSection.querySelector('.history__pagination')
    if (!pagination) return

    pagination.querySelector('.prev').addEventListener('click', () => {
      if (this._currentPage > 1) {
        this._currentPage--
        this.update()
      }
    })

    pagination.querySelector('.next').addEventListener('click', () => {
      const totalPages = Math.ceil(
        Object.entries(this._data.rates).length / this._rowsPerPage
      )
      if (this._currentPage < totalPages) {
        this._currentPage++
        this.update()
      }
    })
  }

  renderCurrencyOptions(codes) {
    const data = this._parentElement.querySelector('.history__codes')
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
    const submit = this._parentElement.querySelector('.history__submit')

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

    submit.addEventListener('click', update)
  }

  render(data) {
    this._data = data
    this._currentPage = 1
    this.update()
  }

  update() {
    this._addSection.innerHTML = ''
    const markup = this._generateMarkup()
    this._addSection.insertAdjacentHTML('afterbegin', markup)
    this._addPaginationHandler()
  }
}

export default new SubmitTimeHistory()
