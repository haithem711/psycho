import React from 'react'
import { Card } from 'antd';
const { Meta } = Card;
const Articles = () => {
    return (
        <div style={{display:"flex",justifyContent:'space-arround',flexWrap:'wrap'}}>
        <Card
    hoverable
    style={{ width: 280,margin:'20px 20px 20px 20px' }}
    cover={<img style={{height:'200px'}} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="We all want to meet that special someone, whether you believe in soulmates or not. Everyone wants to meet the 
    one person that fits us like a glove. You can call it soulmates, twin flames, " />
  </Card>
  <Card
    hoverable
    style={{ width: 280,margin:'20px 20px 20px 20px' }}
    cover={<img style={{height:'200px'}} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="We all want to meet that special someone, whether you believe in soulmates or not. Everyone wants to meet the one person that fits us like 
    a glove. You can call it soulmates, twin flames, " />
  </Card>
  <Card
    hoverable
    style={{ width: 280,margin:'20px 20px 20px 20px'}}
    cover={<img style={{height:'200px'}} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="We all want to meet that special someone, whether you believe in soulmates or not. Everyone wants to meet the
     one person that fits us like a glove. You can call it soulmates, twin flames, " />
  </Card>
  <Card
    hoverable
    style={{ width: 280,margin:'20px 20px 20px 20px'}}
    cover={<img style={{height:'200px'}} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="We all want to meet that special someone, whether you believe in soulmates or not. Everyone wants to meet the one person that fits 
    us like a glove. You can call it soulmates, twin flames, " />
  </Card>
        </div>
    )
}

export default Articles
