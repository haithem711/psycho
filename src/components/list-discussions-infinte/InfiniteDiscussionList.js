import React from "react";
import { Empty, Spin, Icon } from "antd";
import UserTabMessenger from "../user-tab-messenger/UserTabMessenger";
import { connect } from "react-redux";
import {
  clearDiscussions,
  fetchDiscussions,
  newDisscussionAdded
} from "../../actions/discussions-actions/actions";
import { withRouter } from "react-router-dom";
import debounce from "lodash.debounce";
import "./infinite-discussions-list.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
class InfiniteDiscussionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialLoaded: false
    };
    this.elementParentContainer = React.createRef();
  }

  componentDidMount() {
    (async () => {


      if (this.props.isLoggedIn && this.props.user.id) {
        window.Echo.channel(
            `copsycho-private-discussion-created-userId=${this.props.user.id}`
        ).listen("NewDiscussionEvent", async e => {
          this.props.newDisscussionAdded(e.data);
        });
        await this.props.clearDiscussions();
        await this.props.fetchDiscussions(
          "/users/" + this.props.user.id + "/discussions"
        );
        await this.setState({
          initialLoaded: true
        });
      }
      if (this.state.initialLoaded) {
        this.elementParentContainer.current.onscroll = debounce(() => {
          if (
            this.elementParentContainer.current.scrollHeight -
              this.elementParentContainer.current.offsetHeight -
              this.elementParentContainer.current.scrollTop <
            1
          ) {
            if (
              this.props.hasMore &&
              !this.props.isLoading &&
              this.props.next_page_url != null
            ) {
              this.props.fetchDiscussions(this.props.next_page_url);
            }
          }
        }, 100);
      }
    })();
  }

  render() {
    return (
      <div className={"left-bar"}>
        <div className={"list-discussions"} ref={this.elementParentContainer}>
          <TransitionGroup className="todo-list">
            {this.props.discussions !== null ? (
              this.props.discussions.map((item, index) => (
                <CSSTransition key={index} timeout={1000} classNames="itemchat">
                  <UserTabMessenger index={index} discussion_id={item.id} />
                </CSSTransition>
              ))
            ) : (
              <Empty />
            )}
          </TransitionGroup>
        </div>
        {this.props.isLoading ? (
          <div className="discussion-spin-container">
            <Spin
              indicator={
                <Icon
                  type="loading"
                  style={{ fontSize: 24, color: "#F8A36C" }}
                  spin
                />
              }
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    isLoggedIn: reduxStore.authReducer.isLoggedIn,
    user: reduxStore.authReducer.user,
    discussions: reduxStore.discussionsReducer.discussions,
    isLoading: reduxStore.discussionsReducer.isLoading,
    hasMore: reduxStore.discussionsReducer.hasMore,
    next_page_url: reduxStore.discussionsReducer.next_page_url
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchDiscussions, clearDiscussions, newDisscussionAdded }
  )(InfiniteDiscussionList)
);
