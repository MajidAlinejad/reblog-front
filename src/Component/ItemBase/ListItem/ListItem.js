import React, { Component } from "react";
import { Avatar, message } from "antd";
import { EyeOutlined, MessageOutlined, HeartOutlined } from "@ant-design/icons";
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

export default class ListItem extends Component {
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
    const { conf } = this.state;
    return (
      <React.Fragment>
        <div className="li-bs-itm container">
          <div className="li-bs-itm right-section">
            <img
              src="https://cdn.zoomg.ir/2020/8/fa2f0d22-c463-4c48-932b-82a3bb250ec7.jpg"
              alt=""
            />
            <div className="li-bs-itm overlay">
              <div className="tag-container">
                <span className="li-itm-tag">تکنولوژی #</span>
                <span className="li-itm-tag">بازی آنلاین #</span>
              </div>
            </div>
          </div>
          <div className="li-bs-itm left-section">
            <h2 className="li-bs-itm title">
              تاریخ انتشار بسته Heart of Deimos بازی Warframe مشخص شد
            </h2>
            <div className="li-bs-itm meta">
              <div className="righted">
                <Avatar src="https://cdn.zoomg.ir/2020/8/fa2f0d22-c463-4c48-932b-82a3bb250ec7.jpg" />
                <div className="autor">
                  <i>مجید علی نژاد</i>
                </div>
              </div>

              <div className="lefted">
                <div>
                  <i>22 فروردین 1399 / 12:39</i>
                </div>
              </div>
            </div>
            <hr className="middle-hr " />
            <div className="li-bs-itm caption">
              <p>
                در جریان رویداد Tennocon 2020 تاریخ انتشار بسته الحاقی جدید بازی
                Warframe به‌نام Heart of Deimos مشخص شد و تریلری هم از یکی از
                شخصیت‌های جدید بازی منتشر شد
              </p>
              <div className="li-bs-itm footer-section">
                {conf.like && (
                  <div className="btn comment">
                    <span>
                      <div
                      // onClick={this.handleSave}
                      >
                        <HeartOutlined className="cmnt-img-line" />
                      </div>
                    </span>
                    <strong>99K</strong>
                  </div>
                )}
                {conf.comment && (
                  <div className="btn comment">
                    <span>
                      <div
                      // onClick={this.handleSave}
                      >
                        <MessageOutlined className="cmnt-img-line" />
                      </div>
                    </span>
                    <strong>13</strong>
                  </div>
                )}
                {conf.view && (
                  <div className="btn view">
                    <span>
                      <div
                      // onClick={this.handleSave}
                      >
                        <EyeOutlined className="views-img-line" />
                      </div>
                    </span>
                    <strong> 3K</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
