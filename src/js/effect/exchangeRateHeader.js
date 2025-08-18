import { getNameCurrency } from '../helper.js'
import View from '../view/View.js'
import * as model from '../model.js'

class Header extends View {
  _parentElement = document.querySelector('.exchange-rate__header')

  _generatorMarkup() {
    const lastTime = new Date(
      this._data.time_last_update_utc
    ).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

    const updateTime = new Date(
      this._data.time_next_update_utc
    ).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

    const nameBaseCode = getNameCurrency(this._data.base_code)
    const nameTargetCode = getNameCurrency(this._data.target_code)

    return `
      <h2 class='exchange-rate__heading'>
        ${nameBaseCode} to ${nameTargetCode} Historical Exchange Rates
      </h2>
      <p class='exchange-rate__description'>
        Welcome to the ${nameBaseCode} to ${nameTargetCode} history summary.
        This is the ${nameBaseCode} (${this._data.base_code}) to ${nameTargetCode} (${this._data.target_code}) 
        exchange rate history summary page, detailing historical data from 
        <strong>${lastTime}</strong> to <strong>${updateTime}</strong>.
      </p>
    `
  }

  render(data) {
    this._data = data
    this._parentElement.innerHTML = this._generatorMarkup()
  }
}

export default new Header()
