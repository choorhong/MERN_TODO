import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from 'antd'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button type='primary' onClick={() => loginWithRedirect()}>Login</Button>
    </div>
  )
}

export default LoginButton
