import React from "react";
import { Form, Icon, Input, Button, Checkbox, Typography } from "antd";
import "./login-page.scss";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth-actions/actions";
import SmartGirl from "../../components/svg/SmartGirl";
import {
  loadingPageAction,
  hideProgressBar
} from "../../actions/global-status-actions/actions";
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    let _this = this;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.loadingPageAction();
        await _this.props.login(values);
        _this.props.hideProgressBar();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isSendingRequest } = this.props;
    return (
      <div className={"auth-container"}>
        {this.props.redirectToHome === true ? <Redirect to="/" /> : null}
        <Typography.Title level={2} className={"blue-h2"}>
          Login
        </Typography.Title>
        <div className="container-row">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
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
            <Form.Item>
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
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <Link className="login-form-forgot orange-link" to="/login">
                Forgot password
              </Link>
              <Button
                  size={"large"}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={isSendingRequest}
              >
                Log in
              </Button>
              Or{" "}
              <Link to="/signup" className={"orange-link"}>
                register now!
              </Link>
            </Form.Item>
          </Form>
          <div className={"right-svg-container"}>
            <SmartGirl />
          </div>
        </div>
      </div>
    );
  }
}

const LoginPage = Form.create({ name: "login-form" })(LoginForm);

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
  { login, loadingPageAction, hideProgressBar }
)(LoginPage);
