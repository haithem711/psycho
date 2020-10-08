import React from 'react'
import {
    Form,
    Input,
    Icon, 
    Button,
    Select
} from 'antd';
import {countries} from '../../../../tools/countries'

const ContactInformation = Form.create({
    name: 'Contact-info'
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
        <Form onSubmit={handleSubmit} >
            <Form.Item hasFeedback style={{ width: '22rem' }}>
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
            <Form.Item hasFeedback style={{ width: '22rem' }} >
                {getFieldDecorator('State')(<Input
                    placeholder="State/Province"
                />)}
            </Form.Item>
            <Form.Item hasFeedback style={{ width: '22rem' }}>
                {getFieldDecorator('City')(<Input
                    placeholder="City*"
                />)}
            </Form.Item>

            <Form.Item hasFeedback style={{ width: '22rem' }} >
                {getFieldDecorator('Street')(<Input
                    placeholder="Street*"
                />)}
            </Form.Item>
            <Form.Item hasFeedback style={{ width: '22rem' }}>
                {getFieldDecorator('ZipCode')(<Input
                    placeholder="ZipCode*"
                />)}
            </Form.Item>
            <Form.Item hasFeedback style={{ width: '22rem' }} >
                {getFieldDecorator('AlternativeEmail')(<Input
                    placeholder="Alternative Email"
                />)}
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

export default ContactInformation
