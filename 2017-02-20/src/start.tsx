console.log('start')

import React from 'react'
import ReactDOM from 'react-dom'
console.log(React)
ReactDOM.render(<h1>React loaded with systemjs from npm</h1>, document.getElementById('app'));

import a from './other.js'

console.log(a)