import React, { Component } from "react";
import axios from "axios";
import sizeMe from "react-sizeme";
import { Card, Avatar, Spin } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons";
import StackGrid from "react-stack-grid";
import InfiniteScroll from "react-infinite-scroller";
const { Meta } = Card;
class InfiniteGrid extends Component {
  state = {
    // items: [],
    loading: true,
    data: [],
    pageNumber: 1,
    items: 5,
    hasMore: true
  };
  constructor(props) {
    super(props);
  }

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

  componentDidMount() {}
  render() {
    const {
      size: { width }
    } = this.props;
    return (
      <div className="stack-grid">
        {this.state.loading ? (
          <Spin className="grid-spinner" size="large" />
        ) : (
          <StackGrid
            gutterWidth={10}
            gutterHeight={10}
            columnWidth={width <= 500 ? 220 : 236}
            rtl={true}
          >
            {this.state.data.map(function(item) {
              return (
                <div key={item.id}>
                  <Card
                    // style={{ width: 240 }}
                    className="grid-blog-card"
                    cover={
                      <img
                        alt="example"
                        src={
                          item.thumbnailUrl
                            ? item.thumbnailUrl
                            : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        }
                      />
                    }
                    actions={[
                      <SettingOutlined key="setting" />,
                      <EditOutlined key="edit" />,
                      <EllipsisOutlined key="ellipsis" />
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={item.title}
                      description={"This is from Album number" + item.albumId}
                    />
                  </Card>
                </div>
              );
            })}
          </StackGrid>
        )}
        <InfiniteScroll
          pageStart={0}
          threshold={100}
          loadMore={this.getItems}
          hasMore={this.state.hasMore}
          loader={<Spin className="infinit-spinner" />}
        ></InfiniteScroll>
      </div>
    );
  }
}

export default sizeMe()(InfiniteGrid);
