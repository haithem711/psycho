import React from "react";
import AdvisorCard from "../advisor-card/AdvisorCard";
import { withRouter } from "react-router-dom";
import "./advisors-list.scss";
import { Typography, Spin, Empty, Icon, Pagination } from "antd";
import { connect } from "react-redux";
import {
  fetchAdvisors,
  clearAdvisors
} from "../../actions/advisors-actions/actions";
import {
  loadingPageAction,
  hideProgressBar
} from "../../actions/global-status-actions/actions";

const { Title } = Typography;

class AdvisorsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPageChange = async page => {
    if (!this.props.isLoading && !this.props.isSendingRequest) {
      await this.props.clearAdvisors();
      await this.props.fetchAdvisors("/users/advisors?page=" + page);
    }
  };
  componentDidMount() {
    (async () => {
      if (!this.props.isSendingRequest && !this.props.isLoading) {
        await this.props.loadingPageAction();
        await this.props.clearAdvisors();
        await this.props.fetchAdvisors("/users/advisors");
        this.props.hideProgressBar();
      }
    })();
  }

  render() {
    return (
      <div className="advisors-list" id={"scroll-parent-advisors"}>
        <Title level={2} className={"title"}>
          Top Advisors
        </Title>

        <div className="list-of-advisors">
          {!this.props.advisors.length > 0 && !this.props.isLoading ? (
            <Empty description={false} />
          ) : null}

          {this.props.isLoading === true ? (
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
          ) : (
            this.props.advisors.map((ele, index) => (
              <AdvisorCard
                animationDelay={index * 0.1}
                userId={ele.id}
                key={index}
                isOnline={ele.online}
                description={ele.about}
                rating={parseInt(ele.rating)}
                photo={ele.avatar_url}
                advisorName={ele.first_name + " " + ele.last_name}
                dicussWithId={ele.id}
              />
            ))
          )}
          <Pagination
            onChange={this.onPageChange}
            defaultCurrent={1}
            defaultPageSize={6}
            total={this.props.total}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    advisors: reduxStore.advisorsReducer.advisors,
    total: reduxStore.advisorsReducer.total,
    isLoading: reduxStore.advisorsReducer.isLoading,
    isMakingRequest: reduxStore.advisorsReducer.isMakingRequest
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { fetchAdvisors, clearAdvisors, loadingPageAction, hideProgressBar }
  )(AdvisorsList)
);
