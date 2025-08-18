// compareRateNation.js
import View from './View'
import { debounce } from '../helper'

class CompareRateNation extends View {
  _parentElement = document.querySelector('.compare-table')
  _codesCurrency = []
  _newCompareTable = {}

  _customInput = document.querySelector('.customInput')
  _selectedData = document.querySelector('.selectedData')
  _searchInput = document.querySelector('.searchInput input')
  _ul = document.querySelector('.options ul')
  _customInputContainer = document.querySelector('.customInputContainer')

  constructor() {
    super()
    this._addUIListeners()
  }
  _addUIListeners() {
    this._customInputContainer.addEventListener('click', (e) => {
      e.stopPropagation() // prevent window click
      this._toggleDropdown()
    })

    window.addEventListener('click', () => {
      this._toggleDropdown(false)
    })

    this._searchInput.addEventListener(
      'keyup',
      debounce(() => {
        const val = this._searchInput.value.toLowerCase()
        const filtered = this._codesCurrency.filter(({ name }) =>
          name.toLowerCase().startsWith(val)
        )
        this._renderOptions(filtered)
      }, 250)
    )

    // Prevent dropdown hide khi click vào search input
    this._searchInput.addEventListener('click', (e) => {
      e.stopPropagation()
    })
  }

  _toggleDropdown(show) {
    if (show === undefined) this._customInputContainer.classList.toggle('show')
    else this._customInputContainer.classList[show ? 'add' : 'remove']('show')
  }

  initDropdown(codesCurrency) {
    this._codesCurrency = codesCurrency
    this._renderOptions(this._codesCurrency)
  }

  _renderOptions(codes) {
    this._ul.innerHTML = ''
    if (!codes.length) {
      this._ul.innerHTML = `
        <p style="margin-top:1rem;">Oops can't find any result</p>
        <p style="margin-top:.2rem;font-size:.9rem;">Try searching something else.</p>
      `
      return
    }

    codes.forEach(({ code, name }) => {
      const li = document.createElement('li')
      li.textContent = `${name} (${code})`
      li.addEventListener('click', () => {
        this._selectedData.innerText = code
        this._ul
          .querySelectorAll('li.selected')
          .forEach((i) => i.classList.remove('selected'))
        li.classList.add('selected')
        this._toggleDropdown(false)
        if (this._handlerSelect) this._handlerSelect(code)
      })

      this._ul.appendChild(li)
    })
  }

  renderCurrencyOptions(codes) {
    this.initDropdown(codes)
  }

  compareWithTopCurrencies(data) {
    if (!data || !data.conversion_rates) {
      return
    }

    const topCurrencies = ['USD', 'EUR', 'JPY', 'GBP', 'CHF', 'CAD']
    const base = data.base_code
    const rates = Object.entries(data.conversion_rates)
      .filter(([code]) => topCurrencies.includes(code))
      .map(([code, price]) => ({ code, price }))

    this._newCompareTable = this.convertRates(base, rates)
  }

  convertRates(base, rates) {
    const allCurrencies = [base, ...rates.map((r) => r.code)]
    const nestedRates = {}

    allCurrencies.forEach((from) => {
      nestedRates[from] = {}
      allCurrencies.forEach((to) => {
        if (from === to) {
          nestedRates[from][to] = 1
          return
        }

        const fromRate =
          from === base ? 1 : rates.find((r) => r.code === from)?.price
        const toRate = to === base ? 1 : rates.find((r) => r.code === to)?.price

        if (from === base) nestedRates[from][to] = toRate
        else if (to === base) nestedRates[from][to] = 1 / fromRate
        else nestedRates[from][to] = toRate / fromRate

        nestedRates[from][to] = +nestedRates[from][to].toFixed(4)
      })
    })

    return nestedRates
  }

  _generatorMarkup() {
    if (!this._newCompareTable || !Object.keys(this._newCompareTable).length)
      return ''

    const headers = Object.keys(this._newCompareTable)
      .map((code) => `<th>${code}</th>`)
      .join('')

    const rows = Object.keys(this._newCompareTable)
      .map((from) => {
        const cells = Object.keys(this._newCompareTable[from])
          .map((to) => `<td>${this._newCompareTable[from][to]}</td>`)
          .join('')
        return `<tr><td>${from}</td>${cells}</tr>`
      })
      .join('')

    return `
      <table>
        <thead>
          <tr><th></th>${headers}</tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `
  }

  addHandlerSelect(handler) {
    this._handlerSelect = handler
  }

  render(data) {
    this._data = data
    this.compareWithTopCurrencies(data)
    const markup = this._generatorMarkup()
    this._parentElement.innerHTML = ''
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }
}

export default new CompareRateNation()
