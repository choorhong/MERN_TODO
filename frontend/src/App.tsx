import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { LoadingOutlined } from '@ant-design/icons'

import './App.css'
import LoginButton from './App/pages/auth/LoginButton'
import Login from './App/pages/auth/login'
import Signup from './App/pages/auth/signup'
import Dashboard from './App/pages/dashboard'
import Setting from './App/pages/setting'

function App () {
  const { isAuthenticated, isLoading } = useAuth0()
  console.log('isLoading', isLoading)
  console.log('isAuthenticated', isAuthenticated)

  if (isLoading) {
    return (
      <div style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingOutlined />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Switch>

        <Route path='/auth/login'>
          <Login />
          {/* <LoginButton /> */}
        </Route>

        <Route path='/auth/signup'>
          <Signup />
        </Route>

        <Route path='/setting'>
          <Setting />
        </Route>

        <Route path='/' exact>
          <Dashboard />
        </Route>

      </Switch>
    </BrowserRouter>
  )
}

export default App
