import React, { Component } from "react";
import axios from "axios";
import sizeMe from "react-sizeme";
import { Card, Avatar, Divider, Button } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import StackGrid from "react-stack-grid";
const { Meta } = Card;
class PaginateGrid extends Component {
  state = {
    loading: true,
    data: [],
    pageNumber: 1,
    items: 30
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
          //   pageNumber: this.state.pageNumber + 1,
          loading: false
        })
      );
  };

  onChange = () => {
    // console.log(current);
    this.setState(
      {
        pageNumber: this.state.pageNumber + 1,
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
        {/* <Spin
          className="grid-spinner-paginate"
          spinning={this.state.loading}
          size="large"
        /> */}
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
        <Divider />

        <div className="text-center">
          {this.state.loading ? (
            <button className="spin-holder" disabled="true">
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

export default sizeMe()(PaginateGrid);
