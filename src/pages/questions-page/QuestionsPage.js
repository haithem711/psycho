import React, { Component } from "react";
import "./questions-page.scss";
import { connect } from "react-redux";
import {
  clearQuestions,
  fetchQuestions
} from "../../actions/questions-actions/actions";
import { Pagination, Spin, Icon } from "antd";
import QuestionCard from "../../components/question-card/QuestionCard";
import AddQuestion from "../../components/add-question/AddQuestion";

class QuestionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPageChange = page => {
    if (!this.props.isLoading) {
      this.props.fetchQuestions(
        "/questions?page=" + page + "&id=" + this.props.user.id
      );
    }
  };
  componentDidMount() {
    if (!this.props.isSendingRequest && !this.props.isLoading) {
      this.props.fetchQuestions("/questions?id=" + this.props.user.id);
    }
  }

  render() {
    return (
      <div className={"questions-page"}>
        <div className={"container-list"}>
          <div className={"add-question-container"}>
            <AddQuestion />
          </div>
          <div className={"list-question-mansonry"}>
            {this.props.questions.map((item, index) => (
              <QuestionCard
                animationDelay={index}
                question={item}
                key={index}
              />
            ))}
          </div>
          {this.props.isLoading ? (
            <div className="loading-row">
              <Spin
                indicator={
                  <Icon
                    type="loading-3-quarters"
                    style={{ fontSize: 24, color: "#F8A36C" }}
                    spin
                  />
                }
              />
            </div>
          ) : null}
        </div>
        <div className={"pagination-container-q"}>
          <Pagination
            onChange={this.onPageChange}
            defaultCurrent={1}
            defaultPageSize={8}
            total={this.props.total}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    questions: reduxStore.questionsReducer.questions,
    isLoading: reduxStore.questionsReducer.isLoading,
    isSendingRequest: reduxStore.questionsReducer.isSendingRequest,
    total: reduxStore.questionsReducer.total,
    user: reduxStore.authReducer.user,
    isLoggedIn: reduxStore.authReducer.isLoggedIn
  };
};
export default connect(
  mapStateToProps,
  { fetchQuestions, clearQuestions }
)(QuestionsPage);
