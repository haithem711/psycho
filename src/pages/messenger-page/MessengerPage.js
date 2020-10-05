import React, { useEffect } from "react";
import "./messenger-page.scss";
import {  Empty, PageHeader } from "antd";
import { connect } from "react-redux";
import { getAuthedUser } from "../../actions/auth-actions/actions";
import {fetchDiscussions} from "../../actions/discussions-actions/actions"
import Chat from "../../components/chat-discussion/Chat";
import { Route, withRouter } from "react-router-dom";
import InfiniteDiscussionList from "../../components/list-discussions-infinte/InfiniteDiscussionList";
import AvatarChatWith from "../../components/avatar-chat-with/AvatarChatWith";

const MessengerPage = props => {
  useEffect(() => {
    if (!props.history.location.pathname.includes("discussions") ) {
        (async () => {
            await props.fetchDiscussions();
        })()
    }
  }, [props]);

  useEffect(()=>{
      let isSubsribed = true;

      if(isSubsribed && props.discussions.length>0 && !props.history.location.pathname.includes("discussions")){
          props.history.push(`/messenger/discussions/${props.discussions[0].id}`);
      }

      return () => isSubsribed = false;

  },[props])
  return (
    <div className={"messenger-page"}>
      <div className="search-container">
          <PageHeader onBack={() =>  props.history.goBack()} title="Chats" subTitle="" />
          <AvatarChatWith/>
      </div>
      <div className={"messenger-box"}>
         <InfiniteDiscussionList />
        {props.discussions !== null && props.discussions !== [] ? (
          <Route
            location={props.history.location}
            key={props.history.location.key}
            path={`/messenger/discussions/:id`}
            component={Chat}
          />
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = reduxStore => {
  return {
    isLoggedIn: reduxStore.authReducer.isLoggedIn,
    user: reduxStore.authReducer.user,
    discussions: reduxStore.discussionsReducer.discussions,
    isLoading: reduxStore.discussionsReducer.isLoading,
    hasMore: reduxStore.discussionsReducer.hasMore,
    next_page_url: reduxStore.discussionsReducer.next_page_url,
    activeDiscussionBtn: reduxStore.discussionsReducer.activeDiscussionBtn
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getAuthedUser, fetchDiscussions }
  )(MessengerPage)
);
