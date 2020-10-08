import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Input,
  Icon,
  Typography ,
  Select,
  Row,
  Col,
  Card ,
  Button,
  DatePicker 
} from 'antd';
import "./step-contact-details.css";
import {tel} from "../../../tools/numPrefix"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const { Title } = Typography;
class StepContactDetail extends React.Component {
  state = {
    selectedItems: [],
    phone:''
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
 compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
render() {
    const { selectedItems } = this.state;
    const { getFieldDecorator } = this.props.form;
    const filteredOptions = tel.filter(o => !selectedItems.includes(o))
   return (
      <Card bordered={false} style={{height:' 80vh'}} >
        <Title style={{ textAlign: 'left', color: '#305c79' }} >Sign Up as Psychic</Title>
        <Form onSubmit={this.handleSubmit} >
          <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
            <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={8}  >
              <Form.Item hasFeedback>
                {getFieldDecorator('firstname')(<Input
                  placeholder="Enter your First Name"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}

                />)}
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={8}  >
              <Form.Item hasFeedback >
                {getFieldDecorator('lastname')(<Input
                  placeholder="Enter your Last Name"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}

                />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
            <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={8}   >
              <Form.Item hasFeedback >
                {getFieldDecorator('username')(<Input
                  placeholder="Enter your username"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}

                />)}
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={8}   >
              <Form.Item hasFeedback >
                {getFieldDecorator('email')(<Input
                  placeholder="your Email"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
            <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={8}    >
              <Form.Item hasFeedback>
                {getFieldDecorator('password', {
                  rules: [

                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input.Password
                  placeholder="Enter your password" />)}
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={8}  >
              <Form.Item hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {

                      message: 'Please confirm your password!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input.Password placeholder="Confirm your password" onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col className="gutter-row" xs={20} sm={20} md={20} lg={20} xl={20} >
            <Form.Item hasFeedback>
              {getFieldDecorator('phone') ( <PhoneInput
               containerClass="my-container-class"
               inputClass="my-input-class"
               containerStyle={{
                
                width:'10px'
               }}
               inputStyle={{
                width:'21rem',
                height:'32px',
                borderRadius:'20px'
              }}  country={'tn'}
                
               /> )}
              
              </Form.Item>
             
            </Col>
           {/* <Col className="gutter-row" xs={16} sm={10} md={10} lg={10} xl={8}   >
              <Form.Item >
                {getFieldDecorator('phone')(<Input
                  placeholder=" Phone number"
                  style={{ width: '100%' }} />)}
              </Form.Item>
                </Col>*/}
                <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={8}   >
              <Form.Item hasFeedback>
                {getFieldDecorator("birth_date")(<DatePicker placeholder="birth date" style={{ width: "100%" }} />)}
              </Form.Item>
            </Col>
          </Row>
         
            
         
          <Form.Item>
            <p>- All Fields are required</p>
            <p>- We will contact you by email, so please provide an email address that you have access to</p>
          </Form.Item>
          <Form.Item style={{ textAlign: 'left' }}>
            <Button
              type="primary"
              htmlType="submit">
              Go forward
             <Icon type="right" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
       

    );
  }
}


const StepContactDetails = Form.create({ name: 'signup-form' })(StepContactDetail);

const mapStateToProps = () => {
  return {

  };
};

export default connect(mapStateToProps)(StepContactDetails)