import React, { Component } from "react";
import axios from "axios";
import sizeMe from "react-sizeme";
import { Spin, Pagination, Divider } from "antd";
import Masonry from "react-masonry-css";

import GridItem from "../../ItemBase/GridItem/GridItem";
import PostItem from "../../ItemBase/Post/PostItem";
import PlayItem from "../../ItemBase/PlayItem/PlayItem";
import { connect } from "react-redux";
import ProductItem from "../../ItemBase/ProductItem/ProductItem";
import { getUser } from "../../../Redux/Action/User";

class PaginateGrid extends Component {
  state = {
    loading: true,
    data: [],
    pageNumber: 1,
    items: 30,
    hasMore: true,
    current: 1,
    perPage: 10,
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
    axios
      .get(
        process.env.REACT_APP_API_URL + "posts/1"
        // `https://jsonplaceholder.typicode.com/photos?_page=${this.state.pageNumber}&_limit=${this.state.items}`
      )
      .then(
        res =>
          this.setState({
            data: res.data,
            loading: false
          }),
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      );
  };

  onChange = current => {
    this.setState(
      {
        pageNumber: current,
        loading: true
      },
      this.getItems
    );
  };

  onShowSizeChange = (current, perPage) => {
    this.setState(
      {
        items: perPage,
        pageNumber: current,
        loading: true
      },
      this.getItems
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
    this.setState({
      width: columnWidth,
      className: className
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.size !== this.props.size) {
      this.getWidth();
    }
  }

  componentDidMount() {
    this.getItems();
    this.getWidth();
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
          defaultPageSize={30}
          total={200}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    sidebar: state.view.sidebar
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
