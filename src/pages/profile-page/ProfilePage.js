import React, {useEffect, useState} from "react";
import "./profile-page.scss";
import {Avatar, Skeleton, Typography, Icon, PageHeader} from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { apiUrl, backUrl } from "../../config/api";
import { loadingPageAction, hideProgressBar } from "../../actions/global-status-actions/actions";
import axiosInstance from "../../config/axios-instance";

const ProfilePage = (props) => {
  const [user, setUser]=useState({});
  const [isLoadingData, setIsloadingData]=useState(true);

  useEffect(()=>{
    window.scrollTo({ top: 0});
    let isSubscribed = true;
        (async function () {
          if(isSubscribed){
            const response = await axiosInstance({
              method: "get",
              url: apiUrl + "/users/" + props.match.params.id,
              data: null
            });
            await setUser(response.data);
            await setIsloadingData(false);
          }
          return () => (isSubscribed = false);
        })()
    return () => (isSubscribed = false);
  },[props.match.params.id]);
  return (
      <div className={"profile-page"}>

        <div className={"header"}>
          <PageHeader onBack={() => props.history.goBack()} title="Go Back" subTitle="" />
          <img alt={"randomtext"} src={"https://source.unsplash.com/random"} />
          <div className={"overlay"} />
          <div className={"user-data"}>
            <Skeleton loading={isLoadingData} active avatar={{
              size:100
            }} paragraph={{ rows: 2 }} >
              <Avatar
                  shape="square"
                  size={100}
                  icon={"user"}
                  src={
                    user.avatar_url
                        ? backUrl + "/storage/" + user.avatar_url
                        : null
                  }
              />
              <div className="infos">
                <h1>{user.first_name + " " + user.last_name}</h1>
                <div className="balance">
                  <Typography.Title level={4}>Balance: {10}</Typography.Title><Icon type="dollar" />
                </div>
              </div>
            </Skeleton>
          </div>
        </div>
        <div className="content">
          <div className="user-info">
            <Icon type="info-circle" /><Typography.Title level={4}>{user.about}</Typography.Title>
          </div>
          <div className="user-info">
            <Icon type="global" /><Typography.Title level={4}>{user.nationality}</Typography.Title>
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = reduxStore => {
  return {
    user: reduxStore.authReducer.user,
    isLoggedIn: reduxStore.authReducer.isLoggedIn
  };
};

export default withRouter(connect(
    mapStateToProps,
    {loadingPageAction, hideProgressBar}
)(withRouter(ProfilePage)));
