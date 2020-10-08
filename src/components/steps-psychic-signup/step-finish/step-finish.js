import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Icon,
  Typography ,
  Row,
  Col,
  Card ,
  Button,
  Checkbox
 } from 'antd';
import "./step-finish.scss";
const { Title } = Typography;
class StepFin extends React.Component {
  state = {
      agreement:false
  };
 handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.handleConfirmButton(values)
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
      const { getFieldDecorator } = this.props.form;
    return (     
          <Card bordered={false}style={{height:' 80vh'}} >
            <Title style={{ textAlign: 'left', color: '#305c79' }} >Sign Up as Psychic</Title>         
              <Form onSubmit={this.handleSubmit} className="signupform">
               <Form.Item>
                  <p>Have you had previous experience as a advisor for other psychic service providers?</p>
                </Form.Item>
                <Form.Item >
                  {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                  })(
                    <Checkbox value={false}  >
                      I have read the <a href="/#">agreement</a>
                    </Checkbox>,
                  )}
                </Form.Item>
                <Form.Item>
                  <p>*  By submitting your application,
                 you are granting us permission to forward your contact information to one of our evaluators.</p>
                  <p>** Your application will be considered exclusively for an independent contractor position with Zodiac Psychics, not for a position as an employee.</p>
                </Form.Item>
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
                  <Col className="gutter-row" xs={10} sm={10} md={10} lg={10} xl={10}    >
                    <Form.Item style={{ textAlign: 'left' }}>
                      <Button
                        style={{ width: '100px' }}
                        size={"large"}
                        type="primary"
                        htmlType="submit"
                        className="signup-form-button"

                      >
                        Apply
                     </Button>

                    </Form.Item>
                  </Col>
                </Row>
              </Form>           
          </Card>    
    );
  }
}
const StepFinish = Form.create({ name: 'signup-form4' })(StepFin);

const mapStateToProps = () => {
  return {
    
  };
};

export default connect(mapStateToProps)(StepFinish)