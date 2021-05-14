import React from 'react'
import './App.css'
import ContextProvider from './App/hooks/context'
import Dashboard from './App/pages/dashboard'
import NavBar from './header'
import Setting from './App/pages/setting'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App () {
  return (
    <BrowserRouter>
      <ContextProvider>
        <NavBar />
        <div
          style={{ padding: '5% 5%' }}
        >
          <Switch>
            <Route path='/setting'>
              <Setting />
            </Route>
            <Route path='/'>
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App
