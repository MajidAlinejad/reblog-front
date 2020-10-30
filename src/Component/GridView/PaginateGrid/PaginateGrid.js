import React, { Component } from "react";
import axios from "axios";
import sizeMe from "react-sizeme";
import { Spin, Pagination, Divider, Empty, Radio } from "antd";
import Masonry from "react-masonry-css";
import GridItem from "../../ItemBase/GridItem/GridItem";
import PostItem from "../../ItemBase/Post/PostItem";
import PlayItem from "../../ItemBase/PlayItem/PlayItem";
import { connect } from "react-redux";
import ProductItem from "../../ItemBase/ProductItem/ProductItem";
import { getUser } from "../../../Redux/Action/User";
import { AlignRightOutlined } from "@ant-design/icons";

class PaginateGrid extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }
  state = {
    items: 30,
    hasMore: true,
    current: 1,
    perPage: 30,
    order: "",
    loading: true,
    total: 100,
    category: null,
    tags: [],
    price: [],
    brands: [],
    params: [],
    empty: false,
    data: [],
    pageNumber: 1,
    className: "my-masonry-grid",
    width: {
      default: 5,
      1100: 3,
      700: 2,
      500: 2
    }
  };

  getItems = () => {
    this.props.getUser();
    this._isMounted &&
      axios
        .post(
          process.env.REACT_APP_API_URL +
            "posts/" +
            this.props.id +
            `?per_page=${this.state.perPage}&page=${this.state.pageNumber}`,
          {
            params: this.state.params,
            category: this.state.category,
            brands: this.state.brands,
            tags: this.state.tags,
            order: this.state.order,
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

  chengeOrder = e => {
    // console.log(e.target.value);
    this.setState(
      {
        order: e.target.value,
        loading: true
      },
      () => {
        this.getItems();
      }
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

  getWidth = w => {
    let siderOn = 0;
    let innerWin = this.props.size.width;
    let screenWin = window.innerWidth;
    if (innerWin + 4 < screenWin) siderOn = 1;
    // console.log(innerWin, screenWin, siderOn);
    let columnWidth;
    let className;
    if (this.props.custom) {
      columnWidth = w <= 870 ? 220 : 300;
    } else if (this.props.base === "video") {
      className = "my-masonry-grid-video";
      columnWidth = {
        default: 4,
        1440: 4 - siderOn,
        1100: 3 - siderOn,
        1099: 3,
        700: 2,
        500: 2,
        400: 1
      };
    } else if (this.props.base === "music") {
      className = "my-masonry-grid-music";
      columnWidth = {
        default: 5,
        1440: 4 - siderOn,
        1100: 3 - siderOn,
        1099: 3,
        1024: 3,
        500: 2,
        400: 1
      };
    } else if (this.props.base === "podcast") {
      className = "my-masonry-grid-podcast";
      columnWidth = {
        default: 5,
        1440: 4 - siderOn,
        1100: 3 - siderOn,
        1099: 3,
        1024: 3,
        500: 2,
        400: 1
      };
    } else if (this.props.base === "post") {
      className = "my-masonry-grid-post";
      columnWidth = {
        default: 5,
        1440: 4 - siderOn,
        1100: 3 - siderOn,
        1099: 3,
        850: 2,
        600: 1
      };
    } else if (this.props.base === "product") {
      className = "my-masonry-grid-product";
      columnWidth = {
        default: 5,
        1440: 4 - siderOn,
        1100: 3 - siderOn,
        1099: 3,
        850: 2,
        600: 1,
        500: 1
      };
    } else {
      className = "my-masonry-grid-img";
      columnWidth = {
        default: 4,
        1440: 4 - siderOn,
        1100: 3 - siderOn,
        1099: 3,
        700: 2,
        500: 2,
        400: 1
      };
    }
    this._isMounted &&
      this.setState({
        width: columnWidth,
        className: className
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.size !== this.props.size) {
      this._isMounted && this.getWidth();
    }

    if (prevProps.tags !== this.props.tags) {
      // console.log(this.state.category);
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
            // perPage: 4,
            total: 100
          },
          () => {
            this._isMounted && this.getItems();
          }
        );
    }

    if (prevProps.category !== this.props.category) {
      this._isMounted &&
        this.setState(
          {
            data: [],
            current: 1,
            // perPage: 4,
            total: 100,
            loading: true,
            items: 5,
            category: this.props.category
          },
          () => {
            this._isMounted && this.getItems();
          }
        );
    }

    if (prevProps.brands !== this.props.brands) {
      this._isMounted &&
        this.setState(
          {
            data: [],
            loading: true,
            // hasMore: true,
            pageNumber: 1,
            items: 5,
            brands: this.props.brands
          },
          () => {
            this._isMounted && this.getItems();
          }
        );
    }

    if (prevProps.params !== this.props.params) {
      this._isMounted &&
        this.setState(
          {
            data: [],
            loading: true,
            // hasMore: true,
            pageNumber: 1,
            items: 5,
            params: this.props.params
          },
          () => {
            this._isMounted && this.getItems();
          }
        );
    }

    if (prevProps.price !== this.props.price) {
      this._isMounted &&
        this.setState(
          {
            data: [],
            loading: true,
            // hasMore: true,
            pageNumber: 1,
            items: 5,
            price: this.props.price
          },
          () => {
            this._isMounted && this.getItems();
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
            order: "",
            current: 1,
            pageNumber: 1,
            // perPage: 4,
            total: 100
          },
          () => {
            this.getItems();
          }
        );
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getItems();
    this._isMounted && this.getWidth();
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
    //   empty: null,
    //   category: null,
    //   tags: null
    // });
  }
  render() {
    const { custom, base, user, product } = this.props;
    return (
      <div className="stack-grid">
        <Spin
          className="grid-spinner-paginate"
          spinning={this.state.loading}
          size="large"
        />
        {!this.state.empty ? (
          <React.Fragment>
            <div className="control-panel">
              <AlignRightOutlined />
              مرتب سازی بر اساس :
              <Radio.Group
                onChange={this.chengeOrder}
                defaultValue="expire"
                buttonStyle="solid"
              >
                <Radio.Button value="created_at">جدید ترین</Radio.Button>
                <Radio.Button value="like">محبوب ترین</Radio.Button>
                {base === "product" && (
                  <React.Fragment>
                    <Radio.Button value="expire">کمترین زمان</Radio.Button>
                    <Radio.Button value="costly">گران ترین</Radio.Button>
                    <Radio.Button value="cheap">ارزان ترین</Radio.Button>
                    <Radio.Button value="off">بیشترین تخفیف</Radio.Button>
                  </React.Fragment>
                )}
              </Radio.Group>
            </div>
            <Masonry
              breakpointCols={this.state.width}
              className={this.state.className}
              columnClassName="my-masonry-grid_column"
            >
              {this.state.data.map(function(item) {
                return (
                  <div key={item.id}>
                    {base === "img" && (
                      <GridItem
                        item={item}
                        base={base}
                        user={user}
                        custom={custom}
                      />
                    )}
                    {base === "video" && (
                      <GridItem
                        item={item}
                        base={base}
                        user={user}
                        custom={custom}
                      />
                    )}
                    {base === "music" && (
                      <PlayItem
                        item={item}
                        base={base}
                        user={user}
                        custom={custom}
                      />
                    )}
                    {base === "podcast" && (
                      <PlayItem
                        item={item}
                        base={base}
                        user={user}
                        custom={custom}
                      />
                    )}
                    {base === "post" && (
                      <PostItem
                        item={item}
                        base={base}
                        user={user}
                        custom={custom}
                      />
                    )}
                    {base === "product" && (
                      <ProductItem
                        item={item}
                        product={product}
                        base={base}
                        user={user}
                      />
                    )}
                    {/* <PostItem item={item} /> */}
                  </div>
                );
              })}
            </Masonry>
          </React.Fragment>
        ) : (
          <Empty description={false} />
        )}
        <Divider />
        <Pagination
          onChange={this.onChange}
          className={
            this.state.loading ? "center-paginate hide" : "center-paginate"
          }
          onShowSizeChange={this.onShowSizeChange}
          hideOnSinglePage={true}
          responsive={true}
          defaultCurrent={1}
          current={this.state.current}
          defaultPageSize={this.state.perPage}
          total={this.state.total}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    sidebar: state.view.sidebar,
    tags: state.filter.tags,
    category: state.filter.category,
    brands: state.filter.brands,
    params: state.filter.params,
    price: state.filter.price
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
)(sizeMe()(PaginateGrid));
// export default sizeMe()(PaginateGrid);
