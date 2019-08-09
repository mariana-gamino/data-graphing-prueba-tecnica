import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import Graph from './components/Graph'

const Router = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/graph" component={Graph}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router