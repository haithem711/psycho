import React from 'react'
import { Typography } from 'antd';
const { Title } = Typography;
const Coupons = () => {
    return (
        <div>
           <h1>Coupons</h1> 
           <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
           <Title style={{ textAlign: 'left', color: '#305c79' }} >You have 1 Coupon</Title>
        </div>
        </div>
    )
}

export default Coupons
