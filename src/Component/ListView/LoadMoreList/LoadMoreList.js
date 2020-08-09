import React, { Component } from "react";

import axios from "axios";
import { Divider, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ListItem from "../../ItemBase/ListItem/ListItem";
import { connect } from "react-redux";
import FreeForm from "../../ItemBase/Post/FreeForm";

class LoadMoreList extends Component {
  _isMounted = false;
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
      .then(res => {
        if (this._isMounted) {
          this.setState({
            //updating data
            data: [...this.state.data, ...res.data],
            //updating page numbers
            loading: false
          });
        }
      });
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.getItems();
  }
  render() {
    const { custom, base, user } = this.props;

    return (
      <div className="stack-list">
        <div className="list-container-loadmore">
          {this.state.data.map(function(item) {
            return (
              <div key={item.id}>
                {base === "post" && (
                  <ListItem
                    item={item}
                    base={base}
                    user={user}
                    custom={custom}
                  />
                )}
                {base === "free" && (
                  <FreeForm
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

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps)(LoadMoreList);
// export default sizeMe()(PaginateGrid);
