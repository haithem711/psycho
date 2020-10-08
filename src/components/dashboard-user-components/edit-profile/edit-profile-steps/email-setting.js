import React from 'react'
import {
    Form,
    Row,
    Typography,
    Checkbox,
    Button,
    Icon
} from 'antd';
const { Title } = Typography;
const EmailSetting = Form.create({
    name: 'EmailSetting'
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
    return (
        <div>
            <Title  style={{ textAlign: 'left', color: '#305c79',fontSize:'1.5rem' }} >I want to receive emails:</Title>
            <Row>
                <Form onSubmit={handleSubmit} className="signupform">
                    <Form.Item >
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox value={false}  >
                                When advisor send me a message
                    </Checkbox>,
                        )}
                    </Form.Item>
                    <Form.Item >
                        {getFieldDecorator('gotAnswerToPost', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox value={false}  >
                                When I've got answer to posted requests
                    </Checkbox>,
                        )}
                    </Form.Item>
                    <Form.Item >
                        {getFieldDecorator('newsLetettersAndHoroscopes', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox value={false}  >
                                Zodiac Psychics newsletetters and horoscopes
                    </Checkbox>,
                        )}
                    </Form.Item>
                    <Form.Item >
                        {getFieldDecorator('specialOffers', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox value={false}  >
                                Zodiac Psychics special offers, promotional emails and coupons
                    </Checkbox>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <p>
                            Even if you turn off all notifications, we may sometimes need to email you important notices about your account.
                        </p>
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
            </Row>

        </div>
    )
}
)
export default EmailSetting
