import React, { Component } from 'react';
import { Steps } from 'antd';
import StepContactDetails from '../../components/steps-psychic-signup/step-contact-details/step-contact-details';
import StepAdresse from '../../components/steps-psychic-signup/step-adresse/step-adresse';
import StepPayment from '../../components/steps-psychic-signup/step-payment-information/step-payment-information';
import StepPersonnalInformation from '../../components/steps-psychic-signup/step-professional-information/step-professional-information';
import StepFinish from '../../components/steps-psychic-signup/step-finish/step-finish';
import './psychic-signup-page.css'
const { Step } = Steps;
class PsychicSignup extends Component {
    state = {
        step: 1,
        show_final_values: false
    }
    handleNextButton = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
    }

    handleBackButton = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 })
    }
    handleConfirmButton = (values) => {
        const { step_final_fields } = this.state;
        this.setState({
            step_final_fields: {
                ...step_final_fields,
                ...values
            }
        }, () => this.setState({ show_final_values: true }, () => console.log(this.state)));
    }

    getFinalStepValue = (values) => {
        const { step_final_fields } = this.state;
        this.setState({
            step_final_fields: {
                ...step_final_fields,
                ...values
            }
        });
    }
    getStepOneValue = (values) => {
        const { step_one_fields } = this.state;
        console.log(values);
        this.setState({
            step_one_fields: {
                ...step_one_fields,
                ...values,
            }
        })
    }
    getStepTwoValue = (values) => {
        const { step_two_fields } = this.state;
        this.setState({
            step_two_fields: {
                ...step_two_fields,
                ...values
            }
        })
    }
    getStepThreeValue = (values) => {
        const { step_three_fields } = this.state;
        this.setState({
            step_three_fields: {
                ...step_three_fields,
                ...values
            }
        })
    }
    getStepfourValue = (values) => {
        const { step_four_fields } = this.state;
        this.setState({
            step_four_fields: {
                ...step_four_fields,
                ...values,

            }
        })
    }
   render() {
        const { step, step_one_fields, step_two_fields, step_three_fields, step_four_fields, step_final_fields } = this.state;
        if (step === 1) {
            return (
                <div className='container-psychic-step' >
                    <div className='child-progress-barre'>
                        <Steps progressDot current={0} direction="vertical" >
                            <Step title="In Progress" description="Contact details" />
                            <Step title="Waiting" description="Address" />
                            <Step title="Waiting" description="Payment Information" />
                            <Step title="Waiting" description="Professional information" />
                            <Step title="Waiting" description="Finish" />
                        </Steps>
                    </div>
                    <div className='child-card'>
                        <StepContactDetails {...step_one_fields} handleNextButton={this.handleNextButton} submittedValues={this.getStepOneValue} />
                    </div>
                </div>
            );
        }
        else if (step === 2) {
            return (
                <div className='container-psychic-step' >
                    <div  className='child-progress-barre'>
                        <Steps progressDot current={1} direction="vertical">
                            <Step title="Finished" description="Contact details" />
                            <Step title="In Progress" description="Address" />
                            <Step title="Waiting" description="Payment Information" />
                            <Step title="Waiting" description="Professional information" />
                            <Step title="Waiting" description="Finish" />
                        </Steps>
                    </div>
                   <div className=" child-card">
                        <StepAdresse {...step_two_fields} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getStepTwoValue} />
                    </div>
               </div>

            );
        }

        else if (step === 3) {
            return (
                <div className='container-psychic-step'>
                    <div className='child-progress-barre'>
                        <Steps progressDot current={2} direction="vertical">
                            <Step title="Finished" description="Contact details" />
                            <Step title="Finished" description="Address" />
                            <Step title="In Progress" description="Payment Information" />
                            <Step title="Waiting" description="Professional information" />
                            <Step title="Waiting" description="Finish" />
                        </Steps>
                    </div>
                    <div className=" child-card">
                        <StepPayment {...step_three_fields} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getStepThreeValue} />
                    </div>
                </div>

            );
        }
        else if (step === 4) {
            return (
                <div className='container-psychic-step'>
                    <div className='child-progress-barre'>
                        <Steps progressDot current={3} direction="vertical">
                            <Step title="Finished" description="Contact details" />
                            <Step title="Finished" description="Address" />
                            <Step title="Finished" description="Payment Information" />
                            <Step title="In Progress" description="Professional information" />
                            <Step title="Waiting" description="Finish" />
                        </Steps>
                    </div>
                    <div className=" child-card">
                        <StepPersonnalInformation {...step_four_fields} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getStepfourValue} />
                    </div>
                </div>

            );
        }
        else {
            return (
                <div className='container-psychic-step'>
                    <div className='child-progress-barre'>
                        <Steps progressDot current={4} direction="vertical">
                            <Step title="Finished" description="Contact details" />
                            <Step title="Finished" description="Address" />
                            <Step title="Finished" description="Payment Information" />
                            <Step title="Finished" description="Professional information" />
                            <Step title="In Progress" description="Finish" />
                        </Steps>
                    </div>
                    <div className=" child-card" >
                        <StepFinish {...step_final_fields} handleConfirmButton={this.handleConfirmButton} handleBackButton={this.handleBackButton} submittedValues={this.getFinalStepValue} />
                    </div>
                </div>
            );
        }
    }
}

export default PsychicSignup;