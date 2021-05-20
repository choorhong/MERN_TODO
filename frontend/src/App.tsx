import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { LoadingOutlined } from '@ant-design/icons'

import './App.css'
import ContextProvider from './App/hooks/context'
import LoginButton from './App/pages/login/LoginButton'
import Dashboard from './App/pages/dashboard'
import Setting from './App/pages/setting'
import NavBar from './App/components/Layouts/NavBar'

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

      <Route path='/login'>
        <LoginButton />
      </Route>

      <Route>
        <ContextProvider>
          <NavBar>
            <Switch>

              <Route path='/setting'>
                <Setting />
              </Route>

              <Route path='/'>
                <Dashboard />
              </Route>

            </Switch>
          </NavBar>
        </ContextProvider>
      </Route>
    </BrowserRouter>
  )
}

export default App
