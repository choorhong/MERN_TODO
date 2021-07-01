import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useAuth } from '../hooks/auth-context'

interface IRouteProps extends RouteProps {
  path?: string | undefined;
}

export const PrivateRoute = (props: IRouteProps) => {
  const { isLoggedIn } = useAuth()

  const { children, ...rest } = props

  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn
          ? children
          : <Redirect to={{
            pathname: '/auth/login',
            state: { from: props.location }
          }}
            />
      }}
    />
  )
}

export const PublicRoute = (props: IRouteProps) => {
  const { isLoggedIn } = useAuth()

  const { children, ...rest } = props

  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn
          ? <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }}
            />
          : children
      }}
    />
  )
}
