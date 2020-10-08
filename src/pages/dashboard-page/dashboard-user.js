import React from 'react'
import EditProfile from "../../components/dashboard-user-components/edit-profile/edit-profile"
import Balance from "../../components/dashboard-user-components/balance/balance"
import Coupons from "../../components/dashboard-user-components/coupons"
import FavoriteAdvisors from "../../components/dashboard-user-components/favorite-advisors"
import { Anchor,Row,Col  } from 'antd';
import "./dashboard-user.css"
const { Link } = Anchor;
const Dashboard = () => {
   return (       
     <div style={{ width: '100%' }}>
       <Row>
         <Col className="gutter-row" xs={20} sm={4} md={4} lg={4} xl={4}  >
           <Anchor affix={false} offsetTop={100} className='anchor-dashboard'>
             <Link href="#balance" title="Balance" />
             <Link href="#edit-profile" title="Edit Profile" />
             <Link href="#coupons" title="Coupons" />
             <Link href="#favorite-advisors" title="Favorite Advisors" />
           </Anchor>
         </Col>
         <Col className="gutter-row" xs={20} sm={20} md={20} lg={20} xl={20}  >
           <div id="balance" style={{ marginLeft: '10px' }}>
             <Balance />
           </div>
           <hr />
           <div id="edit-profile" style={{ marginLeft: '10px' }} >
             <EditProfile />
           </div>
           <hr />
           <div id="coupons" style={{ marginLeft: '10px' }}>
             <Coupons />
           </div>
           <hr />
           <div id="favorite-advisors" style={{ marginLeft: '10px' }}>
             <FavoriteAdvisors />
           </div>
         </Col>
       </Row>
     </div>
    );
  
}

export default Dashboard
