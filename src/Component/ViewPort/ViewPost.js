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
import ProductPost from "./ProductPost";
import RelatedGrid from "../GridView/RelatedGrid/RelatedGrid";
class ViewPost extends Component {
  state = {
    effect: false,
    base: "",
    category: "",
    blogId: ""
  };

  getItems = id => {
    Axios.get(
      process.env.REACT_APP_API_URL + "base/" + this.props.match.params.id // firstblog
    ).then(res =>
      this.setState({
        base: res.data.base,
        blogId: res.data.blog_id,
        category: res.data.category
      })
    );
  };

  componentDidUpdate(prevProps) {
    if (prevProps.related !== this.props.related) {
      this.setState({ base: this.props.base, category: this.props.related });
    }
  }

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
    } else if (this.state.base === "product") {
      return <ProductPost id={id} />;
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
    const { effect, base, category } = this.state;

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

            <RelatedGrid
              base={this.state.base}
              siderPost={true} // this.state.base === "img" || this.state.base === "product"? false:
              id={this.state.blogId}
              category={this.state.category}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    id: state.blog.id,
    base: state.post.base,
    related: state.post.related
  };
};

export default connect(mapStateToProps)(ViewPost);
