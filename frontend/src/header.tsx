import React from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'

const { SubMenu } = Menu

const NavBar = () => {
  return (
    <Menu theme='dark' onClick={(e) => { console.log('e.key', e.key) }} selectedKeys={['mail']} mode='horizontal' style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Menu.Item key='mail' icon={<MailOutlined />}>
        Navigation One
      </Menu.Item>
      <Menu.Item key='app' icon={<AppstoreOutlined />}>
        Navigation Two
      </Menu.Item>
      <SubMenu key='SubMenu' icon={<SettingOutlined />} title='Navigation Three - Submenu'>
        <Menu.ItemGroup title='Item 1'>
          <Menu.Item key='setting:1'>Option 1</Menu.Item>
          <Menu.Item key='setting:2'>Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title='Item 2'>
          <Menu.Item key='setting:3'>Option 3</Menu.Item>
          <Menu.Item key='setting:4'>Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      {/* <Menu.Item key='alipay'>
        <a href='https://ant.design' target='_blank' rel='noopener noreferrer'>
          Navigation Four - Link
        </a>
      </Menu.Item> */}
    </Menu>

  )
}

export default NavBar
