import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
// import { LoadingOutlined } from '@ant-design/icons'

import Login from '../pages/auth/login'
import Signup from '../pages/auth/signup'
import Dashboard from '../pages/dashboard'
import Setting from '../pages/setting'

import { PublicRoute, PrivateRoute } from './route'

const AppRouter = () => {
//   const { isAuthenticated, isLoading } = useAuth0()
//   console.log('isLoading', isLoading)
//   console.log('isAuthenticated', isAuthenticated)

  //   if (isLoading) {
  //     return (
  //       <div style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  //         <LoadingOutlined />
  //       </div>
  //     )
  //   }

  return (
    <BrowserRouter>
      <Switch>

        <PublicRoute path='/auth/login'>
          <Login />
        </PublicRoute>

        <PublicRoute path='/auth/signup'>
          <Signup />
        </PublicRoute>

        <PrivateRoute path='/setting'>
          <Setting />
        </PrivateRoute>

        <PrivateRoute path='/' exact>
          <Dashboard />
        </PrivateRoute>

      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
