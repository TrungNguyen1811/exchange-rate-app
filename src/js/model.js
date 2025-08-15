import { AJAX, getJSON } from './helper'
import { API_URL, KEY, API_HISTORY, KEY_HISTORY } from './config'

export const state = {
  last_currency: {},
  pair_currency: {},
  history: {},
  codes: {},
}

const createLastCurrency = function (data) {
  return {
    result: data.result,
    documentation: data.documentation,
    terms_of_use: data.terms_of_use,
    time_last_update_unix: data.time_last_update_unix,
    time_last_update_utc: data.time_last_update_utc,
    time_next_update_unix: data.time_next_update_unix,
    time_next_update_utc: data.time_next_update_utc,
    base_code: data.base_code,
    conversion_rate: data.conversion_rate,
  }
}

const createConvertCurrency = function (data) {
  return {
    result: data.result,
    documentation: data.documentation,
    terms_of_use: data.terms_of_use,
    time_last_update_unix: data.time_last_update_unix,
    time_last_update_utc: data.time_last_update_utc,
    time_next_update_unix: data.time_next_update_unix,
    time_next_update_utc: data.time_next_update_utc,
    base_code: data.base_code,
    target_code: data.target_code,
    conversion_rate: data.conversion_rate,
  }
}

const createHistoryCurrency = function (data) {
  return {
    success: data.success,
    historical: data.historical,
    date: data.date,
    timestamp: data.timestamp,
    base: data.base,
    rates: data.rates,
  }
}

const createCodeCurrency = function (data) {
  return {
    result: data.result,
    documentation: data.documentation,
    terms_of_use: data.terms_of_use,
    supported_codes: data.supported_codes.map(([code, name]) => ({
      code,
      name,
    })),
  }
}

export const lastCurrency = async function (base) {
  try {
    const data = await getJSON(`${API_URL}/${KEY}/latest/${base}`)
    const last_currency = createLastCurrency(data)
    state.last_currency = last_currency
    return state.last_currency
  } catch (err) {
    throw err
  }
}

export const convertCurrency = async function (from, to) {
  try {
    const data = await getJSON(`${API_URL}/${KEY}/pair/${from}/${to}`)
    const pair_currency = createConvertCurrency(data)
    state.pair_currency = pair_currency
    return state.pair_currency
  } catch (err) {
    throw new Error('Conversion failed')
  }
}

export const historyCurrency = async function (base, year, month, day) {
  try {
    const data = await getJSON(
      `${API_HISTORY}/${year}-${month}-${day}?access_key=${KEY_HISTORY}&base=${base}`
    )
    const history = createHistoryCurrency(data)
    state.history = history
    return state.history
  } catch (error) {
    throw error
  }
}

export const supportCodeCurrency = async function () {
  try {
    const data = await getJSON(`${API_URL}/${KEY}/codes`)
    const codes = createCodeCurrency(data)
    state.codes = codes
    return state.codes
  } catch (error) {
    throw error
  }
}
