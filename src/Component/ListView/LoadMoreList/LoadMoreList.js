import React, { Component } from "react";

import axios from "axios";
import { List, Avatar, Divider, Button, Space } from "antd";
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  LoadingOutlined,
  CaretUpFilled,
  CaretDownFilled
} from "@ant-design/icons";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
export default class LoadMoreList extends Component {
  state = {
    loading: true,
    data: [],
    pageNumber: 1,
    simpleList: false,
    img: true,
    description: true,
    avatar: true,
    social: true,
    block: true,
    optInfo: false
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
          loading: false
        })
      );
  };

  onChange = () => {
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
    return (
      <div className="stack-list">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item
              className={
                this.state.block ? "list-block-larg" : "list-custom-larg"
              }
              key={item.id}
              actions={
                this.state.social
                  ? [
                      <IconText
                        icon={StarOutlined}
                        text="156"
                        key="list-vertical-star-o"
                      />,
                      <IconText
                        icon={LikeOutlined}
                        text="156"
                        key="list-vertical-like-o"
                      />,
                      <IconText
                        icon={MessageOutlined}
                        text="2"
                        key="list-vertical-message"
                      />
                    ]
                  : ""
              }
              //if
              extra={
                this.state.img ? (
                  <img alt="logo" src={item.thumbnailUrl} />
                ) : this.state.optInfo ? (
                  <div className="opt-info">
                    <span className="up">
                      <CaretUpFilled />
                      <span> 20%</span>
                    </span>
                    <span className="down">
                      <CaretDownFilled />
                      <span>5%</span>
                    </span>
                  </div>
                ) : null
              }
            >
              <List.Item.Meta
                avatar={
                  this.state.avatar ? <Avatar src={item.thumbnailUrl} /> : ""
                }
                title={<a href={item.href}>{item.title}</a>}
                description={this.state.description ? item.title : ""}
              />

              {this.state.simpleList ? "" : item.title}
            </List.Item>
          )}
        />

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
