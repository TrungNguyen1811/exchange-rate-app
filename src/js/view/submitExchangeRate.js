// submitExchangeRate.js
import View from './View.js'

class SubmitExchangeRate extends View {
  _parentElement = document.querySelector('.convert-currency')
  _errorMessage = 'Something went wrong. Please try again.'
  _cachedRate = null

  _firstRender = true

  renderCurrencyOptions(codes) {
    const fromEl = this._parentElement.querySelector('#fromCurrency')
    const toEl = this._parentElement.querySelector('#toCurrency')

    const currentFrom = fromEl.value
    const currentTo = toEl.value

    const datalist = document.querySelectorAll('.currencyCodes')
    datalist.forEach((data) => {
      data.innerHTML = ''
      codes.forEach(({ code }) => {
        const option = `<option value="${code}">${code}</option>`
        data.insertAdjacentHTML('beforeend', option)
      })
    })

    if (this._firstRender) {
      fromEl.value = 'USD'
      toEl.value = 'VND'
      this._firstRender = false
    } else {
      fromEl.value = currentFrom
      toEl.value = currentTo
    }
  }

  addHandlerExchangeRate(handler) {
    const amountFromEl = this._parentElement.querySelector('#amountFrom')
    const fromCurrencyEl = this._parentElement.querySelector('#fromCurrency')
    const toCurrencyEl = this._parentElement.querySelector('#toCurrency')
    const swapBtn = document.querySelector('#change-currency')

    const update = () => {
      handler({
        from: fromCurrencyEl.value,
        to: toCurrencyEl.value,
      })
    }

    amountFromEl.addEventListener('input', update)
    fromCurrencyEl.addEventListener('change', update)
    toCurrencyEl.addEventListener('change', update)

    swapBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const temp = fromCurrencyEl.value
      fromCurrencyEl.value = toCurrencyEl.value
      toCurrencyEl.value = temp
      update()
    })
  }

  render(rate) {
    this._displayResult(rate)
  }

  _displayResult(rate) {
    if (!rate || !rate.conversion_rate) return

    const amountFromEl = this._parentElement.querySelector('#amountFrom')
    const amountToEl = this._parentElement.querySelector('#amountTo')

    if (!amountFromEl || !amountToEl) return

    const from = parseFloat(amountFromEl.value) || 0
    const result = from * rate.conversion_rate
    amountToEl.value = result.toFixed(2)
  }
}

export default new SubmitExchangeRate()
