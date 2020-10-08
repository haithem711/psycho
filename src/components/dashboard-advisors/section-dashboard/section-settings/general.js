import React from 'react'
import {
    Form,
    Input,
    Icon,
    Button,
    Checkbox,
    DatePicker
} from 'antd';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const General =  Form.create({
    name: 'general-setting'
})(props => {
    const { getFieldDecorator } = props.form;
        const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
   const compareToFirstPassword = (rule, value, callback) => {
        const { form } = props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
   const   validateToNextPassword = (rule, value, callback) => {
        const { form } = props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };
    return (
       <Form onSubmit={handleSubmit}  >
            <Form.Item hasFeedback label="Phone Number" >
           
                     
                <PhoneInput
                    containerClass="my-container-class"
                    inputClass="my-input-class"
                    containerStyle={{
                       width: '10px'
                    }}
                    inputStyle={{
                        width: '22rem',
                        height: '40px',
                        borderRadius: '20px'
                    }} 
                />
            </Form.Item>
            <Form.Item hasFeedback style={{ width: '22rem'}}>
                {getFieldDecorator("birth_date")(<DatePicker placeholder="birth date" style={{ width: "100%" }} />)}
              </Form.Item>
         
            <Form.Item hasFeedback style={{ width: '22rem'}}>
                {getFieldDecorator('password', {
                    rules: [

                        {
                            validator: validateToNextPassword,
                        },
                    ],
                })(<Input.Password
                    placeholder="Enter your password" />)}
            </Form.Item>
            <Form.Item hasFeedback style={{ width: '22rem'}}>
                {getFieldDecorator('confirm', {
                    rules: [
                        {

                            message: 'Please confirm your password!',
                        },
                        {
                            validator: compareToFirstPassword,
                        },
                    ],
                })(<Input.Password placeholder="Confirm your password" />)}
            </Form.Item>
            <Form.Item hasFeedback style={{ width: '22rem'}} >
                {getFieldDecorator('email')(<Input
                  placeholder="your Email"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
              </Form.Item>
            <p>I want to receive emails:</p>
            <Form.Item >
                        {getFieldDecorator('newsLetettersAndHoroscopes', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox value={false}  >
                               When user send me a message or reply
                    </Checkbox>,
                        )}
                    </Form.Item>
                    <Form.Item >
                        {getFieldDecorator('specialOffers', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox value={false}  >
                              Zodiac Psychics psychics newsletetters
                    </Checkbox>,
                        )}
                    </Form.Item>
            <Form.Item style={{ textAlign: 'left' }}>
                <Button
                    type="primary"
                    htmlType="submit">
                    Save Changes
                            <Icon type="right" />
                </Button>
            </Form.Item>
        </Form>

    )
}
)

export default General
