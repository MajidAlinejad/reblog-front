import React, { Component } from "react";
import { Button, Popover, Menu, message } from "antd";
import {
  LikeOutlined,
  FieldTimeOutlined,
  CloudDownloadOutlined,
  ShareAltOutlined,
  StopOutlined,
  SaveOutlined,
  SaveFilled,
  EllipsisOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
  AudioOutlined,
  EyeOutlined,
  PictureOutlined,
  MessageOutlined,
  VideoCameraFilled
} from "@ant-design/icons";
import heart from "../../../assets/picture/heart.png";
import { Link } from "react-router-dom";
import { toggleLike, toggleSave } from "../../../GlobalFunc/GlobalFunc";
import { isLoggedIn } from "../../../Auth/Auth";
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
const playConf = {
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
  autor: true,
  overlay: true,
  // type: true,
  footer: true,
  rightFooter: true,
  leftFooter: true,
  setting: true
};

const podConf = {
  like: true,
  // view: true,
  // comment: true,
  avatar: true,
  // date: true,
  save: true,
  // time: true,
  rate: false,
  title: true,
  text: true,
  autor: true,
  overlay: true,
  // type: true,
  footer: true,
  rightFooter: true,
  leftFooter: true,
  setting: true
};
export default class PlayItem extends Component {
  state = {
    active: false,
    loading: true,
    liked: false,
    like_id: "",
    saved: false,
    liker: 0,
    saved_id: "",
    imageStatus: "loading",
    conf: {}
  };

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

  playStream = e => {
    e.preventDefault();
  };

  isLiked = () => {
    let id = this.props.item.id;
    if (this.props.user.likes) {
      if (this.props.user.likes.find(element => id === element)) {
        this.setState({
          liked: true
        });
      }
    }
  };

  isSaved = () => {
    let id = this.props.item.id;
    if (this.props.user.saves) {
      if (this.props.user.saves.find(element => id === element)) {
        this.setState({
          saved: true
        });
      }
    }
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
    this.setState({ imageStatus: "failed to load", loading: true });
  }
  hide = () => {
    this.setState({
      visible: false
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  componentDidUpdate(prevProps) {
    if (isLoggedIn()) {
      if (prevProps.user !== this.props.user) {
        this.isLiked();
        this.isSaved();
      }
    }
  }

  componentDidMount() {
    if (isLoggedIn()) {
      this.isLiked();
      this.isSaved();
    }

    if (this.props.custom) {
      this.setState({
        conf: this.props.custom
      });
    } else if (this.props.base === "music") {
      this.setState({
        conf: playConf
      });
    } else if (this.props.base === "podcast") {
      this.setState({
        conf: podConf
      });
    } else {
      this.setState({
        conf: defaultConf
      });
    }
  }
  render() {
    const { item, base } = this.props;
    const { loading, conf } = this.state;
    return (
      <React.Fragment>
        <div
          // style={conf.title && { height: "300px" }}
          className="container-base-item-play"
        >
          {conf.setting && (
            <Popover
              placement="bottomLeft"
              content={
                <Menu mode="vertical" className="img-base-setting-menu">
                  <Menu.Item key="1" icon={<CloudDownloadOutlined />}>
                    دانلود
                  </Menu.Item>
                  <Menu.Item key="2" icon={<ShareAltOutlined />}>
                    اشتراک
                  </Menu.Item>
                  <Menu.Item key="3" icon={<StopOutlined />}>
                    گزارش
                  </Menu.Item>
                </Menu>
              }
              trigger="click"
              visible={this.state.visible}
              onVisibleChange={this.handleVisibleChange}
            >
              <div
                className="img-base-setting-icon"
                onClick={e => {
                  e.preventDefault();
                }}
              >
                <EllipsisOutlined rotate={90} />
              </div>
            </Popover>
          )}

          <Link to={"/post/" + item.id}>
            <div className="img-base-item">
              <img
                className="img-base-cover"
                alt="example"
                style={loading ? { opacity: 0 } : { opacity: 1 }}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
                src={item.thumbnail}
                // src="https://cps-static.rovicorp.com/3/JPG_500/MI0003/715/MI0003715986.jpg"
              />
              {conf.type && (
                <div className="img-base-over-icon">
                  {item.type === "video" ? (
                    <VideoCameraFilled />
                  ) : (
                    <PictureOutlined />
                  )}
                </div>
              )}
              {conf.overlay && (
                <div
                  style={loading ? { opacity: 0 } : { opacity: 1 }}
                  className="img-base-overlay"
                >
                  {base === "music" && (
                    <PlayCircleOutlined
                      className="play-sound-icon"
                      onClick={this.playStream}
                    />
                  )}
                  {base === "podcast" && (
                    <PlayCircleOutlined
                      className="play-sound-icon"
                      onClick={this.playStream}
                    />
                  )}
                  <div className="img-base-overlay-content">
                    {conf.text && (
                      <Button
                        className="link-overwrite music"
                        type="link"

                        // shape="circle"
                        // icon={<LikeOutlined />}
                      >
                        {/* {base === "music" && item.title} */}
                      </Button>
                    )}
                    {conf.rate && (
                      <React.Fragment>
                        <br />
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
                      <Button
                        className="link-overwrite"
                        type="link"
                        style={{ float: "left" }}
                        // shape="round"
                        icon={<FieldTimeOutlined />}
                      >
                        12:20
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div
                className={
                  this.state.saved
                    ? "overlay-saved animated play-base"
                    : "overlay-saved play-base"
                }
              >
                <div
                  className={
                    this.state.saved
                      ? "saved-txt animated play-base"
                      : "saved-txt play-base"
                  }
                >
                  Saved
                </div>
              </div>
            </div>
          </Link>
          {conf.footer && (
            <div className="img-base-footer">
              <div className="img-base-footer-content">
                {conf.rightFooter && (
                  <div className="right-content">
                    {base === "music" && (
                      <span className="first avatar-icon">
                        <PlayCircleFilled />
                      </span>
                    )}
                    {base === "podcast" && (
                      <span className="first avatar-icon">
                        <AudioOutlined />
                      </span>
                    )}
                    {/* {conf.avatar && (
                      <span className="first">
                        <AudioOutlined />
                      </span>
                    )} */}
                    {conf.autor && <strong>{item.title}</strong>}
                  </div>
                )}
                {conf.leftFooter && (
                  <div className="left-content">
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
                      {conf.like && (
                        <li className="like-btn">
                          <span>
                            <div
                              onClick={this.handleLiked}
                              style={{ background: `url(${heart})` }}
                              className={
                                this.state.liked ? "heart is-active" : "heart"
                              }
                            >
                              {/* <span className="tooltiptext">like</span> */}
                            </div>
                          </span>
                          <strong> {item.like + this.state.liker}</strong>
                        </li>
                      )}
                      {conf.comment && (
                        <li>
                          <span>
                            <div
                              // onClick={this.handleSave}
                              className="comment"
                            >
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

                      {conf.date && <i>55 روز پیش</i>}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          {conf.title && (
            <div className="img-base-extra">
              <div className="img-base-extra-content">
                <hr />
                {/* {item.title} */}
                {item.caption}
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
