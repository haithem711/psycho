import React from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Select,
  DatePicker,
  Typography,
  Radio,
  Upload
} from "antd";
import "./signup-page.scss";
import { Link, withRouter, Redirect } from "react-router-dom";
import jsonToFormData from "json-form-data";
import { connect } from "react-redux";
import { signup } from "../../actions/auth-actions/actions";
import ThinkingMan from "../../components/svg/ThinkingMan";
import {
  loadingPageAction,
  hideProgressBar
} from "../../actions/global-status-actions/actions";
import { countries } from "../../tools/countries";
import { getBase64, beforeUpload } from "../../tools/proccessingMethods";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      loadingAvatar: false,
      imageUrl: "",
      imgFile: null
    };
  }

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loadingAvatar: true });
      return;
    }
    if (info.file.status === "done") {
      this.setState({
        imgFile: info.file.originFileObj
      });
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loadingAvatar: false
        })
      );
    }
  };

  handleSubmit =  e => {
    e.preventDefault();
    let _this = this;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.loadingPageAction();
        let options = {
          showLeafArrayIndexes: true,
          includeNullValues: false,
          mapping: function(value) {
            if (typeof value === "boolean") {
              return +value ? "1" : "0";
            }
            return value;
          }
        };

        let tempData = values;
        tempData.birth_date = values.birth_date._d.toString();
        tempData.role = tempData.isPatient === 1 ? "patient" : "doctor";
        tempData.password_confirmation = tempData.password;
        let formData = jsonToFormData(tempData, options);
        formData.append("avatar_url", this.state.imgFile);
        await _this.props.signup(formData);
        _this.props.hideProgressBar();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isSendingRequest } = this.props;
    const { selectedItems, imageUrl } = this.state;
    const filteredOptions = countries.filter(o => !selectedItems.includes(o));
    const uploadButton = (
      <div>
        <Icon type={this.state.loadingAvatar ? "loading" : "upload"} />
        <div className="ant-upload-text">Your Photo</div>
      </div>
    );
    return (
      <div className={"auth-container"}>
        {this.props.redirectToHome === true ? <Redirect to="/" /> : null}
        <Typography.Title level={2} className={"blue-h2"}>
          Sign Up
        </Typography.Title>
        <div className="container-row">
          <Form onSubmit={this.handleSubmit} className="signup-form">
            <Form.Item hasFeedback>
              {getFieldDecorator("first_name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your first name"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="First Name"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator("last_name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your last name"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Last Name"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator("birth_date", {
                rules: [
                  {
                    required: true,
                    message: "Please input your birthday"
                  }
                ]
              })(<DatePicker style={{ width: "100%" }} />)}
            </Form.Item>
            <Form.Item label="Select" hasFeedback>
              {getFieldDecorator("nationality", {
                rules: [
                  {
                    required: true,
                    message: "Please input your nationality"
                  }
                ]
              })(
                <Select showSearch={true} placeholder="Please select a country">
                  {filteredOptions.map(item => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator("about", {
                rules: [
                  {
                    required: true,
                    message: "Tell us about your self"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="About"
                />
              )}
            </Form.Item>

            <Form.Item hasFeedback>
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Please input a valid email!",
                    type: "email"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item className={"uploaditem"} hasFeedback>
              {getFieldDecorator("avatar_url", {
                rules: [
                  {
                    required: true,
                    message: "Please upload your photo"
                  }
                ]
              })(
                <Upload
                  name="avatar_url"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator("is_patient", {
                rules: [
                  {
                    required: true,
                    message: "Please input your last name",
                    type: "number"
                  }
                ]
              })(
                <Radio.Group className={"radio-group-flex"}>
                  <Radio value={0}>I am a Doctor</Radio>
                  <Radio
                    value={1}
                    style={{
                      marginRight: "20px"
                    }}
                  >
                    Patient{" "}
                  </Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item>
              <Button
                  size={"large"}
                type="primary"
                htmlType="submit"
                className="signup-form-button"
                loading={isSendingRequest}
              >
                Sign Up
              </Button>
              Or{" "}
              <Link to="/login" className={"orange-link"}>
                Login now!
              </Link>
            </Form.Item>
          </Form>
          <div className={"right-svg-container"}>
            <ThinkingMan />
          </div>
        </div>
      </div>
    );
  }
}

const SignUpPage = Form.create({ name: "signup-form" })(SignUpForm);

const mapStateToProps = reduxStore => {
  return {
    isSendingRequest: reduxStore.authReducer.isSendingRequest,
    user: reduxStore.authReducer.user,
    isLoggedIn: reduxStore.authReducer.isLoggedIn,
    redirectToHome: reduxStore.authReducer.redirectToHome
  };
};

export default connect(
  mapStateToProps,
  { signup, loadingPageAction, hideProgressBar }
)(withRouter(SignUpPage));
