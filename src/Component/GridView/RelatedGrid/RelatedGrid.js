import React, { Component } from "react";
import sizeMe from "react-sizeme";
import axios from "axios";
import { Divider, Button, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Masonry from "react-masonry-css";
import ProductItem from "../../ItemBase/ProductItem/ProductItem";
import PostItem from "../../ItemBase/Post/PostItem";
import PlayItem from "../../ItemBase/PlayItem/PlayItem";
import GridItem from "../../ItemBase/GridItem/GridItem";
import { connect } from "react-redux";

class RelatedGrid extends Component {
  constructor(props) {
    super(props);
    this.L_isMounted = false;
  }

  state = {
    loading: true,
    data: [],
    empty: false,
    hasMore: true,
    pageNumber: 1,
    category: "",
    tags: [],
    id: "",
    items: 5,
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
            this.state.id +
            `?per_page=${this.state.items}&page=${this.state.pageNumber}`,
          {
            params: "",
            category: this.state.category,
            brands: "",
            tags: this.state.tags,
            price: ""
          }
        )
        .then(
          res =>
            res.data.data[0] &&
            res.data.data[0].blog_id === parseInt(this.state.id) &&
            this.L_isMounted &&
            this.setState({
              data: [...this.state.data, ...res.data.data],
              hasMore: res.data.next_page_url,
              loading: false
            })
        );
  };

  getItems = (items, pageNumber) => {
    if (this.L_isMounted && this.state.id > 0) {
      axios
        .post(
          process.env.REACT_APP_API_URL +
            "posts/" +
            this.state.id +
            `?per_page=${items ? items : this.state.items}&page=${
              pageNumber ? pageNumber : this.state.pageNumber
            }`,
          {
            params: "",
            category: this.state.category,
            brands: "",
            tags: this.state.tags,
            price: ""
          }
        )
        .then(res =>
          res.data.data[0] &&
          res.data.data[0].blog_id === parseInt(this.state.id) &&
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
        className: className
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.size !== this.props.size) {
      this.L_isMounted && this.getWidth();
    }

    if (prevProps.id !== this.props.id) {
      this.L_isMounted &&
        this.setState(
          {
            id: this.props.id
          },
          () => this.getItems(this.state.items, this.state.pageNumber)
        );
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
            pageNumber: 1,
            items: 5
          },
          () => {
            this.L_isMounted &&
              this.getItems(this.state.items, this.state.pageNumber);
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
            items: 5,
            category: this.props.category
          },
          () => {
            this.L_isMounted &&
              this.getItems(this.state.items, this.state.pageNumber);
          }
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
  }

  render() {
    const { custom, base, user, product } = this.props;

    return (
      <div className="stack-grid">
        {!this.state.empty ? (
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
    tags: state.filter.tags,
    category: state.post.related
  };
};

export default connect(mapStateToProps)(sizeMe()(RelatedGrid));
