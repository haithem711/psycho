import React from "react";
import { Button, Icon, Input, message, Typography, Upload, Form } from "antd";
import DynamicModal from "../../components/dynamic-modal/DynamicModal";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class ArticleForm extends React.Component {
  state = {
    loading: false
  };

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  submitForm = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <DynamicModal>
        <form className="add-article" onSubmit={this.submitForm}>
          <Typography.Title className="add-article-item blue-h3" level={3}>
            Title
          </Typography.Title>
          <Form.Item>
            {getFieldDecorator("title", {
              rules: [
                { required: true, message: "Please input the article title!" }
              ]
            })(
              <Input
                className="add-article-item"
                placeholder="Ex: Lorem ipsum"
              />
            )}
          </Form.Item>
          <Typography.Title className="add-article-item blue-h3" level={3}>
            Description
          </Typography.Title>
          <Form.Item>
            {getFieldDecorator("description", {
              rules: [
                { required: true, message: "Please input the article title!" }
              ]
            })(
              <Input.TextArea
                className="add-article-item"
                placeholder="Ex: Lorem ipsum"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("cover_picture", {
              rules: [
                { required: true, message: "Please upload a picture!" }
              ]
            })(
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            )}
          </Form.Item>
          <Button className="add-article-item" htmlType="submit" type="primary">
            {" "}
            SAVE{" "}
          </Button>
        </form>
      </DynamicModal>
    );
  }
}
const AddArticle = Form.create({ name: 'normal_login' })(ArticleForm);
export default AddArticle;
