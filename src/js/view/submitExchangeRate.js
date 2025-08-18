import View from './View.js'

class SubmitExchangeRate extends View {
  _parentElement = document.querySelector('.convert-currency')
  _errorMessage = 'Something went wrong. Please try again.'
  _cachedRate = null
  _firstRender = true
  _codes = []

  getCurrencySymbol(code, locale = 'en-US') {
    return (0)
      .toLocaleString(locale, {
        style: 'currency',
        currency: code,
        currencyDisplay: 'symbol',
      })
      .replace(/\d|[.,\s]/g, '')
      .trim()
  }

  formatCurrency(code) {
    const symbol = this.getCurrencySymbol(code)
    return `${symbol}`
  }

  renderCurrencyOptions(codes) {
    if (!codes || codes.length === 0) return

    this._codes = codes
    const fromEl = this._parentElement.querySelector('#fromCurrency')
    const toEl = this._parentElement.querySelector('#toCurrency')

    if (!fromEl || !toEl) return

    const currentFrom = fromEl.value
    const currentTo = toEl.value

    const selects = this._parentElement.querySelectorAll('.currencyCodes')
    selects.forEach((select) => {
      select.innerHTML = ''
      codes.forEach(({ code }) => {
        const option = `<option value="${code}">${code}</option>`
        select.insertAdjacentHTML('beforeend', option)
      })
    })


    if (this._firstRender) {
      fromEl.value = 'USD'
      toEl.value = 'VND'
      this._firstRender = false
    } else {
      fromEl.value = currentFrom || this._data?.base_code || 'USD'
      toEl.value = currentTo || this._data?.target_code || 'VND'
    }
  }

  addHandlerExchangeRate(handler) {
    const amountFromEl = this._parentElement.querySelector('#amountFrom')
    const fromCurrencyEl = this._parentElement.querySelector('#fromCurrency')
    const toCurrencyEl = this._parentElement.querySelector('#toCurrency')


    this._parentElement.addEventListener('input', (e) => {
      if (e.target.id === 'amountFrom') {
        this._displayResult(this._data)
      }
    })


    this._parentElement.addEventListener('change', (e) => {
      if (e.target.id === 'fromCurrency' || e.target.id === 'toCurrency') {
        const fromCurrencyEl =
          this._parentElement.querySelector('#fromCurrency')
        const toCurrencyEl = this._parentElement.querySelector('#toCurrency')

        handler({
          from: fromCurrencyEl.value,
          to: toCurrencyEl.value,
        })
      }
    })


    this._parentElement.addEventListener('click', (e) => {
      if (e.target.closest('#change-currency')) {
        e.preventDefault()


        const temp = fromCurrencyEl.value
        fromCurrencyEl.value = toCurrencyEl.value
        toCurrencyEl.value = temp


        const tempAmount =
          this._parentElement.querySelector('#amountFrom').value
        this._parentElement.querySelector('#amountFrom').value =
          this._parentElement.querySelector('#amountTo').value
        this._parentElement.querySelector('#amountTo').value = tempAmount


        handler({
          from: fromCurrencyEl.value,
          to: toCurrencyEl.value,
        })
      }
    })
  }

  _generateMarkup() {
    return `
      <div class="exchange-rate__mid-market">
        <p>Mid-market exchange data</p>
        <p>${this.formatCurrency(this._data.base_code)} 1 ${
      this._data.base_code
    } = ${this._data.conversion_rate} ${this._data.target_code}</p>
      </div>
      <form class='form-container'>
        <div class='input-wrapper'>
          <label for='amountFrom'>Amount</label>
          <div class='select-currency'>
            <input id="amountFrom" type="number" placeholder="Amount" value="${
              this._parentElement.querySelector('#amountFrom').value || 1
            }" />
            <select id="fromCurrency" class='currencyCodes'></select>
          </div>
        </div>

        <div id='change-currency' class='change-currency'>
          <i class="fa-solid fa-arrow-right-arrow-left"></i>
        </div>

        <div class='input-wrapper'>
          <label for='amountTo'>Convert to</label>
          <div class='select-currency'>
            <input id="amountTo" type="number" placeholder="Result" readonly>
            <select id="toCurrency" class='currencyCodes'></select>
          </div>
        </div>
      </form>
    `
  }

  render(data) {
    this._data = data
    const markup = this._generateMarkup()
    this._parentElement.innerHTML = markup

    if (this._codes && this._codes.length > 0) {
      this.renderCurrencyOptions(this._codes)
    }
    this._displayResult(data)
  }

  _displayResult(data) {
    if (!data || !data.conversion_rate) return

    const amountFromEl = this._parentElement.querySelector('#amountFrom')
    const amountToEl = this._parentElement.querySelector('#amountTo')

    if (!amountFromEl || !amountToEl) return

    const from = parseFloat(amountFromEl.value) || 0
    const result = from * data.conversion_rate
    amountToEl.value = result.toFixed(2)
  }
}

export default new SubmitExchangeRate()
