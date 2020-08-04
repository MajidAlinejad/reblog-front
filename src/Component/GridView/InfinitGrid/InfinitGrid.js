import React, { Component } from "react";
import axios from "axios";
import sizeMe from "react-sizeme";
import { Spin } from "antd";
import Masonry from "react-masonry-css";

import InfiniteScroll from "react-infinite-scroller";
import GridItem from "../../ItemBase/GridItem/GridItem";
import PlayItem from "../../ItemBase/PlayItem/PlayItem";
import PostItem from "../../ItemBase/Post/PostItem";
import ProductItem from "../../ItemBase/ProductItem/ProductItem";
import { connect } from "react-redux";
class InfiniteGrid extends Component {
  state = {
    // items: [],
    loading: true,
    data: [],
    pageNumber: 1,
    items: 5,
    hasMore: true,
    className: "my-masonry-grid",
    width: {
      default: 5,
      1100: 3,
      700: 2,
      500: 2
    }
  };

  getItems = () => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_page=${this.state.pageNumber}&_limit=${this.state.items}`
      )
      .then(res =>
        this.setState({
          //updating data
          data: [...this.state.data, ...res.data],
          //updating page numbers
          pageNumber: this.state.pageNumber + 1,
          loading: false
        })
      );
  };

  getWidth = w => {
    let columnWidth;
    let className;
    if (this.props.custom) {
      columnWidth = w <= 870 ? 220 : 300;
    } else if (this.props.base == "video") {
      className = "my-masonry-grid-video";
      columnWidth = {
        default: 4,
        1100: 3,
        700: 2,
        500: 2
      };
    } else if (this.props.base == "music") {
      className = "my-masonry-grid-music";
      columnWidth = {
        default: 5,
        1440: 4,
        1024: 3,
        700: 2
      };
    } else if (this.props.base == "podcast") {
      className = "my-masonry-grid-podcast";
      columnWidth = {
        default: 5,
        1440: 4,
        1024: 3,
        700: 2
      };
    } else if (this.props.base == "post") {
      className = "my-masonry-grid-post";
      columnWidth = {
        default: 5,
        1440: 4,
        1100: 3,
        850: 2,
        600: 1
      };
    } else if (this.props.base == "product") {
      className = "my-masonry-grid-product";
      columnWidth = {
        default: 5,
        1440: 4,
        1100: 3,
        850: 2,
        600: 1
      };
    } else {
      className = "my-masonry-grid-img";
      columnWidth = {
        default: 4,
        1100: 3,
        700: 2,
        500: 2
      };
    }
    this.setState({
      width: columnWidth,
      className: className
    });
  };

  componentDidMount() {
    this.getWidth();
  }
  render() {
    const { custom, base, user, product } = this.props;

    return (
      <div className="stack-grid">
        {this.state.loading ? (
          <Spin className="grid-spinner" size="large" />
        ) : (
          <Masonry
            breakpointCols={this.state.width}
            className={this.state.className}
            columnClassName="my-masonry-grid_column"
          >
            {this.state.data.map(function(item) {
              return (
                <div key={item.id}>
                  {base == "img" && (
                    <GridItem
                      item={item}
                      base={base}
                      user={user}
                      custom={custom}
                    />
                  )}
                  {base == "video" && (
                    <GridItem
                      item={item}
                      base={base}
                      user={user}
                      custom={custom}
                    />
                  )}
                  {base == "music" && (
                    <PlayItem
                      item={item}
                      base={base}
                      user={user}
                      custom={custom}
                    />
                    // <DataItem />
                  )}
                  {base == "podcast" && (
                    <PlayItem
                      item={item}
                      base={base}
                      user={user}
                      custom={custom}
                    />
                  )}
                  {base == "post" && (
                    <PostItem
                      item={item}
                      base={base}
                      user={user}
                      custom={custom}
                    />
                  )}
                  {base == "product" && (
                    <ProductItem
                      item={item}
                      product={product}
                      base={base}
                      user={user}
                    />
                  )}
                </div>
              );
            })}
          </Masonry>
        )}
        <InfiniteScroll
          pageStart={0}
          // threshold={100}
          loadMore={this.getItems}
          hasMore={this.state.hasMore}
          loader={<Spin className="infinit-spinner" />}
        ></InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps)(sizeMe()(InfiniteGrid));
