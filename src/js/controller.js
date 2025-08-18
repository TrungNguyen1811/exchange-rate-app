// controller.js
import submitExchangeRate from './view/submitExchangeRate.js'
import submitTimeHistory from './view/submitTimeHistory.js'
import compareRateNation from './view/compareRateNation.js'
import header from './effect/exchangeRateHeader.js'
import * as model from './model.js'

if (module.hot) {
  module.hot.accept()
}

const controlLoadCurrencyCodes = async function () {
  try {
    await model.supportCodeCurrency()
    submitExchangeRate.renderCurrencyOptions(model.state.codes.supported_codes)
    submitTimeHistory.renderCurrencyOptions(model.state.codes.supported_codes)
    compareRateNation.renderCurrencyOptions(model.state.codes.supported_codes)
  } catch (err) {
    throw err
  }
}

const controlExchangeRate = async function (base) {
  try {
    if (
      model.state.pair_currency?.base_code !== base.from ||
      model.state.pair_currency?.target_code !== base.to
    ) {
      await model.convertCurrency(base.from, base.to)
      header.render(model.state.pair_currency)
    }
    submitExchangeRate.render(model.state.pair_currency)
  } catch (err) {
    submitExchangeRate.renderError(err.message)
  }
}

const controlTimeHistory = async function (base) {
  try {
    await model.historyCurrency(base.base_code, base.year, base.month, base.day)
    submitTimeHistory.render(model.state.history, true)
  } catch (err) {
    submitTimeHistory.renderError(err.message)
  }
}

const controlCompareRate = async function (base) {
  try {
    await model.lastCurrency(base)
    compareRateNation.render(model.state.last_currency)
  } catch (error) {
    compareRateNation.renderError(error.message)
  }
}

const init = async function () {
  await controlLoadCurrencyCodes()
  controlExchangeRate({ from: 'USD', to: 'VND' })
  submitExchangeRate.addHandlerExchangeRate(controlExchangeRate)
  submitTimeHistory.addHandlerTimeHistory(controlTimeHistory)
  compareRateNation.addHandlerSelect(controlCompareRate)
  controlCompareRate('USD')
}

init()
