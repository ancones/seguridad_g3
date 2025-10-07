import React from 'react';
import { Outlet, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { Layout, Button, theme } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd';
import Logo from './Logo'
import MenuList from './MenuList'
import ToggleThemeButton from './ToggleThemeButton'
import useAuth from '../../../hooks/useAuth';
import useLogout from "../../../hooks/useLogout";

const { Header, Sider, Content, Footer } = Layout

function LayoutAuth() {
  const navigate = useNavigate();
  const logout = useLogout()
  const signOut = async () => {
    // if used in more components, this should be in context 
    // axios to /logout endpoint 
    navigate('/linkpage');
    await logout()
}

  const { auth } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [darkTheme, setDarkTheme] = useState(true)
  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <>
    <Layout hasSider > 
      <Sider 
        className='sidebar-menu' 
        collapsed = {collapsed}
        collapsible
        trigger={null}
        theme={darkTheme? 'dark': 'light'}
        style={{ position: 'fixed'}}
      > 
        <Logo />
        <MenuList darkTheme={darkTheme}/>
        <ToggleThemeButton 
          darkTheme={darkTheme}
          toggleTheme={toggleTheme}
        />
      </Sider>
      <Layout
        className={`content-main ${collapsed ? 'content-collapsed' : ''}`}
      >
        <Header
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 0, 
            background: colorBgContainer
          }}
        >
          
          <Button
            className='toggle'
            onClick={() => setCollapsed(!collapsed)}
            type='text'
            icon={collapsed? <MenuUnfoldOutlined />: <MenuFoldOutlined />} 
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingRight: '1rem',
              gap: '1em'
            }}
          >
            <Avatar shape="square" icon={<UserOutlined />} />
            <h1> { auth? auth.user : "-" } </h1>
            <Button
              onClick={signOut}
              type='text'
              icon={<PoweroffOutlined />} 
            />
          </div>
          
        </Header>
        <Content style={{ margin: '24px 16px 16px', overflow: 'initial'}}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: '100%',
              overflowY: 'auto'
            }}
          >
            <Outlet />
            {/* <p>long content</p>
            {
              // indicates very long content
              Array.from({ length: 10 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? 'more' : '...'}
                  <br />
                </React.Fragment>
              ))
            } */}
          </div>
        </Content>
        
      </Layout>
    </Layout>
    </>
  )
}

export default LayoutAuth