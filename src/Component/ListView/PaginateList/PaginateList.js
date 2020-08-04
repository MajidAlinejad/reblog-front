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
import ListItem from "../../ItemBase/ListItem/ListItem";
import { connect } from "react-redux";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

class PaginateList extends Component {
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
        // process.env.REACT_APP_API_URL + "posts/" + 1 // firstblog
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
    const { data } = this.state;
    const { custom, base, user, product } = this.props;

    return (
      <div className="stack-list">
        <Spin
          className="grid-spinner-paginate"
          spinning={this.state.loading}
          size="large"
        />
        <div className="list-container-paginate">
          {this.state.data.map(function(item) {
            return (
              <div key={item.id}>
                {base == "post" && (
                  <ListItem
                    item={item}
                    base={base}
                    user={user}
                    custom={custom}
                  />
                )}
              </div>
            );
          })}
        </div>
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

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps)(PaginateList);
// export default sizeMe()(PaginateGrid);
