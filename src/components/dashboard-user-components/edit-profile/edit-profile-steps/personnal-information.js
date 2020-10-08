import React from 'react'
import {
    Form,
    Input,
    Icon,
    Row,
    Col,
    Card,
    Button,
    Typography,
    Select,
    DatePicker,   
} from 'antd';
import {horoscopes} from '../../../../tools/horoscope'
const { Option } = Select;
const { Title } = Typography;

const PersonnalInfo = Form.create({
    name: 'PersonnalInfo'
})(props => {
    const { getFieldDecorator } = props.form;
    const [selectedItem]=React.useState([])
    const filteredOptions = horoscopes.filter(o => !selectedItem.includes(o));
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

            }
        });
    };

    const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '216',
    })(
        <Select style={{ width: 70 }}>
            <Option value="216">+216</Option>
            <Option value="87">+87</Option>
        </Select>,
    )
    return (
        <div>

            <Row>

                <Col xs={24} sm={24} md={24} lg={24} xl={24}   >
                    <Card bordered={false} style={{ width: '100%', backgroundColor: 'white' }} >

                        <Title  style={{ textAlign: 'left', color: '#305c79',fontSize:'1.5rem' }} >Personal Information</Title>

                        <Row>
                            <Form onSubmit={handleSubmit} >

                                <Row gutter={{ sm: 16, md: 24, lg: 24 }}>
                                    <Col className="gutter-row" xs={20} sm={10} md={10} lg={6} xl={6}  >
                                        <Form.Item hasFeedback>
                                            {getFieldDecorator('firstname')(<Input
                                                placeholder="Enter your First Name"
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}

                                            />)}
                                        </Form.Item>
                                    </Col>
                                    <Col className="gutter-row" xs={20} sm={10} md={10} lg={6} xl={6}  >
                                        <Form.Item hasFeedback >
                                            {getFieldDecorator('lastname')(<Input
                                                placeholder="Enter your Last Name"
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}

                                            />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={{ sm: 16, md: 16, lg: 16 }}>
                                  <Col className="gutter-row" xs={20} sm={10} md={10} lg={6} xl={6}   >
                                        <Form.Item >
                                            {getFieldDecorator('phone')(<Input
                                                placeholder=" Phone number"
                                                addonBefore={prefixSelector}
                                                style={{ width: '100%' }} />)}
                                        </Form.Item>
                                            </Col>
                                    <Col className="gutter-row" xs={20} sm={10} md={10} lg={6} xl={6}   >
                                        <Form.Item hasFeedback>
                                            {getFieldDecorator("birth_date")(<DatePicker placeholder="birth date" style={{ width: "100%" }} />)}
                                        </Form.Item>
                                    </Col>
                                  
                                </Row>
                                <Row gutter={{ sm: 16, md: 16, lg: 16 }}>
                                <Col className="gutter-row" xs={20} sm={10} md={6} lg={6} xl={6} >
                                <Form.Item hasFeedback>
                                    {getFieldDecorator("horoscope")(<Select
                                        showSearch={true} placeholder="Horoscope">
                                        {filteredOptions.map(item => (
                                            <Select.Option key={item} value={item}>
                                                {item}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                    )}
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
export default PersonnalInfo
