import React from 'react'
import { connect } from "react-redux";
import { Typography } from 'antd';
const { Title } = Typography;
const FavoriteAdvisors = () => {
    const [advisors]=React.useState({})
    
   
    return (
        <div>
            <h1>FavoriteAdvisors</h1>
           { advisors.total=== undefined ? <div>
            <Title style={{ textAlign: 'left', color: '#305c79' }} >Save your favorite advisors</Title>
            <p style={{width:'280px',color:'black',marginBottom:'20px'}}>Favorites will help you find the perfect expert and always keep in touch with him</p>
        </div> :
        <h1>advisors</h1>}
        </div>
    )
}



const mapStateToProps = reduxStore => {
    return {
      user: reduxStore.authReducer.user,
      isLoggedIn: reduxStore.authReducer.isLoggedIn,
      advisors:reduxStore.advisorsReducer.advisors
    };
  };
export default (connect(mapStateToProps)(FavoriteAdvisors))
