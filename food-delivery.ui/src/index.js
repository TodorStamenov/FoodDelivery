import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './utils/reducers'
import 'jquery/dist/jquery.slim'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const store = createStore(rootReducer)

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'))
registerServiceWorker()
