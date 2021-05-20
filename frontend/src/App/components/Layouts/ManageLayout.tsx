import React from 'react'

import NavBar from './NavBar'

const withManageLayout = <P extends {}>(WrappedComponent: React.ComponentType<P>) => {
  return (props: any) => (
    <NavBar>
      <WrappedComponent {...props as P} />
    </NavBar>
  )
}

export default withManageLayout
