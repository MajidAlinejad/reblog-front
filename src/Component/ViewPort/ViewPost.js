import React, { Component } from "react";
import Toolbar from "../Toolbar/Toolbar";

import { Affix, Divider } from "antd";
import Axios from "axios";
import History from "../../History";
import { LeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import LoadMoreGrid from "../GridView/LoadMoreGrid/LoadMoreGrid";
import ImgPost from "./ImgPost";
import OriginPost from "./OriginPost";
import VideoPost from "./VideoPost";
import MusicPost from "./MusicPost";
class ViewPost extends Component {
  state = {
    effect: false,
    base: ""
  };

  getItems = id => {
    Axios.get(
      process.env.REACT_APP_API_URL + "base/" + this.props.match.params.id // firstblog
    ).then(res =>
      this.setState({
        base: res.data
      })
    );
  };

  renderer = id => {
    if (this.state.base === "img") {
      return <ImgPost id={id} />;
    } else if (this.state.base === "post") {
      return <OriginPost id={id} />;
    } else if (this.state.base === "video") {
      return <VideoPost id={id} />;
    } else if (this.state.base === "music") {
      return <MusicPost id={id} />;
    } else if (this.state.base === "podcast") {
      return <MusicPost id={id} />;
    }
  };

  related = id => {
    if (this.state.base === "img") {
      return <LoadMoreGrid base={this.state.base} id="1" />;
    } else if (this.state.base === "video") {
      return <LoadMoreGrid base={this.state.base} siderPost={true} id="9" />;
    } else if (this.state.base === "music") {
      return <LoadMoreGrid base={this.state.base} siderPost={true} id="6" />;
    } else if (this.state.base === "podcast") {
      return <LoadMoreGrid base={this.state.base} siderPost={true} id="6" />;
    } else if (this.state.base === "post") {
      return <LoadMoreGrid base={this.state.base} siderPost={true} id="9" />;
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getItems();
    this.setState({
      effect: true
    });
  }

  render() {
    const { effect, base } = this.state;

    return (
      <div className={effect ? "post-body effect-on" : "post-body"}>
        <Affix offsetTop={66}>
          <Toolbar toolbar="search" switcher={false} />
        </Affix>
        <div
          className="back-btn"
          onClick={() => {
            History.goBack();
          }}
        >
          <LeftOutlined />
        </div>
        <div className={"displayer view-" + base}>
          {this.renderer(this.props.match.params.id)}
          <div className="related-item ">
            <Divider className="related-divider" orientation="right">
              موارد مشابه
            </Divider>

            {this.related(this.props.match.params.id)}
          </div>
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

export default connect(mapStateToProps)(ViewPost);
