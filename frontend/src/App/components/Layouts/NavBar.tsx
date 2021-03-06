import React, { useState, useEffect, useCallback } from 'react'
import { DashboardOutlined, UserOutlined, SettingOutlined, LoginOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
// import { useAuth0 } from '@auth0/auth0-react'
import { useAuth } from '../../hooks/auth-context'

const { Header, Content } = Layout

const { SubMenu } = Menu

export interface NavBarProps {
  children: React.ReactNode
}

const NavBar = React.memo((props: NavBarProps) => {
  const { pathname } = useLocation()
  // const { logout } = useAuth0()
  const { logout } = useAuth()
  const [selectedKey, setSelectedKey] = useState('home')

  useEffect(() => {
    const paths = pathname.split('/')
    const key = paths[1] ? paths[1] : 'home'

    setSelectedKey(key)
  }, [pathname])

  const handleLogout = useCallback(async () => {
    try {
      await logout()
    } catch (err) {
      console.log('err', err)
    }
  }, [logout])

  return (
    <>
      <Header style={{ display: 'flex', justifyContent: 'space-between', padding: '0 25px' }}>
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Link to='/'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png'
              alt='logo'
              style={{
                float: 'left',
                width: '50px',
                height: '35px'

              }}
            />
          </Link>
        </div>
        <Menu theme='dark' selectedKeys={[selectedKey]} mode='horizontal' style={{ display: 'flex' }}>
          <Menu.Item key='home' icon={<DashboardOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>
          {/* <Menu.Item key='app' icon={<AppstoreOutlined />}>
              Navigation Two
            </Menu.Item> */}
          <SubMenu key='account' icon={<UserOutlined />} title='Account'>
            <Menu.Item key='setting' icon={<SettingOutlined />}>
              <Link to='/setting'>Setting</Link>
            </Menu.Item>
            <Menu.Item key='logout' icon={<LoginOutlined />} onClick={() => handleLogout()}>
              Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Content style={{ padding: '2% 2%' }}>
        {props.children}
      </Content>
    </>
  )
})

export default NavBar
