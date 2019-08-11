import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import ContextProvider from './Context'
import Router from './Router'

ReactDOM.render(
<ContextProvider>
<Router/>
</ContextProvider>, document.getElementById('root'))
serviceWorker.unregister();
