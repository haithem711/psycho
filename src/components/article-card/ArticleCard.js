import React, { useEffect, useState } from "react";
import { Badge, Icon } from "antd";
import "./article-card.scss";
import axiosInstance from "../../config/axios-instance";
import { apiUrl, backUrl } from "../../config/api";
import { connect } from "react-redux";
import {
  addLikeToArticle,
  removeLikeFromArticle
} from "../../actions/articles-actions/actions";
import { Avatar } from "antd/es";
import {Link} from "react-router-dom";

const ArticleCard = props => {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const addLikeOnClick = async event => {
    event.preventDefault();
    if (liked) {
      if (props.article.liked_by_me) {
        props.removeLikeFromArticle(props.articles, {
          user_id: props.user.id,
          like_for: "article",
          like_for_id: props.article.id,
          like_id: props.article.like_id
        });
      }
      await setLiked(false);
    } else {
      if (!props.article.liked_by_me) {
        await props.addLikeToArticle(props.articles, {
          user_id: props.user.id,
          like_for: "article",
          like_for_id: props.article.id
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
          setLiked(props.article.liked_by_me);
          const responseUser = await axiosInstance({
            method: "get",
            url: apiUrl + "/users/" + props.article.user_id,
            data: null
          });
          if (isSubscribed) {
            let image =new Image();
            image.src=await document.getElementById("image-article"+props.article.id).src;
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
  }, [props.user.id, props.article.liked_by_me, props.article.user_id, props.article.id]);
  return (
      <Link
          to={"/article/" + props.article.id}
          className="article"
          style={{
            animationDelay: `${props.animationDelay * 0.1}s`
          }}
      >
      <div className="overlay">
        <div className="cover">
          <img
              id={'image-article'+props.article.id}
            style={{
              filter: !imageLoaded && isLoading ? "blur(5px)" : "blur(0px)"
            }}
            alt={props.title}
            src={props.article.picture ? backUrl+"/storage/"+props.article.picture :
            "https://source.unsplash.com/1" +
              props.animationDelay +
              "0x" +
              props.animationDelay +
              "0"
            }
          />
        </div>
        <div className="card-content">
          <Avatar
            className={"avatar-article-card"}
            icon={"user"}
            size={40}
            src={
              user && user.avatar_url
                ? backUrl + "/storage/" + user.avatar_url
                : null
            }
          />

          <h3>{props.title} </h3>
          <div className="content-actions">
            <p>{props.description} </p>
            <div className="actions">
              <Badge
                count={props.article.likes_count}
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
          </div>
        </div>
      </div>
    </Link>
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
)(ArticleCard);
