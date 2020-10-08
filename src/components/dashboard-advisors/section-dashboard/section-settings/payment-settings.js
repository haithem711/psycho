import React from 'react'
import {
    Icon,
    Button,
    Row,
    Col,
    Input,
    DatePicker,
    Modal,
    Radio
} from 'antd';
const PaymentSettings = ()=>{
    const [visible, setVisible] = React.useState(false)
    const [editModal,setEditmodal]=React.useState(false)
    const [addmethode,setAddmethode]=React.useState(false)
    const [ value,setValue]=React.useState('payoneer')
    const showModal = () => {
        setVisible(true)
        setAddmethode(true)
        setEditmodal(false)
    };
    const showModalEdit = () => {
        setVisible(true)
        setEditmodal(true)
        setAddmethode(false)
    };
    const handleOk = () => {
     setVisible(false)
    };
    const handleCancel = e => {
        setVisible(false)
    };
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value)
      };
    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
               <h3> <strong>type =</strong>  Payonneer</h3>
                    <h3><strong>Minimal payment:</strong>  $75</h3>
                    <Icon style={{ fontSize:'20px',color:'#305c79',cursor:'pointer' }}  onClick={showModalEdit} type="edit" />
                    <Modal
                  title={ editModal ?  " Edit payment":  "Add new payment methode"}
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    {editModal ? ( 
                        <div style={{padding:'1rem'}}>
                     <p>The following payment methods are available to you based on your account's country and currency setting.</p>
                    <Radio.Group  style={{marginTop:'50px'}} onChange={onChange} >
                       <Radio value={"payoneer"}>Payoneer</Radio>
                       <Radio
                         value={"paypal"}>
                         Paypal
                  </Radio>
                     </Radio.Group>
                   <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
                     <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={10} >
                       
                       <Input style={{marginTop:'50px'}}
                           placeholder={value === "payoneer" ? 'Payoneer Id:*' : 'Paypal Id:*'}
                         />
                     </Col>
                   </Row>
                   </div>)
                    :addmethode &&(<div style={{padding:'1rem'}}>
                    <p>The following payment methods are available to you based on your account's country and currency setting.</p>
                   <Radio.Group  style={{marginTop:'50px'}} onChange={onChange} >
                      <Radio value={"payoneer"}>Payoneer</Radio>
                      <Radio
                        value={"paypal"}>
                        Paypal
                 </Radio>
                    </Radio.Group>
                  <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
                    <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={10}>
                    <Input style={{marginTop:'50px'}}
                          placeholder={value === "payoneer" ? 'Payoneer Id:*' : 'Paypal Id:*'}
                        />
                    </Col>
                  </Row>
                  </div>)}
               </Modal>
                    <Icon style={{ fontSize:'20px',color:'#305c79',cursor:'pointer' }} type="delete" />
               </div>
                < Button style={{ marginRight: '20px',marginTop:'30px' }} type="primary" onClick={showModal}>
                  Add new payment methode
                </Button>
               
            </div>
    )
}

export default PaymentSettings
