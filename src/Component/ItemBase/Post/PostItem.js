import React, { Component } from "react";
import { Card, Avatar, Button, Popover, Menu, message, Badge, Tag } from "antd";
import {
  LikeOutlined,
  FieldTimeOutlined,
  CloudDownloadOutlined,
  ShareAltOutlined,
  StopOutlined,
  SaveOutlined,
  SaveFilled,
  EllipsisOutlined,
  EyeOutlined,
  PictureOutlined,
  PlayCircleFilled,
  MessageOutlined,
  VideoCameraFilled,
  EditOutlined,
  SettingOutlined,
  StarOutlined
} from "@ant-design/icons";

import heart from "../../../assets/picture/heart.png";
import { Link } from "react-router-dom";
import { ColorExtractor } from "react-color-extractor";
import apple from "../../../assets/picture/example/apple.png";
import perfume from "../../../assets/picture/example/perfume.png";
import perfume2 from "../../../assets/picture/example/perfume2.png";
import { toggleLike, toggleSave } from "../../../GlobalFunc/GlobalFunc";
const { Meta } = Card;

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
  componentDidMount() {
    if (this.props.custom) {
      this.setState({
        conf: this.props.custom
      });
    } else if (this.props.base == "post") {
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
                {base == "music" && (
                  <PlayCircleFilled className="play-sound-icon" />
                )}
                {base == "podcast" && (
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
              <div className="grid-card-cover">
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
                      class={
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
                      <span class="tooltiptext">Save</span>
                    </div>
                  </li>
                )}

                {conf.comment && (
                  <li>
                    <span>
                      <div class="comment">
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
                        class="view"
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
                        class={this.state.liked ? "heart is-active" : "heart"}
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
          {/* <Card
            className=" "
            cover={
              <img
                alt="example"
                // src="https://www.digikala.com/mag/wp-content/uploads/2020/07/Mars-2020-Poster.jpg"
                src={apple}
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={item.title}
              description={"This is from Album number" + item.albumId}
            />
          </Card> */}
          {/* {conf.setting && (
            <Popover
              placement="bottomLeft"
              content={
                <Menu mode="vertical" className="post-base-setting-menu">
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

          <Link to="/postItem">
            <div className="img-base-item">
              <img
                className="img-base-cover"
                alt="example"
                style={loading ? { opacity: 0 } : { opacity: 1 }}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
                // src={item.thumbnailUrl}
                src="https://cps-static.rovicorp.com/3/JPG_500/MI0003/715/MI0003715986.jpg"
              />
              {conf.type && (
                <div className="img-base-over-icon">
                  {item.type == "video" ? (
                    <VideoCameraFilled />
                  ) : (
                    <PictureOutlined />
                  )}
                </div>
              )}
              {conf.overlay && (
                <div className="img-base-overlay">
                  {base == "music" && (
                    <PlayCircleFilled className="play-sound-icon" />
                  )}
                  {base == "podcast" && (
                    <PlayCircleFilled className="play-sound-icon" />
                  )}
                  <div className="img-base-overlay-content">
                    {conf.text && (
                      <Button
                        className="link-overwrite"
                        type="link"
                        // shape="circle"
                        // icon={<LikeOutlined />}
                      >
                        ColdPlay
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
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      </span>
                    )}
                    {conf.autor && <strong>پادکست شماره #3</strong>}
                  </div>
                )}
                {conf.leftFooter && (
                  <div className="left-content">
                    <ul>
                      {conf.save && (
                        <li>
                          <div
                            onClick={this.handleSave}
                            class={
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
                            <span class="tooltiptext">Save</span>
                          </div>
                        </li>
                      )}
                      {conf.like && (
                        <li className="like-btn">
                          <span>
                            <div
                              onClick={this.handleLiked}
                              style={{ background: `url(${heart})` }}
                              class={
                                this.state.liked ? "heart is-active" : "heart"
                              }
                            >
                            </div>
                          </span>
                          <strong> {this.state.liker}</strong>
                        </li>
                      )}
                      {conf.comment && (
                        <li>
                          <span>
                            <div
                              class="comment"
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
                              class="view"
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
                {item.title} 
                پادکست شماره 3 به همراه جناب چستر مرحوم
              </div>
            </div>
          )} */}
        </div>
      </React.Fragment>
    );
  }
}
