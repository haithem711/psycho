import React from "react";
import { Button, Form, Icon, Input, Empty, Spin } from "antd";
import Message from "../message/Message";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import { hideProgressBar } from "../../actions/global-status-actions/actions";
import {
  postMessage,
  fetchChat,
  clearChat,
  addMessage,
  receivedMessage,
  getMembers,
  setActiveChatMembers
} from "../../actions/chat-actions/actions";

import { Howl } from "howler";
import soundMessage from "../../media/message.mp3";

let notifcationSound = new Howl({
  src: [soundMessage],
  volume: 0.12,
  autoplay: false
});

class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageValue: "",
      receivedUserId: null,
      senderUserId: null,
      scrollSmooth: false,
      isSendingMessage: false,
      emojiPickerHidden: true,
      isSubsribed:true
    };
    this.element = null;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount () {
    (async () => {
      if(this.state.isSubsribed ){

        this.element = document.getElementById("Chat-box");
        if (this.props.isLoggedIn && this.props.user.id) {
          this.props.clearChat();
          if (this.props.match.params.id) {
            await this.props.getMembers(this.props.match.params.id);
            await this.props.fetchChat(
                `/discussions/${this.props.match.params.id}/messages`
            );
          }
          else {
            await this.props.getMembers(this.props.discussions[0].id);
            await this.props.fetchChat(
                `/discussions/${this.props.discussions[0].id}/messages`
            );
          }
          this.scrollToBottom();
          this.setState({
            scrollSmooth: true
          });
          this.props.hideProgressBar();
          await this.props.setActiveChatMembers(this.props.members);
          await this.props.members.forEach(user => {
            if (user.id !== this.props.user.id) {
              this.setState({
                receivedUserId: user.id
              });
            } else {
              this.setState({
                senderUserId: user.id
              });
            }
          });

          window.Echo.channel(
              `copsycho-private-sent-message-userId=${this.props.user.id}`
          ).listen("SentMessage", async e => {
            if (e) {
              this.scrollToBottom();
              this.setState({ isSendingMessage: true }, () => {
                if (e.data.from && this.state.isSendingMessage === true) {
                  if (e.data.from.id) {
                    if (e.data.from.id === this.props.user.id)
                      this.setState(
                          {
                            isSendingMessage: false
                          },
                          () => {
                            this.props.addMessage(e.data);
                            this.setState({
                              messageValue: ""
                            });
                          }
                      );
                  } else if (e.data.from === this.props.user.id)
                    this.setState(
                        {
                          isSendingMessage: false
                        },
                        () => {
                          this.props.addMessage(e.data);
                          this.setState({
                            messageValue: ""
                          });
                        }
                    );
                }
              });
              this.props.form.resetFields();
            }
          });
          window.Echo.channel(
              `copsycho-private-received-message-userId=${this.props.user.id}`
          ).listen("SentMessage", async e => {
            if (e) {
              this.scrollToBottom();
              notifcationSound.play();
              if (e.data.from && this.state.isSendingMessage === false) {
                if (e.data.from.id) {
                  if (e.data.from.id !== this.props.user.id)
                    this.setState(
                        {
                          isSendingMessage: true
                        },
                        () => {
                          this.props.receivedMessage(e.data);
                          this.setState({
                            messageValue: ""
                          });
                        }
                    );
                } else if (e.data.from !== this.props.user.id)
                  this.setState(
                      {
                        isSendingMessage: true
                      },
                      () => {
                        this.props.receivedMessage(e.data);
                        this.setState({
                          messageValue: " "
                        });
                      }
                  );
              }
            }
          });
          this.setState({
            isSubsribed:false
          })
        }
      }
    })();
  };

  componentWillUnmount() {
    this.setState({
      messageValue: "",
      receivedUserId: null,
      senderUserId: null,
      scrollSmooth: false,
      isSendingMessage: false,
      emojiPickerHidden: true
    });
    window.Echo.leave(
      `copsycho-private-sent-message-userId=${this.props.user.id}`
    );
    window.Echo.leave(
      `copsycho-private-received-message-userId=${this.props.user.id}`
    );
  }

  scrollToBottom = () => {
   if(this.element)
     this.element.scrollTo(
         0,
         this.element.scrollHeight - this.element.getBoundingClientRect().height
     );
  };

  handleEmoji = emoji => {
    this.setState(
      {
        messageValue:
          this.state.messageValue + String.fromCodePoint(parseInt("0x" + emoji))
      },
      () =>
        this.props.form.setFieldsValue({
          message: this.state.messageValue
        })
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.postMessage(
          {
            discussion_id: this.props.match.params.id,
            from: this.props.user.id,
            to: this.state.receivedUserId,
            message: this.state.messageValue
          },
          "/messages"
        );
      }
    });
  };

  handleTextInput = event => {
    this.setState({ messageValue: event.target.value }, () => {
      this.props.form.setFieldsValue({
        message: this.state.messageValue
      });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={"discussion-content"}>
        <div
          onClick={() => this.setState({ emojiPickerHidden: true })}
          className={"chat-container"}
          id={"Chat-box"}
          style={{
            scrollBehavior: this.state.scrollSmooth ? "smooth" : "auto"
          }}
        >
          {this.props.messages.map((item, index) => (
            <Message
              key={index}
              keyOfItem={index}
              message={item}
              classFromOrTo={
                item.from.id === this.props.user.id ||
                item.from === this.props.user.id
                  ? "from"
                  : "to"
              }
              originTransoform={
                item.from.id === this.props.user.id ||
                item.from === this.props.user.id
                  ? "bottom right"
                  : "top left"
              }
              avatarId={
                item.from.id === this.props.members[0].id ||
                item.from === this.props.members[0].id
                  ? this.props.members[0].avatar_url
                  : this.props.members[1].avatar_url
              }
            />
          ))}
          {this.props.isLoading === false && !this.props.messages.length > 0 ? (
            <div
              className={"empty-container"}
              onClick={() => this.setState({ emojiPickerHidden: true })}
            >
              <Empty description={null} />
            </div>
          ) : null}
          {this.props.isLoading ? (
            <div
              className={"empty-container"}
              onClick={() => this.setState({ emojiPickerHidden: true })}
            >
              <Spin size="large" />
            </div>
          ) : null}
        </div>
        <Form onSubmit={this.handleSubmit} className="message-form">
          <Form.Item
            style={{
              width: "100%"
            }}
          >
            {getFieldDecorator("message", {
              onChange: event => this.handleTextInput(event),
              rules: [{ required: true, message: "Tape your msg!" }]
            })(
              <Input
                autoComplete={"off"}
                className={"input-msg"}
                prefix={
                  <Icon type="message" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                onFocus={() => {
                  this.setState({ emojiPickerHidden: true });
                }}
                placeholder="Message"
              />
            )}
            <Icon
              type={"smile"}
              style={{
                position: "absolute",
                right: "50px",
                top: "-2px",
                color: "#F8A36C",
                fontSize: "1.5rem"
              }}
              onClick={() =>
                this.setState({
                  emojiPickerHidden: !this.state.emojiPickerHidden
                })
              }
            />
          </Form.Item>
          <div
            className={"emoji-container"}
            style={{
              opacity: this.state.emojiPickerHidden === false ? "1" : "0",
              transform:
                this.state.emojiPickerHidden === false
                  ? "unset"
                  : "translateX(100%)"
            }}
          >
            <EmojiPicker
              disableDiversityPicker
              preload
              onEmojiClick={emoji => this.handleEmoji(emoji)}
            />
          </div>
          <Button htmlType="submit" className="send-form-button">
            <Icon type={"enter"} />
          </Button>
        </Form>
      </div>
    );
  }
}

const Chat = Form.create({ name: "normal_login" })(ChatForm);

const mapStateToProps = reduxStore => {
  return {
    isLoggedIn: reduxStore.authReducer.isLoggedIn,
    user: reduxStore.authReducer.user,
    messages: reduxStore.chatReducer.messages,
    isLoading: reduxStore.chatReducer.isLoading,
    members: reduxStore.chatReducer.members,
    discussions: reduxStore.discussionsReducer.discussions
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchChat,
      postMessage,
      addMessage,
      clearChat,
      receivedMessage,
      getMembers,
      hideProgressBar,
      setActiveChatMembers
    }
  )(Chat)
);
