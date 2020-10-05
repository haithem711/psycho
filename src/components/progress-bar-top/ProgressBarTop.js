import React from 'react';
import {Progress} from "antd";
import "./progress-bar-top.scss";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const ProgressBarTop = (props) => {

    return (
        <div className={"progress-bar-top"} style={{
            opacity:props.isLoadingPage ? 1 :0
        }}>
            <Progress strokeColor={"#F8A36C"} percent={props.loadingProgress} showInfo={false} />
        </div>
    );
};

const mapStateToProps = reduxStore => {
    return {
        isLoadingPage: reduxStore.globalStatusReducer.isLoadingPage,
        loadingProgress:reduxStore.globalStatusReducer.loadingProgress
    };
};
export default withRouter(
    connect(
        mapStateToProps,
        {  }
    )(ProgressBarTop)
);

