import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Input,
  Typography ,
  Row,
  Col,
  Card ,
  Button,
  Radio,
  Icon
 } from 'antd';
import "./step-payment-information.scss";
const { Title } = Typography;
class StepPayments extends React.Component {
  state = {
   value: "payoneer",
  };
handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.submittedValues(values);
        this.props.handleNextButton();
      }
    });
  };
storeValues = () => {
    const { getFieldsValue } = this.props.form;
    const values = getFieldsValue();
    this.props.submittedValues(values);
    this.props.handleBackButton();
}
 onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
render() {
     const { getFieldDecorator } = this.props.form;
       return (       
             <Card bordered={false} style={{height:' 80vh'}}>
               <Title style={{ textAlign: 'left', color: '#305c79' }} >Sign Up as Psychic</Title>             
                 <Form onSubmit={this.handleSubmit} className="signupform">
                   <Form.Item>
                     <p>The following payment methods are available to you based on your account's country and currency setting.</p>
                   </Form.Item>
                   <Form.Item >
                     {getFieldDecorator("Paiement")(<Radio.Group onChange={this.onChange} >
                       <Radio value={"payoneer"}>Payoneer</Radio>
                       <Radio
                         value={"paypal"}>
                         Paypal
                  </Radio>
                     </Radio.Group>
                     )}
                   </Form.Item>
                   <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
                     <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={10} >
                       <Form.Item  >
                         {getFieldDecorator('id')(<Input
                           placeholder={this.state.value === "payoneer" ? 'Payoneer Id:*' : 'Paypal Id:*'}
                         />)}
                       </Form.Item>
                     </Col>
                   </Row>
                   <hr />
                   <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
                     <Col className="gutter-row" xs={10} sm={10} md={10} lg={10} xl={10}   >
                       <Form.Item style={{ textAlign: 'left' }}>
                         <Button
                           type="primary"
                           onClick={this.storeValues}>
                           <Icon type="left" />
                                Go back
                               </Button>
                       </Form.Item>
                     </Col>
                     <Col className="gutter-row" xs={10} sm={10} md={10} lg={10} xl={10}   >
                       <Form.Item style={{ textAlign: 'left' }}>
                         <Button
                           type="primary"
                           onClick={this.handleSubmit}
                           htmlType="submit">
                           Go forward
                                 <Icon type="right" />
                         </Button>
                       </Form.Item>
                     </Col>
                   </Row>
                 </Form>            
             </Card>         
    );
  }
}


const StepPayment = Form.create({ name: 'signup-form2' })(StepPayments);

const mapStateToProps = () => {
  return {
    
  };
};

export default connect(mapStateToProps)(StepPayment)