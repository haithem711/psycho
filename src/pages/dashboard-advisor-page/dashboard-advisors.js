import React from 'react'
import { Layout ,Checkbox,Menu,  Icon } from 'antd';
import MenuDashboard from "../../components/dashboard-advisors/menu"
import './dashboard-advisors.css'
const { Header, Content, Footer, Sider } = Layout;
const DashboardAdvisors = () => {
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }
     
      
    return (
        <div style={{ width: '100%' }}>
            <div style={{ height: '40px', display: 'flex', justifyContent: 'flex-end ', marginTop: '25px', marginRight: '30px' }}>
                <Checkbox style={{ marginTop: '7px', marginLeft: '10px' }} onChange={onChange}>I'm available now</Checkbox>
                <h1 style={{  marginRight: '10px' }}>00.00$</h1>
                <img style={{ height: '40px', width: '40px', borderRadius: '20px',marginTop:'-7px' }} src='https://images.unsplash.com/photo-1562345622-9c96107f7471?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='photo' />
            </div>
            <hr />
            <div>
                <MenuDashboard />
            </div>
        </div>
        
    )
}

export default DashboardAdvisors
