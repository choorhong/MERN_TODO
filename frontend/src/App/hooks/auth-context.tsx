import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { auth } from '../../firebase'

export interface AuthContextProps {
  children?: React.ReactNode
}

type AuthContextType = {
  isLoggedIn: boolean;
  token: string | undefined;
  userId: string | undefined;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
}

export interface IAuthState {
  isLoggedIn: boolean;
  token: string | undefined;
  userId: string | undefined;
}

const authInitialState: IAuthState = {
  isLoggedIn: false,
  token: undefined,
  userId: undefined
}

const authReducer = (state: IAuthState, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userId: action.payload._id,
        token: action.token,
        isLoggedIn: !!action.token
      }
    case 'LOGOUT':
      return {
        ...state,
        ...authInitialState
      }
    default: return authInitialState
  }
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: undefined,
  userId: undefined,
  login: () => {},
  signup: () => {},
  logout: () => {}
})

const AuthContextProvider = (props: AuthContextProps) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(
      async (user) => {
        if (!user) {
          console.log('OUT--OUT--OUT')
          dispatch({
            type: 'LOGOUT'
          })
        } else {
          const { token } = await user.getIdTokenResult()
          const result = await axios({
            method: 'post',
            url: 'http://localhost:8080/auth/create-find-user',
            data: {},
            headers: {
              authorization: token
            }
          })
          console.log('result----result', result)
          dispatch({
            type: 'LOGIN',
            payload: result.data,
            token: token
          })
        }
        setIsLoading(false)
      })
    return unsubscribe
  }, [])

  const signup = useCallback<(email: string, password: string) => void> ((email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }, [])

  const login = useCallback<(email: string, password: string) => void> ((email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }, [])

  const logout = useCallback<() => void> (() => {
    return auth.signOut()
  }, [])

  // const resetPassword = useCallback<(email: string) => void> ((email) => {
  //   const config = {
  //     url: 'http://localhost:3000/auth/login',
  //     handleCodeInApp: true
  //   }
  //   return auth.sendPasswordResetEmail(email, config)
  // }, [])

  return (
    <AuthContext.Provider value={{ signup, login, logout, isLoggedIn: !!state.token, userId: state.userId, token: state.token }}>
      {!isLoading && props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

export const useAuth = () => {
  return useContext(AuthContext)
}
