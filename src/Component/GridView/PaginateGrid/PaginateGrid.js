import React, { Component } from "react";
import axios from "axios";
import sizeMe from "react-sizeme";
import { Card, Avatar, Spin, Pagination, Divider } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons";
import StackGrid from "react-stack-grid";
const { Meta } = Card;
class PaginateGrid extends Component {
  state = {
    loading: true,
    data: [],
    pageNumber: 1,
    items: 30,
    hasMore: true,
    current: 1,
    perPage: 10
  };

  getItems = () => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_page=${this.state.pageNumber}&_limit=${this.state.items}`
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

  componentDidMount() {
    this.getItems();
  }
  render() {
    const {
      size: { width }
    } = this.props;
    return (
      <div className="stack-grid">
        <Spin
          className="grid-spinner-paginate"
          spinning={this.state.loading}
          size="large"
        />

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
                  className="grid-blog-card"
                  cover={<img alt="example" src={item.thumbnailUrl} />}
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

        <Divider />
        <Pagination
          onChange={this.onChange}
          className="center-paginate"
          onShowSizeChange={this.onShowSizeChange}
          defaultCurrent={1}
          defaultPageSize={30}
          total={200}
        />
      </div>
    );
  }
}

export default sizeMe()(PaginateGrid);
