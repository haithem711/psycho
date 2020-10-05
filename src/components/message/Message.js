import React, { useEffect, useState } from "react";
import Emoji from "react-emoji-render";
import { Avatar } from "antd";
import { backUrl } from "../../config/api";
import { Motion, spring } from "react-motion";
import "./message.scss";
const Message = props => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) setLoaded(true);
    return () => (isSubscribed = false);
  }, []);
  return (
    <Motion key={props.keyOfItem} style={{ x: spring(loaded ? 1 : 0) }}>
      {({ x }) => (
        <div
          className={"message-container " + props.classFromOrTo}
          style={{
            WebkitTransform: `scale(${x})`,
            transform: `scale(${x})`,
            transformOrigin: `${props.originTransoform}`
          }}
        >
          <Avatar
            icon={"user"}
            src={props.avatarId ? backUrl + "/storage/" + props.avatarId : null}
          />
          <div className={"message "}>
            <Emoji text={props.message.message} />
          </div>
        </div>
      )}
    </Motion>
  );
};

export default Message;
