import React from 'react'
import {
    Form,
    Input,
    Icon,
    Row,
    Col,
    Card,
    Button,
    Typography
} from 'antd';
const { Title } = Typography;
const Settings = Form.create({
    name: 'step_one'
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

    /*    const compareToFirstPassword = (rule, value, callback) => {
          const { form } = this.props;
          if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
          } else {
            callback();
          }
        };
      
       const  validateToNextPassword = (rule, value, callback) => {
          const { form } = props;
          if (value ) {
            form.validateFields(['confirm'], { force: true });
          }
          callback();
        };*/
    return (
        <div>

            <Row>

                <Col xs={24} sm={24} md={24} lg={24} xl={24}   >
                    <Card bordered={false} style={{ width: '100%', backgroundColor: 'white' }} >

                        <Title style={{ textAlign: 'left', color: '#305c79' }} >Generale Settings</Title>

                        <Row>
                            <Form onSubmit={handleSubmit} >

                                <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
                                    <Col className="gutter-row" xs={20} sm={10} md={6} lg={6} xl={6}   >
                                        <Form.Item hasFeedback >
                                            {getFieldDecorator('username')(<Input
                                                placeholder="Enter your username"
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}

                                            />)}
                                        </Form.Item>
                                    </Col>
                                    <Col className="gutter-row" xs={20} sm={10} md={6} lg={6} xl={6}   >
                                        <Form.Item hasFeedback >
                                            {getFieldDecorator('email')(<Input
                                                placeholder="your Email"
                                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
                                    <Col className="gutter-row" xs={20} sm={10} md={6} lg={6} xl={6}    >
                                        <Form.Item hasFeedback>
                                            {getFieldDecorator('password', {
                                                rules: [

                                                    {
                                                        //{validator: validateToNextPassword,}
                                                    },
                                                ],
                                            })(<Input.Password
                                                placeholder="Enter your password" />)}
                                        </Form.Item>
                                    </Col>
                                    <Col className="gutter-row" xs={20} sm={10} md={6} lg={6} xl={6}  >
                                        <Form.Item hasFeedback>
                                            {getFieldDecorator('confirm', {
                                                rules: [
                                                    {

                                                        message: 'Please confirm your password!',
                                                    },
                                                    {
                                                        // {validator: compareToFirstPassword,}
                                                    },
                                                ],
                                            })(<Input.Password placeholder="Confirm your password" />)}
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item style={{ textAlign: 'left' }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit">
                                        Save Changes
                            <Icon type="right" />
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Row>
                    </Card>
                </Col>

            </Row>
        </div>
    )
}
)

export default Settings
