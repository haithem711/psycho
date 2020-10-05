import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios-instance";
import { apiUrl, backUrl } from "../../config/api";
import { Badge, Button, Icon, PageHeader, Skeleton, Typography } from "antd";
import "./question-details-page.scss";
import { connect } from "react-redux";
import {
  addLikeToQuestion,
  removeLikeFromQuestion
} from "../../actions/questions-actions/actions";
import { Avatar } from "antd/es";
const QuestionDetails = props => {
  const [question, setQuestion] = useState({});
  const [isLoadingData, setIsloadingData] = useState(true);
  const [liked, setLiked] = useState(false);
  const [questionLikeCount, setQuestionLikeCount] = useState(0);
  const [user, setUser] = useState({});
  const addLikeOnClick = async event => {
    event.preventDefault();
    if (question.liked_by_me || liked) {
      const responseQuestion = await axiosInstance({
        method: "get",
        url:
          apiUrl +
          "/questions/" +
          props.match.params.id +
          "?id=" +
          props.user.id,
        data: null
      });
      await props.removeLikeFromQuestion(props.questions, {
        user_id: props.user.id,
        like_for: "question",
        like_for_id: responseQuestion.data.id,
        like_id: responseQuestion.data.like_id
      });
      if (questionLikeCount > 0) setQuestionLikeCount(questionLikeCount - 1);

      setLiked(false);
    } else {
      await props.addLikeToQuestion(props.questions, {
        user_id: props.user.id,
        like_for: "question",
        like_for_id: question.id
      });
      setQuestionLikeCount(questionLikeCount + 1);
      setLiked(true);
    }
  };
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      window.scrollTo({ top: 0 });
    }
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      (async () => {
        const questionResponse = await axiosInstance({
          method: "get",
          url:
            apiUrl +
            "/questions/" +
            props.match.params.id +
            "?id=" +
            props.user.id,
          data: null
        });
        const responseUser = await axiosInstance({
          method: "get",
          url: apiUrl + "/users/" + questionResponse.data.user_id,
          data: null
        });
        const setTheUser = setUser(responseUser.data);
        const setTheQuestion = setQuestion(questionResponse.data);
        const setTheLike = setLiked(questionResponse.data.liked_by_me);
        const setLikeCount = setQuestionLikeCount(
          questionResponse.data.likes_count
        );
        return await Promise.all([
          setTheLike,
          setTheQuestion,
          setLikeCount,
          responseUser,
          setTheUser,
        ]).then(() => setIsloadingData(false));
      })();
    }

    return () => (isSubscribed = false);
  }, [props.match.params.id, props.user.id]);

  return (
    <div className={"question-detail-page"}>
      <div className={"header"}>
        <PageHeader
          onBack={() => props.history.goBack()}
          title="Go Back"
          subTitle=""
        />
        <img alt={"randomtext"} src={"https://source.unsplash.com/random"} />
        <div className={"overlay"} />
        <div className={"user-data"}>
          <Skeleton loading={isLoadingData} active paragraph={{ rows: 2 }}>
            <Avatar
              icon={"user"}
              size={100}
              src={
                user.avatar_url ? backUrl + "/storage/" + user.avatar_url : null
              }
            />
            <div className="infos">
              <h1>{question.title}</h1>
            </div>
            <Badge count={questionLikeCount} overflowCount={999}>
              <Button
                  size={"large"}
                className={liked ? "liked" : ""}
                onClick={event => addLikeOnClick(event)}
              >
                Like <Icon theme={liked ? "filled" : ""} type="like" />
              </Button>
            </Badge>
          </Skeleton>
        </div>
      </div>
      <div className="content">
        <div className="user-info">
          <Icon type="global" />
          <Typography.Title level={4}>{question.description}</Typography.Title>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = reduxStore => {
  return {
    questions: reduxStore.questionsReducer.questions,
    user: reduxStore.authReducer.user
  };
};
export default connect(
  mapStateToProps,
  { addLikeToQuestion, removeLikeFromQuestion }
)(QuestionDetails);
