import React, { Component } from "react";
import sizeMe from "react-sizeme";
import axios from "axios";
import { Divider, Button, Empty, Radio, Spin, Select } from "antd";
import { AlignRightOutlined, LoadingOutlined } from "@ant-design/icons";
import Masonry from "react-masonry-css";
import ProductItem from "../../ItemBase/ProductItem/ProductItem";
import PostItem from "../../ItemBase/Post/PostItem";
import PlayItem from "../../ItemBase/PlayItem/PlayItem";
import GridItem from "../../ItemBase/GridItem/GridItem";
import { connect } from "react-redux";
const { Option } = Select;
class LoadMoreGrid extends Component {
  constructor(props) {
    super(props);
    this.L_isMounted = false;
  }

  state = {
    loading: true,
    data: [],
    empty: false,
    hasMore: true,
    price: [],
    brands: [],
    params: [],
    order: "",
    pageNumber: 1,
    category: "",
    tags: [],
    items: 30,
    className: "my-masonry-grid",
    width: {
      default: 5,
      1100: 3,
      700: 2,
      500: 2
    }
  };

  getMoreItems = () => {
    const { category } = this.state;
    this.L_isMounted &&
      axios
        .post(
          process.env.REACT_APP_API_URL +
            "posts/" +
            this.props.id +
            `?per_page=${this.state.items}&page=${this.state.pageNumber}`,
          {
            params: this.state.params,
            category: this.state.category,
            brands: this.state.brands,
            tags: this.state.tags,
            price: this.state.price,
            order: this.state.order
          }
        )
        .then(
          res =>
            res.data.data[0] &&
            res.data.data[0].blog_id === parseInt(this.props.id) &&
            this.L_isMounted &&
            this.setState({
              data: [...this.state.data, ...res.data.data],
              hasMore: res.data.next_page_url,
              loading: false
            })
        );
  };

  getItems = () => {
    if (this.L_isMounted && this.props.id !== undefined) {
      axios
        .post(
          process.env.REACT_APP_API_URL +
            "posts/" +
            this.props.id +
            `?per_page=${this.state.items}&page=${this.state.pageNumber}`,
          {
            params: this.state.params,
            category: this.state.category,
            brands: this.state.brands,
            tags: this.state.tags,
            price: this.state.price,
            order: this.state.order
          }
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
            : this.L_isMounted &&
              this.setState({
                empty: !parseInt(res.data.total),
                hasMore: res.data.next_page_url,
                loading: false
              })
        );
    }
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

  chengeOrderSelect = v => {
    this.setState(
      {
        order: v,
        loading: true
      },
      () => {
        this.getItems();
      }
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
      if (this.props.siderPost) {
        columnWidth = {
          default: 1,
          1440: 1,
          1100: 1,
          1099: 3,
          850: 2,
          600: 1
        };
      } else {
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
    } else if (this.props.base === "music") {
      if (this.props.siderPost) {
        className = "my-masonry-grid-music sider-music";
        columnWidth = {
          default: 2,
          1440: 2,
          1100: 1,
          1099: 3,
          850: 2,
          600: 1
        };
      } else {
        className = "my-masonry-grid-music";
        columnWidth = {
          default: 5,
          1440: 4 - siderOn,
          1100: 3 - siderOn,
          1099: 3,
          1024: 3,
          700: 2,
          500: 2,
          400: 1
        };
      }
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
      if (this.props.siderPost) {
        className = "my-masonry-grid-post";
        columnWidth = {
          default: 1,
          1440: 1,
          1100: 1,
          1099: 3,
          850: 2,
          600: 1
        };
      } else {
        className = "my-masonry-grid-post";
        columnWidth = {
          default: 5,
          1440: 4 - siderOn,
          1100: 3 - siderOn,
          1099: 3,
          850: 2,
          600: 1
        };
      }
    } else if (this.props.base === "product") {
      className = "my-masonry-grid-product";
      columnWidth = {
        default: 5,
        1440: 4 - siderOn,
        1100: 3 - siderOn,
        1099: 3,
        850: 2,
        600: 1,
        320: 1
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
        320: 1
      };
    }
    this.L_isMounted &&
      this.setState({
        width: columnWidth,
        mobile: innerWin < 934 ? true : false,
        className: className
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.size !== this.props.size) {
      this.L_isMounted && this.getWidth();
    }

    if (prevProps.tags !== this.props.tags) {
      // console.log(this.state.category);
      this.L_isMounted &&
        this.setState(
          {
            tags: this.props.tags,
            data: [],
            loading: true,
            // hasMore: true,
            pageNumber: 1
            // items: 5
          },
          () => {
            this.L_isMounted && this.getItems();
          }
        );
    }

    if (prevProps.category !== this.props.category) {
      this.L_isMounted &&
        this.setState(
          {
            data: [],
            loading: true,
            params: [],
            pageNumber: 1,
            category: null,
            // items: 5,
            category: this.props.category
          },
          () => {
            this.L_isMounted && this.getItems();
          }
        );
    }

    if (prevProps.brands !== this.props.brands) {
      this.L_isMounted &&
        this.setState(
          {
            data: [],
            loading: true,
            // hasMore: true,
            pageNumber: 1,
            // items: 5,
            brands: this.props.brands
          },
          () => {
            this.L_isMounted && this.getItems();
          }
        );
    }

    if (prevProps.params !== this.props.params) {
      this.L_isMounted &&
        this.setState(
          {
            data: [],
            loading: true,
            // hasMore: true,
            pageNumber: 1,
            // items: 5,
            params: this.props.params
          },
          () => {
            this.L_isMounted && this.getItems();
          }
        );
    }

    if (prevProps.price !== this.props.price) {
      this.L_isMounted &&
        this.setState(
          {
            data: [],
            loading: true,
            // hasMore: true,
            pageNumber: 1,
            // items: 5,
            price: this.props.price
          },
          () => {
            this.L_isMounted && this.getItems();
          }
        );
    }

    if (prevProps.id !== this.props.id) {
      this.L_isMounted &&
        this.setState(
          {
            data: [],
            hasMore: true,
            order: "",
            empty: null,
            pageNumber: 1,
            category: null
            // items: 5
          },
          () => this.L_isMounted && this.getItems()
        );
    }
  }

  componentDidMount() {
    this.L_isMounted = true;
    if (this.props.id !== undefined) {
      this.L_isMounted && this.getItems();
    }
    this.L_isMounted && this.getWidth();
  }

  componentWillUnmount() {
    this.L_isMounted = false;
    // this.setState({
    //   data: null,
    //   loading: null,
    //   pageNumber: null,
    //   empty: null,
    //   items: null,
    //   hasMore: null,
    //   category: null,
    //   current: null,
    //   tags: null,
    //   perPage: null,
    //   className: null,
    //   width: null
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
              {this.state.mobile ? (
                <Select
                  className="select-order"
                  onChange={this.chengeOrderSelect}
                >
                  <Option value="created_at">جدید ترین</Option>
                  <Option value="like">محبوب ترین</Option>
                  {base === "product" && (
                    <React.Fragment>
                      <Option value="expire">کمترین زمان</Option>
                      <Option value="costly">گران ترین</Option>
                      <Option value="cheap">ارزان ترین</Option>
                      <Option value="off">بیشترین تخفیف</Option>
                    </React.Fragment>
                  )}
                </Select>
              ) : (
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
              )}
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
              disabled={this.state.hasMore ? false : true}
              shape="round"
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
    category: state.filter.category,
    brands: state.filter.brands,
    params: state.filter.params,
    price: state.filter.price
  };
};

export default connect(mapStateToProps)(sizeMe()(LoadMoreGrid));
