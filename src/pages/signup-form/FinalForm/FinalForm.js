import React, { Component } from 'react';
import { Steps, Row,Col } from 'antd';
import SignupForm from '../SignupForm/SignupForms'
import SignupForm1 from '../SignupForm1/SignupForm1';
import SignupForm2 from '../SignupForm2/SignupForm2';
import SignupForm3 from '../SignupForm3/SignupForm3'
import SignupForm4 from '../SignupForm4/SignupForm4'

const { Step } = Steps;
class FinalForms extends Component {
    state = {
        step: 1,
     
        show_final_values: false
    }

    handleNextButton = () => {
        const { step } = this.state;
        this.setState({step: step+1});
    }
    
    handleBackButton = () => {
        const { step } = this.state;
        this.setState({step: step-1})
    }

    handleConfirmButton = (values) => {
        const { step_final_fields } = this.state;
        this.setState({ step_final_fields: {
            ...step_final_fields,
            ...values
        }}, () => this.setState({show_final_values: true}, () => console.log(this.state)));
    }

    getFinalStepValue = (values) => {
        const { step_final_fields } = this.state;
        this.setState({ step_final_fields: {
            ...step_final_fields,
            ...values
        }});
    }

    getStepOneValue = (values) => {
        const { step_one_fields } = this.state;
        console.log(values);
        this.setState({step_one_fields: {
            ...step_one_fields,
            ...values,
           
        }})
    }

    getStepTwoValue = (values) => {
        const { step_two_fields } = this.state;
        this.setState({step_two_fields: {
            ...step_two_fields,
            ...values
        }})
    }
    getStepThreeValue = (values) => {
        const { step_three_fields } = this.state;
        this.setState({step_three_fields: {
            ...step_three_fields,
            ...values
        }})
    }
    getStepfourValue = (values) => {
        const { step_four_fields } = this.state;
        this.setState({step_four_fields: {
            ...step_four_fields,
            ...values,
            
        }})
    }

    render() {
        const { step, step_one_fields, step_two_fields,step_three_fields, step_four_fields, step_final_fields } = this.state;
        if (step === 1) {
            return (

                <div style={{width: '100%',backgroundColor: '#f1f2f4' }}>
                    <Row type="flex" justify="start">
                        <Col push={2} >
                            <Steps progressDot current={0} direction="vertical" >
                                <Step title="In Progress" description="Contact details" />
                                <Step title="Waiting" description="Address" />
                                <Step title="Waiting" description="Payment Information" />
                                <Step title="Waiting" description="Professional information" />
                                <Step title="Waiting" description="Finish" />
                            </Steps>
                        </Col>
                        <Col lg={{ push: 4 }} xl={{ push: 4 }}>
                            <SignupForm {...step_one_fields} handleNextButton={this.handleNextButton} submittedValues={this.getStepOneValue} />
                        </Col>
                    </Row>,
                </div>
            );
        }
        else if (step === 2) {
            return (
                <div style={{ backgroundColor: '#f1f2f4', width: '100%' }}>
                    <Row type="flex" justify="start">
                        <Col push={2}>
                            <div>
                                <Steps progressDot current={1} direction="vertical">
                                    <Step title="Finished" description="Contact details" />
                                    <Step title="In Progress" description="Address" />
                                    <Step title="Waiting" description="Payment Information" />
                                    <Step title="Waiting" description="Professional information" />
                                    <Step title="Waiting" description="Finish" />
                                </Steps>
                            </div>
                        </Col>
                        <Col lg={{ push: 4 }} xl={{ push: 4 }}>
                            <SignupForm1 {...step_two_fields} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getStepTwoValue} />
                        </Col>
                    </Row>
                </div>

            );
        }

        else if (step === 3) {
            return (
                <div style={{ backgroundColor: '#f1f2f4', width: '100%' }}>
                    <Row type="flex" justify="start">
                        <Col push={2}>
                            <Steps progressDot current={2} direction="vertical">
                                <Step title="Finished" description="Contact details" />
                                <Step title="Finished" description="Address" />
                                <Step title="In Progress" description="Payment Information" />
                                <Step title="Waiting" description="Professional information" />
                                <Step title="Waiting" description="Finish" />
                            </Steps>
                        </Col>
                        <Col lg={{ push: 4 }} xl={{ push: 4 }}>
                            <SignupForm2 {...step_three_fields} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getStepThreeValue} />
                        </Col>
                    </Row>
                </div>

            );
        }
        else if (step === 4) {
            return (
                <div style={{ backgroundColor: '#f1f2f4', width: '100%' }}>
                    <Row type="flex" justify="start">
                        <Col push={2}>
                            <Steps progressDot current={3} direction="vertical">
                                <Step title="Finished" description="Contact details" />
                                <Step title="Finished" description="Address" />
                                <Step title="Finished" description="Payment Information" />
                                <Step title="In Progress" description="Professional information" />
                                <Step title="Waiting" description="Finish" />
                            </Steps>
                        </Col>
                        <Col lg={{ push: 4 }} xl={{ push: 4 }}>
                            <SignupForm3 {...step_four_fields} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getStepfourValue} />
                        </Col>
                    </Row>
                </div>

            );
        }
        else {
            return (
                <div style={{ backgroundColor: '#f1f2f4', width: '100%' }}>
                    <Row type="flex" justify="start">
                        <Col push={2}>
                            <Steps progressDot current={4} direction="vertical">
                                <Step title="Finished" description="Contact details" />
                                <Step title="Finished" description="Address" />
                                <Step title="Finished" description="Payment Information" />
                                <Step title="Finished" description="Professional information" />
                                <Step title="In Progress" description="Finish" />
                            </Steps>
                        </Col>
                        <Col lg={{ push: 4 }} xl={{ push: 4 }}>
                            <div >
                                <SignupForm4 {...step_final_fields} handleConfirmButton={this.handleConfirmButton} handleBackButton={this.handleBackButton} submittedValues={this.getFinalStepValue} />
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

export default FinalForms;