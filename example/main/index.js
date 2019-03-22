/* eslint-disable import/named */
import '@babel/polyfill'
import 'raf/polyfill'
import 'whatwg-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const target = document.getElementById('player')
ReactDOM.render(<App />, target)
