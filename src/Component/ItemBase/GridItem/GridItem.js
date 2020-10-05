import React, { Component } from "react";
import noPic from "../../../assets/picture/nopic.svg";
import { Button, Popover, Menu, message } from "antd";
import {
  LikeOutlined,
  FieldTimeOutlined,
  CloudDownloadOutlined,
  ShareAltOutlined,
  StopOutlined,
  SaveOutlined,
  SaveFilled,
  UserOutlined,
  EllipsisOutlined,
  EyeOutlined,
  PictureOutlined,
  PlayCircleFilled,
  MessageOutlined,
  VideoCameraFilled
} from "@ant-design/icons";
import heart from "../../../assets/picture/heart.png";
import { Link } from "react-router-dom";
import { toggleLike, toggleSave } from "../../../GlobalFunc/GlobalFunc";
import { connect } from "react-redux";
import moment from "jalali-moment";
import { isLoggedIn } from "../../../Auth/Auth";
const defaultConf = {
  like: true,
  view: true,
  comment: true,
  avatar: true,
  date: true,
  save: true,
  time: true,
  rate: false,
  title: true,
  text: true,
  autor: true,
  overlay: true,
  type: true,
  footer: true,
  rightFooter: true,
  leftFooter: true,
  setting: true
};
const imgConf = {
  like: true,
  // view: true,
  // comment: true,
  avatar: true,
  // date: true,
  save: true,
  // time: true,
  // rate: false,
  // title: false,
  // text: true,
  autor: true,
  overlay: true,
  // type: true,
  footer: true,
  rightFooter: true,
  leftFooter: true
  // setting: true
};
const videoConf = {
  // like: true,
  view: true,
  // comment: true,
  avatar: true,
  date: true,
  save: true,
  time: true,
  rate: true,
  title: true,
  // text: true,
  autor: true,
  overlay: true,
  // type: true,
  footer: true,
  rightFooter: true,
  leftFooter: true,
  setting: true
};

class GridItem extends Component {
  state = {
    active: false,
    loading: true,
    liked: false,
    like_id: "",
    imgError: false,
    saved: false,
    liker: 0,
    saved_id: "",
    imageStatus: "loading",
    conf: {}
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

  handleLiked = () => {
    this.setState({
      liked: !this.state.liked,
      liker: this.state.liked ? this.state.liker - 1 : this.state.liker + 1
    });
    // Like(item);
    this.props.user
      ? toggleLike(this.props.item.id, this.state.liked).then(
          res => {},
          err => {
            message.error({
              content: "عملیات با مشکل مواجه شد، آیا وارد شده اید؟",
              duration: 2
            });
            this.setState({
              liked: !this.state.liked,
              liker: this.state.liked
                ? this.state.liker - 1
                : this.state.liker + 1
            });
          }
        )
      : message.error({
          content: "لطفا ابتدا وارد شوید؟",
          duration: 2
        });
  };

  handleSave = e => {
    this.setState({
      saved: !this.state.saved
    });
    this.props.user
      ? toggleSave(this.props.item.id, this.state.saved).then(
          res => {},
          err => {
            message.error({
              content: "عملیات با مشکل مواجه شد، آیا وارد شده اید؟",
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
    this.setState({
      imageStatus: "failed to load",
      loading: true,
      imgError: true
    });
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
    } else if (this.props.base === "img") {
      this.setState({
        conf: imgConf,
        liker: this.props.item.like
      });
    } else if (this.props.base === "video") {
      this.setState({
        conf: videoConf
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
          className="container-base-item"
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
            <div
              className={
                this.state.imgError ? "img-base-item nopic" : "img-base-item"
              }
              style={
                this.state.imgError
                  ? { background: `url(${noPic})` }
                  : { background: loading ? "" : `inherit` }
              }
            >
              <img
                className="img-base-cover"
                alt="example"
                style={loading ? { opacity: 0 } : { opacity: 1 }}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
                src={item.thumbnail}
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
                  className={
                    this.state.imgError
                      ? "img-base-overlay hide"
                      : "img-base-overlay"
                  }
                >
                  {base === "video" && (
                    <PlayCircleFilled className="play-icon" />
                  )}
                  <div className="img-base-overlay-content">
                    {conf.text && (
                      <Button
                        className="link-overwrite"
                        type="link"
                        // shape="circle"
                        // icon={<LikeOutlined />}
                      >
                        خانوادگی / ترسناک
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
                  this.state.saved ? "overlay-saved animated" : "overlay-saved"
                }
              >
                <div
                  className={
                    this.state.saved ? "saved-txt animated" : "saved-txt"
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
                    {conf.avatar && (
                      <span className="first">
                        <UserOutlined />
                      </span>
                    )}
                    {conf.autor && <strong>{item.user.name}</strong>}
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
                              {/* <span class="tooltiptext">like</span> */}
                            </div>
                          </span>
                          <strong> {this.state.liker}</strong>
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

                      {conf.date && (
                        <i>
                          {" "}
                          {moment(item.created_at)
                            .locale("fa")
                            .format("DD/MMMM/YYYY")}
                        </i>
                      )}
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
                {item.title}
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps)(GridItem);
// export default sizeMe()(PaginateGrid);
