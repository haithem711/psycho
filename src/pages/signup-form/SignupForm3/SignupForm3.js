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
  Checkbox,
  Icon
 } from 'antd';
import "./SignupForm3.scss";
const { Title } = Typography;
class Signupform3 extends React.Component {
  state = {
   
    value: [],
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
 
 onChange(checkedValues) {
    console.log('checked = ', checkedValues);
    
  }
 render() {
     const { getFieldDecorator } = this.props.form;
      return (
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}  >
            <Card bordered={false} style={{ width: '100%' }}>
              <Title style={{ textAlign: 'left', color: '#305c79' }} >Sign Up as Psychic</Title>
              <Row>
                <Form onSubmit={this.handleSubmit} className="signupform">
                  <Form.Item>
                    <p>Have you had previous experience as a advisor for other psychic service providers?</p>
                  </Form.Item>
                  <Form.Item>
                  {getFieldDecorator('checked')(<Checkbox.Group onChange={this.onChange}>
                      <Row gutter={0}>
                        <Col span={12}>
                          <Checkbox value="Bitwine">Bitwine</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="Keen">Keen</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="Oranum">Oranum</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="Psychic Source">Psychic Source</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="Kasamba/LivePerson">Kasamba/LivePerson</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="The Circle">The Circle</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="I Prefer Not to Say">I Prefer Not to Say</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="I don’t remember the name">I don’t remember the name</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value="none">none</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>)}
                  </Form.Item>

                  <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
                    <Col className="gutter-row" xs={20} sm={10} md={10} lg={10} xl={10}  >
                      <Form.Item  >
                        {getFieldDecorator('other')(<Input
                          placeholder="other"
                        />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  <hr />
                  <Row gutter={{ sm: 16, md: 24, lg: 16 }}>
                    <Col className="gutter-row" xs={10} sm={10} md={10} lg={10} xl={10}    >
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
                          htmlType="submit"
                          onClick={this.handleSubmit}>
                          Go forward
                                 <Icon type="right" />
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Row>
            </Card>
          </Col>
        </Row>
    );
  }
}


const SignupForm3 = Form.create({ name: 'signup-form3' })(Signupform3);

const mapStateToProps = () => {
  return {
    
  };
};

export default connect(mapStateToProps)(SignupForm3)