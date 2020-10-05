import React from 'react'
import EditProfile from "./EditProfile/EditProfile"
import Balance from "./Balance/Balance"
import Coupons from "./Coupons/Coupons"
import FavoriteAdvisors from "./FavoriteAdvisors/FavoriteAdvisors"
import { Anchor,Row,Col  } from 'antd';
const { Link } = Anchor;



const Dashboard = () => {
 
    return (
       
      <div style={{ width: '100%' }}>
        <Row  >
        <Col className="gutter-row" xs={20} sm={4} md={4} lg={4} xl={4}  >
        <Anchor affix={false} offsetTop={100}  style={{ marginLeft: '10px' }}>
            <Link href="#Balance" title="Balance" />
            <Link href="#EditProfile" title="EditProfile" />
            <Link href="#Coupons" title="Coupons" />
            <Link href="#FavoriteAdvisors" title="FavoriteAdvisors" />
          </Anchor>
        </Col>

        <Col className="gutter-row" xs={20} sm={20} md={20} lg={20} xl={20}  >
          <div style={{ height: '100%', position: 'absolute', borderLeft: '1px solid black' }}></div>
          <div id="Balance" style={{ marginLeft: '10px' }}>
            <Balance />
          </div>
          <hr />
          <div id="EditProfile" style={{ marginLeft: '10px' }} >
            <EditProfile />
          </div>
          <hr />
          <div id="Coupons" style={{ marginLeft: '10px' }}>
            <Coupons />
          </div>
          <hr />
          <div id="FavoriteAdvisors" style={{ marginLeft: '10px' }}>
            <FavoriteAdvisors />
          </div>
        </Col>
        </Row>
      </div>
    );
  
}

export default Dashboard
