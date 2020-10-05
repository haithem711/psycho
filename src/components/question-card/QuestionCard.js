import React, { useEffect, useState } from "react";
import { Card, Icon, Badge } from "antd";
import "./question-card.scss";
import {
  addLikeToQuestion,
  removeLikeFromQuestion
} from "../../actions/questions-actions/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { apiUrl, backUrl } from "../../config/api";
import { Avatar } from "antd/es";
import axiosInstance from "../../config/axios-instance";

const { Meta } = Card;

const QuestionCard = props => {
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const addLikeOnClick = async event => {
    event.preventDefault();
    if (liked) {
      if (props.question.liked_by_me) {
        props.removeLikeFromQuestion(props.questions, {
          user_id: props.user.id,
          like_for: "question",
          like_for_id: props.question.id,
          like_id: props.question.like_id
        });
      }
      await setLiked(false);
    } else {
      if (!props.questions.liked_by_me) {
        await props.addLikeToQuestion(props.questions, {
          user_id: props.user.id,
          like_for: "question",
          like_for_id: props.question.id
        });
        await setLiked(true);
      }
    }
  };

  const setDoneLoading = async data => {
    await setUser(data);
    await setIsloading(false);
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      (async function() {
        if (isSubscribed) {
          setLiked(props.question.liked_by_me);
          const responseUser = await axiosInstance({
            method: "get",
            url: apiUrl + "/users/" + props.question.user_id,
            data: null
          });
          if (isSubscribed) {

            let image =new Image();
            image.src=await document.getElementById("image-question"+props.question.id).src;
            image.onload =async function() {
              await setImageLoaded(true);
              setDoneLoading(responseUser.data);
            };

          }
          return () => (isSubscribed = false);
        }
      })();
    }
    return () => (isSubscribed = false);
  }, [props.user.id, props.question.liked_by_me, props.question]);
  return (
    <Link
      to={"/question/" + props.question.id}
      className="question"
      style={{
        animationDelay: `${props.animationDelay * 0.1}s`
      }}
    >
      <div>
        <Card
          hoverable
          cover={
            <img
                id={'image-question'+props.question.id}
              style={{
                filter:!imageLoaded && isLoading ? "blur(5px)" : "blur(0px)"
              }}
              alt="example"
              src={
                props.question.image_url ||
                props.question.image_url !== "image goes here"
                  ? backUrl + "/storage/" + props.question.image_url
                  : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              }
            />
          }
        >
          <Avatar
            className={"avatar-question-card"}
            icon={"user"}
            size={40}
            src={
              user.avatar_url ? backUrl + "/storage/" + user.avatar_url : null
            }
          />
          <div className={"question-footer"}>
            <Meta
              title={props.question.title}
              description={props.question.description}
            />
            <Badge
              count={props.question.likes_count}
              overflowCount={999}
              style={{
                animationDelay: `${props.animationDelay * 0.2}s`
              }}
            >
              <div
                className={liked ? "btn-like liked" : "btn-like"}
                onClick={event => addLikeOnClick(event)}
              >
                <Icon theme={liked ? "filled" : ""} type="like" />
              </div>
            </Badge>
          </div>
        </Card>
      </div>
    </Link>
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
)(QuestionCard);
