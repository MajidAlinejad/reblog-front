import React, { Component } from "react";
import {
  Card,
  Avatar,
  Button,
  Popover,
  Menu,
  message,
  Badge,
  Carousel,
  Radio,
  Tag,
  Typography
} from "antd";
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
  CalendarOutlined,
  StarOutlined,
  HeartOutlined
} from "@ant-design/icons";

import heart from "../../../assets/picture/heart.png";
import { Link } from "react-router-dom";
import { ColorExtractor } from "react-color-extractor";
import apple from "../../../assets/picture/example/apple.png";
import perfume from "../../../assets/picture/example/perfume.png";
import perfume2 from "../../../assets/picture/example/perfume2.png";
import { toggleLike, toggleSave } from "../../../GlobalFunc/GlobalFunc";
const { Paragraph } = Typography;
const defaultConf = {
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

export default class FreeForm extends Component {
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
    const { conf, loading } = this.state;
    return (
      <React.Fragment>
        <div className="free-li-bs-itm container">
          <div className="free-li-bs-itm navbar">
            <div className="righted">
              <Avatar src="https://cdn.zoomg.ir/2020/8/fa2f0d22-c463-4c48-932b-82a3bb250ec7.jpg" />
              <div className="autor">
                <strong>مجید علی نژاد</strong>
              </div>
            </div>

            <div className="lefted">
              <div>
                <CalendarOutlined />
                <i>22 فروردین 1399 </i>
              </div>
            </div>
          </div>
          <div className="free-li-bs-itm top-section">
            <Carousel dotPosition="bottom">
              <div>
                <img
                  style={loading ? { opacity: 0 } : { opacity: 1 }}
                  onLoad={this.handleImageLoaded.bind(this)}
                  onError={this.handleImageErrored.bind(this)}
                  src="https://cdn.zoomg.ir/2020/8/fa2f0d22-c463-4c48-932b-82a3bb250ec7.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={loading ? { opacity: 0 } : { opacity: 1 }}
                  onLoad={this.handleImageLoaded.bind(this)}
                  onError={this.handleImageErrored.bind(this)}
                  src="https://cdn.zoomg.ir/2020/8/fa2f0d22-c463-4c48-932b-82a3bb250ec7.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={loading ? { opacity: 0 } : { opacity: 1 }}
                  onLoad={this.handleImageLoaded.bind(this)}
                  onError={this.handleImageErrored.bind(this)}
                  src="https://cdn.zoomg.ir/2020/8/fa2f0d22-c463-4c48-932b-82a3bb250ec7.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  style={loading ? { opacity: 0 } : { opacity: 1 }}
                  onLoad={this.handleImageLoaded.bind(this)}
                  onError={this.handleImageErrored.bind(this)}
                  src="https://cdn.zoomg.ir/2020/8/fa2f0d22-c463-4c48-932b-82a3bb250ec7.jpg"
                  alt=""
                />
              </div>
            </Carousel>
          </div>
          <div className="free-li-bs-itm bottom-section">
            {/*  */}
            <div className="free-li-bs-itm btn-section">
              {conf.save && (
                <div className="btn">
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
                  </div>
                </div>
              )}
              {conf.comment && (
                <div className="btn">
                  <span>
                    <div
                      // onClick={this.handleSave}
                      class="comment"
                    >
                      <MessageOutlined className="cmnt-img-line" />
                    </div>
                  </span>
                  <strong>13</strong>
                </div>
              )}
              {conf.view && (
                <div className="btn">
                  <span>
                    <div
                      // onClick={this.handleSave}
                      class="view"
                    >
                      <EyeOutlined className="views-img-line" />
                    </div>
                  </span>
                  <strong> 3K</strong>
                </div>
              )}
              {conf.like && (
                <div className="btn like-btn">
                  <span>
                    <div
                      onClick={this.handleLiked}
                      style={{ background: `url(${heart})` }}
                      class={this.state.liked ? "heart is-active" : "heart"}
                    >
                      {/* <span class="tooltiptext">like</span> */}
                    </div>
                  </span>
                  <strong> {this.state.liker}</strong>
                </div>
              )}
            </div>
            {/*  */}
            <h2 className="free-li-bs-itm title">
              تاریخ انتشار بسته Heart of Deimos بازی Warframe مشخص شد
            </h2>
            <div className="free-li-bs-itm meta"></div>
            <hr className="middle-hr " />
            <div className="free-li-bs-itm caption">
              <Paragraph
                ellipsis={{ rows: 2, expandable: true, symbol: "بیشتر" }}
              >
                در جریان رویداد Tennocon 2020 تاریخ انتشار بسته الحاقی جدید بازی
                Warframe به‌نام Heart of Deimos مشخص شد و تریلری هم از یکی از
                شخصیت‌های جدید بازی منتشر شد. طبق جدیدترین اخبار بازی و در جریان
                نمایشگاه Tennocon 2020، استودیو Digital Extremes، سازنده و ناشر
                بازی Warframe، علاوه‌بر نمایش بخش‌هایی از آن، تاریخ انتشار
                جدیدترین DLC این بازی اکشن سوم شخص را با نام Heart of Deimos
                اعلام کرد. این بسته الحاقی به‌عنوان سومین DLC قرار است در تاریخ
                ۲۵ ماه اوت (۴ شهریور ماه) به‌طور هم‌زمان برای تمامی پلتفرم‌های
                کامپیوتر، ایکس باکس وان، پلی استیشن 4 و نینتندو سوییچ منتشر شود.
                این اولین باری است که بسته الحاقی این بازی به‌طور هم‌زمان برای
                تمامی پلتفرم‌ها منتشر می‌شود.
                <br />
                این بسته الحاقی بازیکن را به محل تجمع و زادگاه نژاد Infested
                می‌برد که علی‌رغم زیبا بودن، بسیار عجیب به‌نظر می‌رسد؛ چراکه یک
                محیط زنده و ارگانیک به‌نظر می‌آید. همچنین استودیو Digital
                Extremes تریلری هم از شخصیت Hydroid Prime منتشر کرده است که
                می‌توانید در زیر تماشا کنید. بازی Warframe در حال حاضر برای
                پلتفرم‌هایی که در بالا ذکر شد در دسترس است و به‌تازگی هم هفتمین
                سالگرد خود را جشن گرفت.
              </Paragraph>
            </div>
            <hr className="middle-hr dashed " />

            <div className="free-li-bs-itm overlay">
              <div className="tag-container">
                <span className="li-itm-tag">تکنولوژی #</span>
                <span className="li-itm-tag">بازی آنلاین #</span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
