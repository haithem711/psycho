import React from 'react'
import { Menu, Icon } from 'antd';
import General from './section-settings/general'
import ContactInformation from './section-settings/contact-information'
import PaymentSettings from './section-settings/payment-settings'
import TaxForm from './section-settings/tax-form'
import PrivateMessage from './section-settings/private-message'
import Transactions from './section-settings/transactions'
const { SubMenu } = Menu;

const SectionSettings = () => {
    const [current , setCurrent]=React.useState('1')
    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key)
      };
    return (
           <div style={{width:'100%'}}>
             <div>
             <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="1" >
            <Icon type="mail" />
          General Settings
        </Menu.Item>
          <Menu.Item key="2" >
            <Icon type="appstore" />
            Contact Information
        </Menu.Item>
          <Menu.Item key="3" >
            <Icon type="appstore" />
          Payment Settings
        </Menu.Item>
          <Menu.Item key="4" >
            <Icon type="appstore" />
            Transactions
        </Menu.Item>
        <Menu.Item key="5" >
            <Icon type="appstore" />
          Private Messages
        </Menu.Item>
        <Menu.Item key="6" >
            <Icon type="appstore" />
          Tax Form
        </Menu.Item>
            </Menu>
            </div>
            <div style={{width:'60%',padding:'2rem'}}>
            {  current === "1" ? <General />: 
               current===  "2"? <ContactInformation/>:
               current==="3"?<PaymentSettings/>:
               current==="4"?<Transactions/>:
               current==="5"?<PrivateMessage/>:
                current==="6"&&<TaxForm/>}
            </div>
          </div>
    )
}

export default SectionSettings
