import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios-instance";
import { apiUrl, backUrl } from "../../config/api";
import { Badge, Button, Icon, PageHeader, Skeleton, Typography } from "antd";
import "./article-details-page.scss";
import { connect } from "react-redux";
import {
  addLikeToArticle,
  removeLikeFromArticle
} from "../../actions/articles-actions/actions";
import { Avatar } from "antd/es";
const ArticleDetailsPage = props => {
  const [article, setArticle] = useState({});
  const [isLoadingData, setIsloadingData] = useState(true);
  const [liked, setLiked] = useState(false);
  const [articleLikeCount, setArticleLikeCount] = useState(0);
  const [user, setUser] = useState({});
  const addLikeOnClick = async event => {
    event.preventDefault();
    if (article.liked_by_me || liked) {
      const responseArticle = await axiosInstance({
        method: "get",
        url:
          apiUrl +
          "/articles/" +
          props.match.params.id +
          "?id=" +
          props.user.id,
        data: null
      });
      await props.removeLikeFromArticle(props.articles, {
        user_id: props.user.id,
        like_for: "article",
        like_for_id: responseArticle.data.id,
        like_id: responseArticle.data.like_id
      });
      if (articleLikeCount > 0) setArticleLikeCount(articleLikeCount - 1);

      setLiked(false);
    } else {
      await props.addLikeToArticle(props.articles, {
        user_id: props.user.id,
        like_for: "article",
        like_for_id: article.id
      });
      setArticleLikeCount(articleLikeCount + 1);
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
        const articleResponse = await axiosInstance({
          method: "get",
          url:
            apiUrl +
            "/articles/" +
            props.match.params.id +
            "?id=" +
            props.user.id,
          data: null
        });
        const responseUser = await axiosInstance({
          method: "get",
          url: apiUrl + "/users/" + articleResponse.data.user_id,
          data: null
        });
        const setTheUser = setUser(responseUser.data);
        const setTheArticle = setArticle(articleResponse.data);
        const setTheLike = setLiked(articleResponse.data.liked_by_me);
        const setLikeCount = setArticleLikeCount(
          articleResponse.data.likes_count
        );
        return await Promise.all([
          setTheLike,
          setTheArticle,
          setLikeCount,
          responseUser,
          setTheUser
        ]).then(() => setIsloadingData(false));
      })();
    }

    return () => (isSubscribed = false);
  }, [props.match.params.id, props.user.id]);

  return (
    <div className={"article-detail-page"}>
      <div className={"header"}>
        <PageHeader
          onBack={() => props.history.goBack()}
          title="Go Back"
          subTitle=""
        />
        <img
          alt={"randomtext"}
          src={
            article.picture
              ? backUrl + "/storage/" + article.picture
              : "https://source.unsplash.com/random"
          }
        />
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
              <h1>{article.title}</h1>
            </div>
            <Badge count={articleLikeCount} overflowCount={999}>
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
          <Typography.Title level={4}>{article.description}</Typography.Title>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = reduxStore => {
  return {
    articles: reduxStore.articlesReducer.articles,
    user: reduxStore.authReducer.user
  };
};
export default connect(
  mapStateToProps,
  { addLikeToArticle, removeLikeFromArticle }
)(ArticleDetailsPage);
