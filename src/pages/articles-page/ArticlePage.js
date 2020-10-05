import React from "react";
import { connect } from "react-redux";
import {
  fetchArticles,
  clearArticles
} from "../../actions/articles-actions/actions";
import { Button, Typography, Icon, Empty, Spin, message } from "antd";
import {
  dynamicModalClose,
  dynamicModalOpen
} from "../../actions/dynamic-modal/actions";

import "./article-page.scss";
import AddArticle from "./AddArticle";
import InfiniteScroll from "react-infinite-scroller";
import ArticleCard from "../../components/article-card/ArticleCard";

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount  ()  {
    (async () => {
      let gettingData = new Promise(async (resolve, reject) => {
        if (!this.props.isSendingRequest) {
          await this.props.clearArticles();
          await this.props.fetchArticles("/articles?id=" + this.props.user.id);
          resolve("Enjoy our awesome content");
          reject("Error loading articles");
        }
      });
      await gettingData
          .then(null)
          .catch(value => {
            message.error(value);
          });
    })()
  };
  render() {
    return (
      <div className="article-page">
        <div className={"navitems-articles-container"}>
          <Typography.Title>Articles</Typography.Title>
          {this.props.isLoggedIn === true ? (
            <Button
              className={"add-btn"}
              type="primary"
              size={"large"}
              onClick={() => this.props.dynamicModalOpen()}
            >
              <Icon type={"plus"} />
            </Button>
          ) : null}
          {this.props.isAddModalOpen ? <AddArticle /> : null}
        </div>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={() => this.props.fetchArticles(this.props.next_page_url)}
          hasMore={!this.props.isLoading && this.props.hasMore}
          useWindow={true}
          element={"section"}
        >
          <div className="articles">
            {!this.props.articles.length > 0 &&
            this.props.isLoading === false ? (
              <Empty description={false} />
            ) : null}
            {this.props.articles.map((ele, index) => (
              <ArticleCard
                article={ele}
                animationDelay={index}
                key={index}
                title={ele.title}
                description={ele.description}
              />
            ))}
            {this.props.isLoading && this.props.hasMore && (
              <div className="loading-container">
                <Spin />
              </div>
            )}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    articles: reduxStore.articlesReducer.articles,
    isAddModalOpen: reduxStore.dynamicModalReducer.isOpen,
    isLoggedIn: reduxStore.authReducer.isLoggedIn,
    next_page_url: reduxStore.articlesReducer.next_page_url,
    hasMore: reduxStore.articlesReducer.hasMore,
    isLoading: reduxStore.articlesReducer.isLoading,
    isSendingRequest: reduxStore.articlesReducer.isSendingRequest,
    user: reduxStore.authReducer.user
  };
};
export default connect(
  mapStateToProps,
  { fetchArticles, dynamicModalOpen, dynamicModalClose, clearArticles }
)(ArticlePage);
