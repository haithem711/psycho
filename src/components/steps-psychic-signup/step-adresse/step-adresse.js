import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Input,
  Typography ,
  Select,
  Row,
  Col,
  Card ,
  Button,
  Icon
 } from 'antd';
import { countries } from "../../../tools/countries";
import "./step-adresse.css";
const { Title } = Typography;
class StepAdresses extends React.Component {
    state = {
        selectedItems: [],
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
    render() {
        const { selectedItems } = this.state;
        const { getFieldDecorator } = this.props.form;
        const filteredOptions = countries.filter(o => !selectedItems.includes(o));
        return (
            <Card bordered={false} style={{height:' 80vh'}}>
                <Title style={{ textAlign: 'left', color: '#305c79' }} >Sign Up as Psychic</Title>
                <Form onSubmit={this.handleSubmit} className="signupform">
                    <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
                        <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={8}  >
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
                        <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={8}  >
                            <Form.Item hasFeedback >
                                {getFieldDecorator('State')(<Input
                                    placeholder="State/Province"
                                />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
                        <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={8}   >
                            <Form.Item hasFeedback >
                                {getFieldDecorator('City')(<Input
                                    placeholder="City*"
                                />)}
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={8}   >
                            <Form.Item hasFeedback >
                                {getFieldDecorator('Street')(<Input
                                    placeholder="Street*"
                                />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
                        <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={8}   >
                            <Form.Item hasFeedback >
                                {getFieldDecorator('ZipCode')(<Input
                                    placeholder="ZipCode*"
                                />)}
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={8}   >
                            <Form.Item hasFeedback >
                                {getFieldDecorator('AlternativeEmail')(<Input
                                    placeholder="Alternative Email"
                                />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <hr />
                    <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
                        <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={8}  >
                            <Form.Item style={{ textAlign: 'left' }}>
                                <Button
                                    type="primary"
                                    onClick={this.storeValues}>
                                    <Icon type="left" />
                                Go back
                               </Button>

                            </Form.Item>
                        </Col>
                        <Col className="gutter-row"xs={20} sm={10} md={10} lg={10} xl={8}    >
                            <Form.Item style={{ textAlign: 'left' }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={this.handleSubmit}>
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
const StepAdresse = Form.create({ name: 'signup-form1' })(StepAdresses);
const mapStateToProps = () => {
  return {
    
  };
};

export default connect(mapStateToProps)(StepAdresse)