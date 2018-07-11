import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import 'jquery/dist/jquery.slim'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('root'))
registerServiceWorker()
