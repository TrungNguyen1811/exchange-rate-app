'use strict'

import { TIMEOUT_SEC } from './config.js'
import * as model from './model.js'

const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} second`)
      )
    }, seconds * 1000)
  })
}

export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url)
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
    const data = await res.json()
    if (!res.ok) throw new Error(`${data.message} (${res.status})`)
    return data
  } catch (err) {
    throw err
  }
}

export const getNameCurrency = (code) => {
  const currency = model.state.codes.supported_codes.find(
    (c) => c.code === code
  )
  return currency ? currency.name : ''
}
