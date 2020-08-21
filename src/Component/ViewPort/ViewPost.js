import React, { Component } from "react";
import Toolbar from "../Toolbar/Toolbar";
import { Affix, PageHeader, Avatar, message, Tag } from "antd";
import Axios from "axios";
import History from "../../History";
import noPic from "../../assets/picture/nopic.svg";
import { toggleLike } from "../../GlobalFunc/GlobalFunc";
import heart from "../../assets/picture/heart.png";

export default class ViewPost extends Component {
  state = {
    id: "",
    data: "",
    loading: true
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
    const { data, loading } = this.state;
    return (
      <div className="post-body">
        <Affix offsetTop={66}>
          <Toolbar toolbar="search" switcher={false} />
        </Affix>
        <div className="post-container">
          <div className="img-post-info">
            <div className="img-post-info-content right">
              <Avatar
                size="large"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <div className="img-post-autor">
                <strong> {data.title}</strong>
              </div>
              {/* <div className="end">
                <Tag color="default">1/3/1399</Tag>
              </div> */}
            </div>
            <div className="img-post-info-content left">
              {/* <div className="first">
                <Tag color="default">2/5/2020</Tag>
              </div> */}
              <div className="like-btn">
                <span>
                  <div
                    onClick={this.handleLiked}
                    style={{ background: `url(${heart})` }}
                    className={this.state.liked ? "heart is-active" : "heart"}
                  >
                    {/* <span class="tooltiptext">like</span> */}
                  </div>
                </span>
                <strong> {data.like}</strong>
              </div>
            </div>
          </div>
          <div className="post-border">
            {/* <PageHeader
              className="site-page-header"
              onBack={() => {
                History.goBack();
              }}
              title={data.title}
              subTitle={data.meta}
            /> */}

            <div
              className={
                this.state.imgError
                  ? "img-post-container nopic"
                  : "img-post-container"
              }
              style={
                this.state.imgError
                  ? { background: `url(${noPic})` }
                  : { background: `inherit` }
              }
            >
              <img
                className="main-img"
                alt=""
                src={data.img}
                style={loading ? { opacity: 0 } : { opacity: 1 }}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
