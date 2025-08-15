import { getNameCurrency } from '../helper'
import View from './View'
import * as model from '../model.js'

class Header extends View {
  __parentElement = document.querySelector('.header-wrapper')

  _generatorMarkup() {
    const lastTime = new Date(this._data.time_last_update_utc)
    const updateTime = new Date(this._data.time_next_update_utc)

    const nameBaseCode = getNameCurrency(this._data.base_code)
    const nameTargetCode = getNameCurrency(this._data.target_code)

    return `
      <h2 class='heading-exchange'>${nameBaseCode} to ${nameTargetCode} Historical Exchange Rates</h2>
      <p class='description-exchange'>Welcome to the ${nameBaseCode} to ${nameTargetCode} history summary. This is the ${nameBaseCode} (${this._data.base_code}) to ${nameTargetCode} (${this._data.target_code}) exchange rate history summary page, detailing of USD and VND historical data from ${lastTime} to ${updateTime}.</p>
      `
  }

  render(data) {
    this._data = data
    const markup = this._generatorMarkup()
    this.__parentElement.innerHTML = ''
    this.__parentElement.insertAdjacentHTML('afterbegin', markup)
  }
}
export default new Header()
