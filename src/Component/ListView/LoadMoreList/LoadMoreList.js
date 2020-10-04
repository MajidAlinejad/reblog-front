import React, { Component } from "react";

import axios from "axios";
import { Divider, Button, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ListItem from "../../ItemBase/ListItem/ListItem";
import { connect } from "react-redux";
import FreeForm from "../../ItemBase/Post/FreeForm";

class LoadMoreList extends Component {
  constructor(props) {
    super(props);
    this.L_isMounted = false;
  }
  state = {
    loading: true,
    data: [],
    pageNumber: 1,
    simpleList: false,
    items: 5,
    hasMore: true,
    empty: false,
    img: true,
    category: null,
    tags: [],
    description: true,
    avatar: true,
    social: true,
    block: true,
    optInfo: false
  };

  getMoreItems = () => {
    const { category } = this.state;
    this.L_isMounted &&
      axios
        .get(
          process.env.REACT_APP_API_URL +
            "posts/" +
            this.props.id +
            `?per_page=${this.state.items}&page=${this.state.pageNumber}` +
            `&cat=${category && category}` +
            `&tags=${this.state.tags ? this.state.tags : ""}`
        )
        .then(res => {
          res.data.data[0] &&
            res.data.data[0].blog_id === parseInt(this.props.id) &&
            this.L_isMounted &&
            this.setState({
              data: [...this.state.data, ...res.data.data],
              hasMore: res.data.next_page_url,
              loading: false
            });
        });
  };

  getItems = (items, pageNumber, category) => {
    this.L_isMounted &&
      axios
        .get(
          process.env.REACT_APP_API_URL +
            "posts/" +
            this.props.id +
            `?per_page=${items ? items : this.state.items}&page=${
              pageNumber ? pageNumber : this.state.pageNumber
            }` +
            `&cat=${category ? category : ""}` +
            `&tags=${this.state.tags ? this.state.tags : ""}`
        )
        .then(res =>
          res.data.data[0] &&
          res.data.data[0].blog_id === parseInt(this.props.id) &&
          this.L_isMounted &&
          res.data.data.length > 0
            ? this.setState({
                empty: !parseInt(res.data.total),
                data: res.data.data,
                hasMore: res.data.next_page_url,
                loading: false
              })
            : this.setState({
                empty: !parseInt(res.data.total),
                hasMore: res.data.next_page_url,
                loading: false
              })
        );
  };

  onChange = () => {
    // console.log(current);
    this.state.hasMore &&
      this.L_isMounted &&
      this.setState(
        {
          pageNumber: this.state.pageNumber + 1,
          loading: true
        },
        this.L_isMounted && this.getMoreItems
      );
  };

  componentDidUpdate(prevProps) {
    if (prevProps.tags !== this.props.tags) {
      console.log(this.state.category);
      this.L_isMounted &&
        this.setState(
          {
            tags: this.props.tags,
            data: [],
            loading: true,
            // hasMore: true,
            pageNumber: 1,
            items: 5
          },
          () => {
            this.L_isMounted &&
              this.getItems(
                this.state.items,
                this.state.pageNumber,
                this.state.category
              );
          }
        );
    }

    if (prevProps.category !== this.props.category) {
      this.L_isMounted &&
        this.setState(
          {
            data: [],
            loading: true,
            // hasMore: true,
            pageNumber: 1,
            category: null,
            items: 5,
            category: this.props.category
          },
          () => {
            this.L_isMounted &&
              this.getItems(
                this.state.items,
                this.state.pageNumber,
                this.props.category
              );
          }
        );
    }
    if (prevProps.id !== this.props.id) {
      this.L_isMounted &&
        this.setState(
          {
            data: [],
            hasMore: true,
            pageNumber: 1,
            items: 5
          },
          this.L_isMounted && this.getItems(5, 1)
        );
    }
  }

  componentDidMount() {
    this.L_isMounted = true;
    this.L_isMounted && this.getItems();
  }

  componentWillUnmount() {
    this.L_isMounted = false;
    this.setState({
      loading: null,
      data: null,
      pageNumber: null,
      simpleList: null,
      img: null,
      items: null,
      description: null,
      hasMore: null,
      avatar: null,
      current: null,
      tags: null,
      category: null,
      social: null,
      block: null,
      optInfo: null
    });
  }

  render() {
    const { custom, base, user } = this.props;

    return (
      <div className="stack-list">
        {!this.state.empty ? (
          <div className="list-container-loadmore">
            {this.state.data.map(function(item) {
              return (
                <div key={item.id}>
                  {base === "post" && (
                    <ListItem
                      item={item}
                      base={base}
                      user={user}
                      custom={custom}
                    />
                  )}
                  {base === "free" && (
                    <FreeForm
                      item={item}
                      base={base}
                      user={user}
                      custom={custom}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <Empty description={false} />
        )}
        <Divider />

        <div className="text-center">
          {this.state.loading ? (
            <button className="spin-holder" disabled={true}>
              <span>
                <LoadingOutlined
                  className="custom-fast-spin"
                  style={{ fontSize: 32 }}
                  spin
                />
              </span>
            </button>
          ) : (
            <Button
              type="primary"
              size="large"
              shape="round"
              disabled={this.state.hasMore ? false : true}
              onClick={this.onChange}
            >
              بیشتر
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    sidebar: state.view.sidebar,
    tags: state.filter.tags,
    category: state.filter.category
  };
};

export default connect(mapStateToProps)(LoadMoreList);
