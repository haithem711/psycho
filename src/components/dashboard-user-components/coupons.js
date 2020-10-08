import React from 'react'
import { Typography } from 'antd';
const { Title } = Typography;
const Coupons = () => {
    return (
        <div>
           <p style={{fontSize:'2rem',fontWeight:'bold'}}>Coupons</p> 
           <div  style={{ padding: '24px', color: '#305c79',fontSize:'1.5rem' }}>
           <Title style={{ textAlign: 'left', color: '#305c79' }} >You have 1 Coupon</Title>
        </div>
        </div>
    )
}

export default Coupons
