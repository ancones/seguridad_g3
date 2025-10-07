import React from 'react';
import { Tabs } from 'antd';
const onChange = (key) => {
  console.log(key);
};
const Tab = ({ items, onKeyChange, activeKey}) => {
  return (
    <>
      <Tabs 
        defaultActiveKey="1"
        type='card'
        items={items}
        activeKey={activeKey}
        onChange={onKeyChange}
      />
    </>
  )
}
  
export default Tab;