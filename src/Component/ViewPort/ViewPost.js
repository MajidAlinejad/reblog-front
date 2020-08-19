import React, { Component } from "react";
import Toolbar from "../Toolbar/Toolbar";
import { Affix } from "antd";
import Axios from "axios";

export default class ViewPost extends Component {
  state = {
    id: "",
    data: ""
  };

  getItems = id => {
    Axios.get(
      process.env.REACT_APP_API_URL + "post/" + this.props.match.params.id // firstblog
    ).then(
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
  componentDidMount() {
    this.getItems();
  }
  render() {
    const { data } = this.state;
    return (
      <div className="post-body">
        <Affix offsetTop={66}>
          <Toolbar toolbar="search" switcher={false} />
        </Affix>
        <div className="post-container">
          <img alt="" src={data.img} />
        </div>
      </div>
    );
  }
}
