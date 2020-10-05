import React, { useEffect, useState } from "react";
import "./user-tab-messenger.scss";
import { Avatar, Button, Skeleton, Icon, Popconfirm, message } from "antd";
import { apiUrl, backUrl } from "../../config/api";
import { connect } from "react-redux";
import {
  deleteDiscussion,
  resetDiscussionStatus
} from "../../actions/discussions-actions/actions";
import axiosInstance from "../../config/axios-instance";
import { NavLink, withRouter } from "react-router-dom";

const UserTabMessenger = props => {
  const [isLoading, setIsloading] = useState(true);
  const [user, setUser] = useState({});
  const deleteDiscussion = async event => {
    event.preventDefault();
    await props.deleteDiscussion(props.discussion_id);
    if (props.discussions) {
      if (props.discussions.length > 0)
        props.history.push(`/messenger/discussions/${props.discussions[0].id}`);
      else props.history.push(`/messenger/`);
    } else props.history.push(`/messenger/`);
    props.resetDiscussionStatus(false);
  };
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      let response = new Promise(async (resolve, reject) => {
        let data = await axiosInstance({
          method: "get",
          url: apiUrl + "/discussions/" + props.discussion_id + "/members",
          data: null
        });
        resolve(data);
        reject(() => message.error("Error loading Messages"));
      });

      response.then(values => {
        values.data.forEach(tempUser => {
          if (tempUser.id !== props.user.id && isSubscribed) {
            setUser(tempUser);
            setIsloading(false);
          }
        });
      });
    }
    return () => (isSubscribed = false);
  }, [props.user.id, props.discussion_id]);
  return (
    <NavLink
      activeClassName={"active"}
      to={`/messenger/discussions/${props.discussion_id}`}
    >
      {props.discussion_id != null ? (
        <Skeleton active avatar paragraph={{ rows: 0 }} loading={isLoading}>
          <div className={"user-tab-messenger"}>
            <div className={"left"}>
              <Avatar
                className={"avatar-round"}
                size={50}
                icon="user"
                src={
                  user.avatar_url
                    ? `${backUrl}/storage/${user.avatar_url}`
                    : null
                }
              />
            </div>
            <div className={"right"}>
              <div className="text">
                <h4>{user.first_name + " " + user.last_name}</h4>
                <h5>last messenging text</h5>
              </div>
              <div className="actions">
                <Popconfirm
                  placement="topLeft"
                  title={"Yes Delete!"}
                  icon={<Icon type={"delete"} />}
                  onCancel={event => {
                    event.preventDefault();
                  }}
                  onConfirm={event => deleteDiscussion(event)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button shape={"circle"}>
                    <Icon type={"delete"} />
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        </Skeleton>
      ) : null}
    </NavLink>
  );
};

const mapStateToProps = reduxStore => {
  return {
    user: reduxStore.authReducer.user,
    discussions: reduxStore.discussionsReducer.discussions
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { deleteDiscussion, resetDiscussionStatus }
  )(UserTabMessenger)
);
