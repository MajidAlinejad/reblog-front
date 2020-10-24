import React, { Component } from "react";
import { Spin, Pagination, Divider, Empty } from "antd";
import axios from "axios";
import ListItem from "../../ItemBase/ListItem/ListItem";
import { connect } from "react-redux";
import { getUser } from "../../../Redux/Action/User";

class PaginateList extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }
  state = {
    items: 30,
    hasMore: true,
    current: 1,
    perPage: 4,
    loading: true,
    total: 100,
    data: [],
    pageNumber: 1,
    simpleList: false,
    img: true,
    description: true,
    avatar: true,
    social: true,
    block: true,
    category: null,
    tags: [],
    empty: false,
    optInfo: false
  };

  getItems = (perPage, pageNumber, category) => {
    this.props.getUser();
    this._isMounted &&
      axios
        .post(
          process.env.REACT_APP_API_URL +
            "posts/" +
            this.props.id +
            `?per_page=${perPage ? perPage : this.state.perPage}&page=${
              pageNumber ? pageNumber : this.state.pageNumber
            }`,
          {
            params: this.state.params,
            category: this.state.category,
            brands: this.state.brands,
            tags: this.state.tags,
            price: this.state.price
          }
        )
        .then(res =>
          res.data.data[0] &&
          res.data.data[0].blog_id === parseInt(this.props.id) &&
          this._isMounted &&
          res.data.data.length > 0
            ? this.setState(
                {
                  empty: !parseInt(res.data.total),
                  data: res.data.data,
                  total: res.data.total,
                  loading: false
                },
                () => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                  });
                }
              )
            : this._isMounted &&
              this.setState({
                empty: !parseInt(res.data.total),
                total: parseInt(res.data.total),
                loading: false
              })
        );
  };

  onChange = current => {
    this._isMounted &&
      this.setState(
        {
          current: current,
          pageNumber: current,
          loading: true
        },
        this.getItems
      );
  };

  onShowSizeChange = (current, perPage) => {
    this._isMounted &&
      this.setState(
        {
          items: perPage,
          pageNumber: current,
          loading: true
        },
        this._isMounted && this.getItems
      );
  };

  componentDidUpdate(prevProps) {
    if (prevProps.tags !== this.props.tags) {
      console.log(this.state.category);
      this._isMounted &&
        this.setState(
          {
            tags: this.props.tags,
            data: [],
            loading: true,
            // hasMore: true,
            pageNumber: 1,
            items: 5,
            current: 1,
            perPage: 4,
            total: 100
          },
          () => {
            this._isMounted &&
              this.getItems(
                this.state.items,
                this.state.pageNumber,
                this.state.category
              );
          }
        );
    }

    if (prevProps.category !== this.props.category) {
      this._isMounted &&
        this.setState(
          {
            data: [],
            current: 1,
            perPage: 4,
            total: 100,
            loading: true,
            items: 5,
            category: this.props.category
          },
          () => {
            this._isMounted &&
              this.getItems(
                this.state.items,
                this.state.pageNumber,
                this.props.category
              );
          }
        );
    }

    if (prevProps.id !== this.props.id) {
      this._isMounted &&
        this.setState(
          {
            data: [],
            hasMore: true,
            items: 30,
            current: 1,
            pageNumber: 1,
            perPage: 4,
            total: 100
          },
          () => {
            this.getItems(4, 1);
          }
        );
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getItems();
  }

  componentWillUnmount() {
    this._isMounted = false;
    // this.setState({
    //   data: null,
    //   loading: null,
    //   pageNumber: null,
    //   items: null,
    //   hasMore: null,
    //   current: null,
    //   perPage: null,
    //   className: null,
    //   width: null,
    //   simpleList: null,
    //   img: null,
    //   description: null,
    //   avatar: null,
    //   social: null,
    //   block: null,
    //   empty: null,
    //   category: null,
    //   tags: null,
    //   optInfo: null
    // });
  }

  render() {
    const { custom, base, user } = this.props;

    return (
      <div className="stack-list">
        <Spin
          className="grid-spinner-paginate"
          spinning={this.state.loading}
          size="large"
        />
        {!this.state.empty ? (
          <div className="list-container-paginate">
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
                </div>
              );
            })}
          </div>
        ) : (
          <Empty description={false} />
        )}
        <Divider />

        <div className="text-center">
          <Divider />
          <Pagination
            onChange={this.onChange}
            className={
              this.state.loading ? "center-paginate hide" : "center-paginate"
            }
            hideOnSinglePage={true}
            responsive={true}
            onShowSizeChange={this.onShowSizeChange}
            current={this.state.current}
            defaultCurrent={1}
            defaultPageSize={this.state.perPage}
            total={this.state.total}
          />
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

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(getUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginateList);
