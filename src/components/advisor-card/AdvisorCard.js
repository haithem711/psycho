import React, { useEffect, useState } from "react";
import { Skeleton, Avatar, Typography, Icon, Button, Badge, Rate, Popconfirm } from "antd";
import "./advisor-card.scss";
import { backUrl } from "../../config/api";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getOrCreateDiscussion,
  resetDiscussionStatus,
  clearDiscussions
} from "../../actions/discussions-actions/actions";
import { loadingPageAction } from "../../actions/global-status-actions/actions";
const AdvisorCard = props => {
  const [loaded, setLoaded] = useState(false);
  const [fadeInClass, setFadeInClass] = useState("");
  useEffect(() => {
    setLoaded(true);
    if (loaded) {
      setFadeInClass("fadein-element-with-delay");
    }
  }, [loaded]);

  const goToDiscussion = async () => {
    if (props.isLoggedIn) {
      await props.clearDiscussions();
      await props.resetDiscussionStatus(true);
      await props.loadingPageAction();
      const disID = await props.getOrCreateDiscussion(
        props.user.id,
        props.dicussWithId
      );
      if (disID) {
        if (disID.id) {
          props.history.push("/messenger/discussions/" + localStorage.getItem("new-discussion-id"));
        }
      } else {
        await props.getOrCreateDiscussion(props.user.id, props.dicussWithId);
        props.history.push("/messenger/discussions/" + localStorage.getItem("new-discussion-id"));
      }
    } else {
      props.history.push("/login");
    }
  };
  return (
    <div
      className={"card-container " + fadeInClass}
      style={{
        animationDelay: `${props.animationDelay}s`
      }}
    >
      <div className={"card-advisor"}>
        <Skeleton loading={false} avatar active>
          <div className={"user-pic-status"}>
            <Link to={"/profile/" + props.userId}>
              <div className={"picture"}>
                {props.isOnline === 1 ? (
                  <Badge
                    dot
                    status={props.isOnline === 1 ? "success" : "warning"}
                  >
                    <Avatar
                      className={"avatar-round"}
                      size={64}
                      icon="user"
                      src={
                        props.photo !== null
                          ? backUrl + "/storage/" + props.photo
                          : null
                      }
                    />
                  </Badge>
                ) : (
                  <Avatar
                    className={"avatar-round"}
                    size={64}
                    icon="user"
                    src={
                      props.photo !== null
                        ? backUrl + "/storage/" + props.photo
                        : null
                    }
                  />
                )}
              </div>
            </Link>

            <div className={"infos"}>
              <Typography.Title level={4}>{props.advisorName}</Typography.Title>
              <Typography.Text type="secondary">
                {props.description}
              </Typography.Text>

              <Typography.Text>
                some description long story short for showcase
              </Typography.Text>
            </div>
          </div>

          <div className={"right-items"}>
            <div className="rating-items">
              <Rate defaultValue={props.rating} />
              <Typography.Text type={"secondary"}>
                <strong>{40}</strong>$/h
              </Typography.Text>
              <Typography.Text type={"secondary"}>
                <strong>{66283}</strong> chats
              </Typography.Text>
            </div>

            {props.isLoggedIn && props.userId !== props.user.id ? (
              <div className="actions-items">
                <Popconfirm
                  title="Are you sure you want to chat with this advisor?"
                  onConfirm={() => goToDiscussion()}
                  onCancel={event => event.preventDefault()}
                  okText="Yes"
                  icon={<Icon type={"wechat"} />}
                  cancelText="No"
                >
                  <Button
                    type="primary"
                    size={"large"}
                    shape={"round"}
                    icon={"wechat"}
                    className={"btn-card"}
                    onClick={event => event.preventDefault()}
                  >
                    Chat
                  </Button>
                </Popconfirm>
              </div>
            ) : null}
          </div>
        </Skeleton>
      </div>
      <span className={"drop-shadow-card"} />
    </div>
  );
};

const mapStateToProps = reduxStore => {
  return {
    user: reduxStore.authReducer.user,
    newDiscussionId: reduxStore.discussionsReducer.newDiscussionId,
    isLoggedIn: reduxStore.authReducer.isLoggedIn
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    {
      getOrCreateDiscussion,
      loadingPageAction,
      resetDiscussionStatus,
      clearDiscussions
    }
  )(AdvisorCard)
);
