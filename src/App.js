import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import Navbar from "./components/navbar/Navbar";
import LoginPage from "./pages/login-page/LoginPage";
import { message, Layout, notification, Icon, BackTop } from "antd";
import SignUpPage from "./pages/signup-page/SignUpPage";
import { dynamicModalClose } from "./actions/dynamic-modal/actions";
import { getOrCreateDiscussion } from "./actions/discussions-actions/actions";
import ArticlePage from "./pages/articles-page/ArticlePage";
import { getAuthedUser } from "./actions/auth-actions/actions";
import MessengerPage from "./pages/messenger-page/MessengerPage";
import ProgressBarTop from "./components/progress-bar-top/ProgressBarTop";
import ProfilePage from "./pages/profile-page/ProfilePage";
import { clearAdvisors } from "./actions/advisors-actions/actions";
import { Howl } from "howler";
import soundMessage from "./media/message.mp3";
import QuestionsPage from "./pages/questions-page/QuestionsPage";
import QuestionDetails from "./pages/question-details-page/QuestionDetails";
import ArticleDetailsPage from "./pages/article-details-page/ArticleDetailsPage";
import FinalForms from './pages/signup-form/FinalForm/FinalForm'
import Dashboard from "./pages/Dashboard/Dashboard"
const uuidv4 = require("uuid/v4");
const { Content } = Layout;
let notifcationSound = new Howl({
  src: [soundMessage],
  volume: 0.12,
  autoplay: false
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    (async () => {
      if (this.props.isLoggedIn && this.props.user) {

        window.Echo.channel(
          `copsycho-private-message-notification-userId=${this.props.user.id}`
        ).listen("SentMessage", async e => {
          if (!window.location.pathname.includes("/messenger")) {
            const key = uuidv4();
            await notification.open({
              key,
              message: e.data.from.first_name + " " + e.data.from.last_name,
              description: e.data.message,
              duration: 4,
              icon: <Icon type="message" style={{ color: "#9BD7D1" }} />,
              onClick: async () => {
                await this.props.history.push("/messenger/discussions/" + e.data.discussion_id);
                notification.close(key);
              }
            });
            notifcationSound.play();
          }
        });
      }
    })();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.showAlert === true) {
      if (this.props.alertType === "error")
        message.error(this.props.alertMessage);
      else if (this.props.alertType === "warning")
        message.warning(this.props.alertMessage);
      else if (this.props.alertType === "success")
        message.success(this.props.alertMessage, 1);
    }
  }

  render() {
    return (
      <Layout className={"app"}>
        <ProgressBarTop />
        <BackTop />
        <Navbar />
        <Content className={"content"}>
            <Switch location={this.props.history.location}>
                <Route exact path={"/"} component={HomePage} />
                <GuestRoute
                    authenticated={this.props.isLoggedIn}
                    path="/signup"
                    component={SignUpPage}
                />
                 <GuestRoute
                    authenticated={this.props.isLoggedIn}
                    path="/finalform"
                    component={FinalForms}
                />
                 <GuestRoute
                    authenticated={this.props.isLoggedIn}
                    path="/dashboard"
                    component={Dashboard}
                />
                
                <GuestRoute
                    authenticated={this.props.isLoggedIn}
                    path="/login"
                    component={LoginPage}
                />
                <AuthRoute
                    authenticated={this.props.isLoggedIn}
                    path="/articles"
                    component={ArticlePage}
                />
                <AuthRoute
                    authenticated={this.props.isLoggedIn}
                    path="/horoscopes"
                    component={ArticlePage}
                />
                <AuthRoute
                    authenticated={
                        this.props.isLoggedIn && this.props.isLoadingUser === false
                    }
                    path="/questions"
                    component={QuestionsPage}
                />
                <AuthRoute
                    authenticated={this.props.isLoggedIn}
                    path="/question/:id"
                    component={QuestionDetails}
                />
                <AuthRoute
                    authenticated={this.props.isLoggedIn}
                    path="/article/:id"
                    component={ArticleDetailsPage}
                />
                <AuthRoute
                    authenticated={
                        this.props.isLoggedIn && this.props.isLoadingUser === false
                    }
                    path="/profile/:id"
                    component={ProfilePage}
                />
                <AuthRoute
                    authenticated={this.props.isLoggedIn}
                    path="/messenger/"
                    component={MessengerPage}
                />
            </Switch>
        </Content>
      </Layout>
    );
  }
}

function AuthRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function GuestRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      render={props =>
        !authenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

const mapStateToProps = reduxStore => {
  return {
    showAlert: reduxStore.alertReducer.showAlert,
    alertMessage: reduxStore.alertReducer.alertMessage,
    alertType: reduxStore.alertReducer.alertType,
    isLoggedIn: reduxStore.authReducer.isLoggedIn,
    user: reduxStore.authReducer.user,
    isLoadingUser: reduxStore.authReducer.isLoadingUser
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { dynamicModalClose, getOrCreateDiscussion, getAuthedUser, clearAdvisors }
  )(App)
);
