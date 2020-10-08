import React from 'react'
import {
    Form,
    Input,
    Icon,
    Checkbox,
    Col,
    Card, Row,
    Button,
    Typography,
    Select, Upload, Modal
} from 'antd';
const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;
const EditProfile = Form.create({
    name: 'edit-profile-advisors'
})(props => {
    const { getFieldDecorator } = props.form;
    const [visible, setVisible] = React.useState(false)
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }
    const handleOk = () => {

    };

    const handleCancel = e => {
        setVisible(false)
    };
    const showModal = () => {
        setVisible(true)
    };
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 3 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
    };

    return (
        <Form {...formItemLayout} onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          <Row >
       <Col  xs={24} sm={20} md={20} lg={20} >
            <Form.Item  hasFeedback label="Full Name" >
                {getFieldDecorator('fullname')(<Input
                    placeholder="full name"
                />)}
            </Form.Item>
            <Form.Item label="Select" hasFeedback>
                {getFieldDecorator('select')(
                    <Select placeholder="Horoscopes">
                        <Option value="Indien Astrology">Indien Astrology</Option>
                        <Option value="Karmlc Astrology">Karmlc Astrology</Option>
                        <Option value="Vedlc Astrology">Vedlc Astrology</Option>
                        <Option value="Chinese Astrology">Chinese Astrology</Option>
                        <Option value="Numerology">Numerology</Option>
                        <Option value="Natal Chart Readlng">Natal Chart Readlng</Option>
                        <Option value="Horoscopes">Horoscopes</Option>
                    </Select>,
                )}
            </Form.Item>
            <Form.Item hasFeedback label="About" >
                {getFieldDecorator('about')(<TextArea
                    placeholder="Autosize height with minimum and maximum number of lines"

                />)} <p>Tell our customers about the services you are offering them (150 - 500 words)</p>
            </Form.Item>
            <Form.Item hasFeedback label="Experience" >
                {getFieldDecorator('experience')(<TextArea 
                    placeholder="Autosize height with minimum and maximum number of lines"

                />)} <p>Tell our customers about your previous relevant experience as a psychic reader (150 - 500 words)</p>
            </Form.Item>
            <Form.Item    hasFeedback label="Chat start greeting">
                {getFieldDecorator('chat-start')(<TextArea 
                    placeholder="click to edit"
                />)} <p>Tell our customers about your previous relevant experience as a psychic reader (150 - 500 words)</p>
            </Form.Item>
            <Form.Item hasFeedback label="My Specialties" >
                {getFieldDecorator('Specialties')(<Input
                    placeholder="My Specialties"
                />)}
                < Button style={{ marginRight: '20px' }} type="primary" onClick={showModal}>
                    Edit Specialities
                    </Button>
                <Modal
                    title=" Edit Prices"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="Career Advice">Career Advice
                                
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="Dream Analysis">Dream Analysis</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="Psychic Reading">Psychic Reading</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="Love & Relationships"><strong> Love & Relationships</strong>
                                <Checkbox value="Relationship Advice">Relationship Advice</Checkbox>
                                <Checkbox value="Soulmates">Soulmates</Checkbox>
                                </Checkbox>

                            </Col>
                            <Col span={8}>
                                <Checkbox value="Clairvoyance">Clairvoyance</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="Astrology & Horoscopes">Astrology & Horoscopes</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="Tarot Readers">Tarot Readers</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>



                </Modal>
            </Form.Item>    
           </Col>
           <Col  xs={24} sm={4} md={4} lg={4} lg={{pull:11}}  >
            <Form.Item>
                <img style={{ height: '150px', width: '150px', borderRadius: '75px' }} src='https://images.unsplash.com/photo-1587653666447-8a232c92e881?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='photo' />
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('image', {
                    valuePropName: 'file',

                })(<Upload listType="picture">
                    <Button style={{ marginTop: '10px' }}>
                        <Icon type="upload" /> Click to Update
               </Button>
                </Upload>)}
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
    )
}
)
export default EditProfile

