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
    Select
} from 'antd';
import {countries} from '../../../../tools/countries'
const { Title } = Typography;
const ContactInfo = Form.create({
    name: 'ContactInfo'
})(props => {
    const { getFieldDecorator } = props.form;
    const [selectedItem]=React.useState([])
    const filteredOptions = countries.filter(o => !selectedItem.includes(o));
    
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

            }
        });
    };


    return (
        <Row>
         <Col xs={24} sm={24} md={24} lg={24} xl={24}  >
            <Card bordered={false}  style={{backgroundColor:'white' }}>

                <Title style={{ textAlign: 'left', color: '#305c79' }} >Contact Information</Title>

                <Row>
                    <Form onSubmit={handleSubmit} >
                        <Row  gutter={{ sm: 16, md: 24, lg: 16 }}>
                            <Col className="gutter-row" xs={20} sm={10} md={6} lg={6} xl={6} >
                                <Form.Item hasFeedback>
                                    {getFieldDecorator("nationality")(<Select
                                        showSearch={true} placeholder="select country">
                                        {filteredOptions.map(item => (
                                            <Select.Option key={item} value={item}>
                                                {item}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" xs={20} sm={10} md={6} lg={6} xl={6}  >
                                <Form.Item hasFeedback >
                                    {getFieldDecorator('State')(<Input
                                        placeholder="State/Province"
                                    />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row  gutter={{ sm: 16, md: 24, lg: 16 }}>
                            <Col className="gutter-row"  xs={20} sm={10} md={6} lg={6} xl={6}  >
                                <Form.Item hasFeedback >
                                    {getFieldDecorator('City')(<Input
                                        placeholder="City*"
                                    />)}
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" xs={20} sm={10} md={6} lg={6} xl={6}  >
                                <Form.Item hasFeedback >
                                    {getFieldDecorator('Street')(<Input
                                        placeholder="Street*"
                                    />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row  gutter={{ sm: 16, md: 24, lg: 16 }}>
                            <Col className="gutter-row"  xs={20} sm={10} md={6} lg={6} xl={6}   >
                                <Form.Item hasFeedback >
                                    {getFieldDecorator('ZipCode')(<Input
                                        placeholder="ZipCode*"
                                    />)}
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" xs={20} sm={10} md={6} lg={6} xl={6}   >
                                <Form.Item hasFeedback >
                                    {getFieldDecorator('AlternativeEmail')(<Input
                                        placeholder="Alternative Email"
                                    />)}
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
    )
}
)
export default ContactInfo
