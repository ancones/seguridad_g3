import { Menu } from 'antd'
import { 
  HomeOutlined,
  AppstoreAddOutlined,
  AreaChartOutlined,
  RubyOutlined,
  BarsOutlined
 } from '@ant-design/icons'
import { Link } from "react-router-dom";

const MenuList = ({ darkTheme }) => {

  const subtaks = [
    {
      key: 'task1',
      icon: <AreaChartOutlined />,
      label: 'Task 1'
    },
    {
      key: 'task2',
      icon: <RubyOutlined />,
      label: 'Task 2'
    }
  ]
  const menuItems = [
    {
      key: 'home',
      path: '/',
      icon: <HomeOutlined />,
      label: 'Home'
    },
    ...(true ? [{
      key: 'activity',
      path: '/crear',
      icon: <AppstoreAddOutlined />,
      label: 'Crear'
    }] : []), // Si la condición es falsa, se añade un arreglo vacío
    {
      key: 'progress',
      path: '/dashboard',
      icon: <AreaChartOutlined />,
      label: 'Dashboard'
    },
    {
      key: 'tasks',
      icon: <BarsOutlined />,
      label: 'Tasks',
      /* children: subtaks */
    },
    {
      key: 'payment',
      icon: <RubyOutlined />,
      label: 'Payment'
    }
  ]

  return (
    <Menu 
      className='menu-bar' 
      theme={darkTheme? 'dark': 'light'}
      mode='inline'
      items={
        menuItems.map((l1_item, index) => {
          return {
            ...l1_item,
            label: <Link to={l1_item?.path}>{l1_item?.label}</Link>
          }
        })
      }
    />
  )
}

export default MenuList