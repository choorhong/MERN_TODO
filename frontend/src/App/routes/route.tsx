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
  const path = props.location?.state as { from?: { pathname: string | undefined }} | undefined
  const pathname = path?.from?.pathname

  // If the user signs out or sudden sign out by the system >>
  // The user will be brought back to the very last page he/she was at prior to being sign out
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn
          ? <Redirect to={{
            pathname: pathname || '/',
            state: { from: props.location }
          }}
            />
          : children
      }}
    />
  )
}
