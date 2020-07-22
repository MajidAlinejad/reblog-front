import React, { Component } from "react";
import { Spin, Pagination, Divider, List, Avatar, Space } from "antd";
import noPic from "../../../assets/picture/nopic.svg";
import axios from "axios";
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  CaretUpFilled,
  CaretDownFilled
} from "@ant-design/icons";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default class PaginateList extends Component {
  state = {
    items: 30,
    hasMore: true,
    current: 1,
    perPage: 10,
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
        process.env.REACT_APP_API_URL + "posts/" + 1 // firstblog
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

  componentDidMount() {
    this.getItems();
  }
  render() {
    return (
      <div className="stack-list">
        <Spin
          className="grid-spinner-paginate"
          spinning={this.state.loading}
          size="large"
        />
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
                  <img
                    alt="logo"
                    src={item.thumbnailUrl ? item.thumbnailUrl : noPic}
                  />
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
                  this.state.avatar ? (
                    <Avatar
                      src={item.thumbnailUrl ? item.thumbnailUrl : noPic}
                    />
                  ) : (
                    ""
                  )
                }
                title={<a href={item.href}>{item.title}</a>}
                description={this.state.description ? item.caption : ""}
              />

              {this.state.simpleList ? "" : item.title}
            </List.Item>
          )}
        />

        <Divider />

        <div className="text-center">
          <Divider />
          <Pagination
            onChange={this.onChange}
            className="center-paginate"
            onShowSizeChange={this.onShowSizeChange}
            defaultCurrent={1}
            defaultPageSize={20}
            total={200}
          />
        </div>
      </div>
    );
  }
}
