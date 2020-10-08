import React from 'react'
import { Menu, Icon,Dropdown } from 'antd';
import EditProfile from './section-dashboard/section-edit-profile'
import SectionSettings from './section-dashboard/section-settings'
import Chat from './section-dashboard/section-chat'
import SectionDashboard from './section-dashboard/section-dashboard'
import Articles from './section-dashboard/section-articles'
import Promote from './section-dashboard/section-promote'
import SendCoupons from './section-dashboard/section-send-coupons'
import './menu-dashboard.css'
const { SubMenu } = Menu;
const MenuDashboard = () => {
    const [current , setCurrent]=React.useState('1')
    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key)
      };
    const menu = (
        <Menu onClick={handleClick}defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"> <Icon type="appstore" />Dashboard</Menu.Item>
                    <Menu.Item key="2"> <Icon type="user" />Edit Profile</Menu.Item>
                    <Menu.Item key="3"> <Icon type="read" />Articles</Menu.Item>
                    <Menu.Item key="4"> <Icon type="wechat" /> Chats</Menu.Item>
                    <Menu.Item key="5"> <Icon type="setting" />Settings</Menu.Item>
                    <Menu.Item key="6"> <Icon type="mail" />Promote</Menu.Item>
                    <Menu.Item key="7"> <Icon type="notification" />Send Coupons</Menu.Item>
        </Menu>)
    return (
        <div style={{display:"flex "}}>
            <div style={{  width: '30%' }} className='menu-dashboard'>
                <Menu
                    onClick={handleClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    style={{ backgroundColor: '#f1f2f4', height: '100%', padding: '5rem' }}
                    mode="inline"
                >
                    <Menu.Item key="1"> <Icon type="appstore" />Dashboard</Menu.Item>
                    <Menu.Item key="2"> <Icon type="user" />Edit Profile</Menu.Item>
                    <Menu.Item key="3"> <Icon type="read" />Articles</Menu.Item>
                    <Menu.Item key="4"> <Icon type="wechat" /> Chats</Menu.Item>
                    <Menu.Item key="5"> <Icon type="setting" />Settings</Menu.Item>
                    <Menu.Item key="6"> <Icon type="mail" />Promote</Menu.Item>
                    <Menu.Item key="7"> <Icon type="notification" />Send Coupons</Menu.Item>
                </Menu>
                </div>
            <div className='dropdown-dashboard'>
            <Dropdown overlay={menu}  >
             <a className="ant-dropdown-link" >
             <Icon style={{fontSize:'30px'}} type="menu" />
              </a>
            </Dropdown>
           </div>
            <div style={{width:'100%'}}>
                {current === "1" ? <SectionDashboard /> :
                    current === "2" ? <EditProfile /> :
                        current === "3" ? <Articles/> :
                            current === "4" ?<Chat/>:
                              current==="5"   ?<SectionSettings/>:
                                 current==="6"?<Promote/>:
                                   current==="7"&&<SendCoupons/>}
            </div>
        </div>

    )
}

export default MenuDashboard
