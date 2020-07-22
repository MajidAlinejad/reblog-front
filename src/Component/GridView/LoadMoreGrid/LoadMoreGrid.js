import React, { Component } from "react";
import sizeMe from "react-sizeme";
import noPic from "../../../assets/picture/nopic.svg";
import axios from "axios";
import { Card, Avatar, Divider, Button } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import StackGrid from "react-stack-grid";
const { Meta } = Card;
class LoadMoreGrid extends Component {
  state = {
    loading: true,
    data: [],
    pageNumber: 1,
    items: 30
  };

  getItems = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL + "posts/" + 1 // firstblog
        // +`?_page=${this.state.pageNumber}&_limit=${this.state.items}`

        // `https://jsonplaceholder.typicode.com/photos?_page=${this.state.pageNumber}&_limit=${this.state.items}`
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
          className="stack-grid-comp"
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
                      src={item.thumbnailUrl ? item.thumbnailUrl : noPic}
                    />
                  }
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />
                  ]}
                >
                  <Meta
                    avatar={<Avatar src={item.img ? item.img : noPic} />}
                    title={item.title}
                    description={item.caption}
                  />
                </Card>
              </div>
            );
          })}
        </StackGrid>
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

export default sizeMe()(LoadMoreGrid);
