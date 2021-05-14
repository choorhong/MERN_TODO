import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { DashboardOutlined, UserOutlined, SettingOutlined, LoginOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'

const { SubMenu } = Menu

const NavBar = () => {
  const { pathname } = useLocation()

  const [selectedKey, setSelectedKey] = useState('home')

  useEffect(() => {
    const paths = pathname.split('/')
    const key = paths[1] ? paths[1] : 'home'

    setSelectedKey(key)
  }, [pathname])

  return (
    <Menu theme='dark' selectedKeys={[selectedKey]} mode='horizontal' style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        <Menu.Item key='logout' icon={<LoginOutlined />}>
          Logout
        </Menu.Item>
      </SubMenu>
    </Menu>

  )
}

export default NavBar
