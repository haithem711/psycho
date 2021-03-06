import React from 'react'
import { Menu, Icon } from 'antd';
import Settings from './edit-profile-steps/setting'
import PersonnalInfo from './edit-profile-steps/personnal-information'
import EmailSetting from './edit-profile-steps/email-setting'
import ContactInfo from './edit-profile-steps/contact-info'
const EditProfile = () => {
    const [current , setCurrent]=React.useState('1')
     const  handleClick = e => {
        console.log('click ', e);
       setCurrent(e.key)
       console.log(current)
      };
    return (
      <div>
        <p style={{fontSize:'2rem',fontWeight:'bold'}}>Edit Profile</p>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="1" >
            <Icon type="mail" />
          General Settings
        </Menu.Item>
          <Menu.Item key="2" >
            <Icon type="appstore" />
          Personal Information
        </Menu.Item>
          <Menu.Item key="3" >
            <Icon type="appstore" />
          Contact Information
        </Menu.Item>
          <Menu.Item key="4" >
            <Icon type="appstore" />
          Email settings
        </Menu.Item>
        </Menu>
        {  current === "1" ? <Settings /> :
          current === "2" ? <PersonnalInfo /> :
            current === "3" ? <ContactInfo /> :
              current === "4" && <EmailSetting />}
      </div>
    )
}

export default EditProfile
