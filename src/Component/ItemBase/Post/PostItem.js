import React, { Component } from "react";
import { Avatar, Button, message } from "antd";
import noPic from "../../../assets/picture/nopic.svg";
import {
  LikeOutlined,
  SaveOutlined,
  SaveFilled,
  EyeOutlined,
  PlayCircleFilled,
  MessageOutlined
} from "@ant-design/icons";

import heart from "../../../assets/picture/heart.png";
import { Link } from "react-router-dom";
import { toggleLike, toggleSave } from "../../../GlobalFunc/GlobalFunc";

const defaultConf = {
  like: true,
  // view: true,
  // comment: true,
  avatar: true,
  // date: true,
  save: true,
  // time: true,
  rate: false,
  // title: true,
  text: true,
  // autor: true,
  overlay: true,
  // type: true,
  footer: true,
  rightFooter: true,
  leftFooter: true,
  setting: true
};
const postConf = {
  like: true,
  view: true,
  comment: true,
  avatar: true,
  date: true,
  save: true,
  time: true,
  rate: true,
  // title: true,
  // text: true,
  autor: true,
  overlay: true,
  // type: true,
  footer: true,
  rightFooter: true,
  leftFooter: true
  // setting: true
};

export default class PostItem extends Component {
  state = {
    active: false,
    loading: true,
    liked: false,
    like_id: "",
    saved: false,
    err: false,
    liker: 0,
    saved_id: "",
    imageStatus: "loading",
    conf: {},
    colors: []
  };

  getColors = colors =>
    this.setState(state => ({ colors: [...state.colors, ...colors] }));

  handleLiked = () => {
    // Like(item);
    this.props.user
      ? toggleLike(
          this.props.user.id,
          this.props.item.id,
          this.state.like_id
        ).then(
          res => {
            // console.log(res);
            this.setState({
              like_id: res.data.id,
              liked: !this.state.liked,
              liker: this.state.liked
                ? this.state.liker - 1
                : this.state.liker + 1
            });
          },
          err => {
            message.error({
              content: "عملیات با مشکل مواجه شد",
              duration: 2
            });
          }
        )
      : message.error({
          content: "لطفا ابتدا وارد شوید",
          duration: 2
        });
  };

  handleSave = e => {
    this.setState({
      saved: !this.state.saved
    });
    this.props.user
      ? toggleSave(
          this.props.user.id,
          this.props.item.id,
          this.state.saved_id
        ).then(
          res => {
            // console.log(res);
            this.setState({
              saved_id: res.data.id
            });
          },
          err => {
            message.error({
              content: "عملیات با مشکل مواجه شد",
              duration: 2
            });
            this.setState({
              saved: !this.state.saved
            });
          }
        )
      : message.error({
          content: "لطفا ابتدا وارد شوید",
          duration: 2
        });
  };

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded", loading: false });
  }

  handleImageErrored() {
    this.setState({ imageStatus: "failed to load", loading: true, err: true });
  }
  hide = () => {
    this.setState({
      visible: false
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  componentDidMount() {
    if (this.props.custom) {
      this.setState({
        conf: this.props.custom
      });
    } else if (this.props.base === "post") {
      this.setState({
        conf: postConf
      });
    } else {
      this.setState({
        conf: defaultConf
      });
    }
  }
  render() {
    const { item, base } = this.props;
    const { loading, conf, colors } = this.state;
    return (
      <React.Fragment>
        <div className="container-base-item-post">
          <div
            className="grid-post-card"
            style={{
              background: `linear-gradient(to bottom, white 92%, ${
                colors[0]
              } 8%)`
            }}
          >
            {conf.overlay && (
              <div className="post-base-overlay">
                {base === "music" && (
                  <PlayCircleFilled className="play-sound-icon" />
                )}
                {base === "podcast" && (
                  <PlayCircleFilled className="play-sound-icon" />
                )}
                <div className="post-base-overlay-content">
                  {conf.rate && (
                    <React.Fragment>
                      <Button
                        className="link-overwrite"
                        type="link"
                        // shape="circle"
                        icon={<LikeOutlined />}
                      >
                        85%
                      </Button>
                    </React.Fragment>
                  )}
                  {conf.time && (
                    <span className="prim-overwrite" style={{ float: "left" }}>
                      تکنولوژی
                    </span>
                  )}
                </div>
              </div>
            )}
            <Link to={item.url}>
              <div
                className="grid-card-cover"
                style={
                  this.state.err
                    ? { background: `url(${noPic})` }
                    : { background: `none` }
                }
              >
                <img
                  style={loading ? { opacity: 0 } : { opacity: 1 }}
                  onLoad={this.handleImageLoaded.bind(this)}
                  onError={this.handleImageErrored.bind(this)}
                  alt="example"
                  src="https://cdn.zoomg.ir/2020/8/fa2f0d22-c463-4c48-932b-82a3bb250ec7.jpg"
                  // src={item.thumbnailUrl}
                />
              </div>
            </Link>

            <div className="btn-controll">
              <ul>
                {conf.save && (
                  <li>
                    <div
                      onClick={this.handleSave}
                      className={
                        this.state.saved
                          ? "bubbly-button animate"
                          : "bubbly-button"
                      }
                    >
                      {this.state.saved ? (
                        <SaveFilled className="save-img" />
                      ) : (
                        <SaveOutlined className="save-img-line" />
                      )}
                      <span className="tooltiptext">Save</span>
                    </div>
                  </li>
                )}

                {conf.comment && (
                  <li>
                    <span>
                      <div className="comment">
                        <MessageOutlined className="cmnt-img-line" />
                      </div>
                    </span>
                    <strong>13</strong>
                  </li>
                )}
                {conf.view && (
                  <li>
                    <span>
                      <div
                        // onClick={this.handleSave}
                        className="view"
                      >
                        <EyeOutlined className="views-img-line" />
                      </div>
                    </span>
                    <strong> 3K</strong>
                  </li>
                )}
                {conf.like && (
                  <li className="like-btn">
                    <span>
                      <div
                        onClick={this.handleLiked}
                        style={{ background: `url(${heart})` }}
                        className={
                          this.state.liked ? "heart is-active" : "heart"
                        }
                      ></div>
                    </span>
                    <strong> {this.state.liker}</strong>
                  </li>
                )}
              </ul>
            </div>
            <div className="grid-card-body">
              <div className="grid-card-meta">
                <Link to={item.url}>
                  <h3>
                    ساعت هوشمند اپل سری 3 جی پی اس مدل 38mm Aluminium Case with
                    Sport Band
                  </h3>
                </Link>
                <hr className="middle-hr" style={{ borderColor: "#50cee5" }} />

                <p>
                  ساعت هوشمند اپل سری 3 جی پی اس مدل 38mm Aluminium Case with
                  Sport Band ساعت هوشمند اپل سری 3 جی پی اس مدل 38mm Aluminium
                  Case with Sport Band
                </p>

                {/* {item.title} */}
              </div>
            </div>
            <div className="grid-card-footer">
              {conf.footer && (
                <div className="post-base-footer">
                  <div className="post-base-footer-content">
                    {conf.rightFooter && (
                      <div className="right-content">
                        {conf.avatar && (
                          <span className="first">
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                          </span>
                        )}
                        {conf.autor && <i>مجید علی نژاد</i>}
                      </div>
                    )}
                    {conf.leftFooter && (
                      <div className="left-content">
                        {conf.date && <i>55 روز پیش</i>}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
