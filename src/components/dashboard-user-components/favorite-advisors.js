import React from 'react'
import { connect } from "react-redux";
import { Typography } from 'antd';
const { Title } = Typography;
const FavoriteAdvisors = () => {
    const [advisors]=React.useState({})
    
   
    return (
        <div>
            <p style={{fontSize:'2rem',fontWeight:'bold'}}>Favorite Advisors</p>
           { advisors.total=== undefined ? <div style={{padding:'2rem'}}>
            <Title style={{ textAlign: 'left', color: '#305c79',fontSize:'2rem' }} >Save your favorite advisors</Title>
            <p style={{width:'280px',color:'black',marginBottom:'20px'}}>Favorites will help you find the perfect expert and always keep in touch with him</p>
        </div> :
        <h1>advisors</h1>}
        </div>
    )
}




export default (connect()(FavoriteAdvisors))
