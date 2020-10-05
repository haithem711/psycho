import React, { Component } from "react";
import { Button } from "antd";

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    return <Button>+</Button>;
  }
}
export default AddQuestion;
