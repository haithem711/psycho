import React, { useEffect, useState } from "react";
import "./avatar-chat-with.scss";
import { Avatar, Popconfirm, Icon } from "antd";
import { apiUrl, backUrl } from "../../config/api";
import { connect } from "react-redux";
import { resetDiscussionStatus } from "../../actions/discussions-actions/actions";
import axiosInstance from "../../config/axios-instance";
import { withRouter } from "react-router-dom";

const AvatarChatWith = props => {
  const [isLoadingUser, setIsloadingUser] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      if (props.isLoadingChat) {
        setUser({});
      }
    }
    return () => (isSubscribed = false);
  }, [props.isLoadingChat]);
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed && props.activeChatMembers.length > 0) {
      (async function() {
        if (isSubscribed) {
          const chatUserId =
            (await props.activeChatMembers[0].id) !== props.user.id
              ? props.activeChatMembers[0].id
              : props.activeChatMembers[1].id;
          const response = await axiosInstance({
            method: "get",
            url: apiUrl + "/users/" + chatUserId,
            data: null
          });
          if (isSubscribed) {
            await setUser(response.data);
            await setIsloadingUser(false);
          }
          return () => (isSubscribed = false);
        }
      })();
    }
    return () => (isSubscribed = false);
  }, [props.activeChatMembers, props.user.id]);
  return !isLoadingUser && !props.isLoadingChat ? (
    <Popconfirm
      placement="bottom"
      title={"go to profile"}
      onConfirm={() => props.history.push("/profile/" + user.id)}
      okText="Yes"
      icon={<Icon type={"user"} />}
      onCancel={event => event.preventDefault()}
      cancelText="No"
    >
      <div className={"avatar-chat-with"}>
        <Avatar
          className={"avatar-round"}
          size={38}
          icon="user"
          src={user.avatar_url ? `${backUrl}/storage/${user.avatar_url}` : null}
        />
        <h4>{user.id ? user.first_name + " " + user.last_name : null}</h4>
      </div>
    </Popconfirm>
  ) : (
    <div className={"loading-avatar-with"}>
      <div className="avatar-is-loading"></div>
      <div className="name-is-loading"></div>
    </div>
  );
};

const mapStateToProps = reduxStore => {
  return {
    user: reduxStore.authReducer.user,
    discussions: reduxStore.discussionsReducer.discussions,
    activeChatMembers: reduxStore.chatReducer.activeChatMembers,
    isLoadingChat: reduxStore.chatReducer.isLoading
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { resetDiscussionStatus }
  )(AvatarChatWith)
);
