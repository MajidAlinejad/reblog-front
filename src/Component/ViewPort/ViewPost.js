import React, { Component } from "react";
import Toolbar from "../Toolbar/Toolbar";
import {
  Affix,
  PageHeader,
  Typography,
  Avatar,
  Form,
  message,
  Tag,
  Spin,
  Comment,
  Divider,
  Button,
  Input
} from "antd";
import Axios from "axios";
import History from "../../History";
import {
  LeftOutlined,
  MessageOutlined,
  EyeOutlined,
  RollbackOutlined
} from "@ant-design/icons";
import noPic from "../../assets/picture/nopic.svg";
import { toggleLike } from "../../GlobalFunc/GlobalFunc";
import heart from "../../assets/picture/heart.png";
import { connect } from "react-redux";
const { TextArea } = Input;
const { Paragraph } = Typography;
class ViewPost extends Component {
  state = {
    id: "",
    data: "",
    loading: true,
    effect: false,
    tags: [],
    hide: true,
    value: "",
    reply: "",
    btnTxt: "ارسال نظر",
    Comments: [],
    Cloading: false,
    submitting: false
  };

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded", loading: false });
  }
  onCommentChange = e => {
    this.setState({ value: e.target.value });
    // this.setState({ value: value });
  };

  emojiClick = e => {
    // console.log(e.target.innerText);
    this.setState({
      value: this.state.value.concat(e.target.innerText)
    });
    console.log();
  };

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
      ? toggleLike(this.props.match.params.id, this.state.liked).then(
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

  getComment = id => {
    Axios.get(
      process.env.REACT_APP_API_URL + "comments/" + this.props.match.params.id // firstblog
    ).then(res =>
      this.setState({
        Comments: res.data,
        Cloading: false
      })
    );
  };

  onReply = e => {
    // console.log(e.target);
    let txt = "پاسخ شما به " + e.target.name;
    this.setState({
      hide: false,
      btnTxt: txt,
      reply: e.target.id
    });
  };

  onSubmit = () => {
    this.setState({
      submitting: true
    });
    let post_id = this.props.match.params.id;
    let text = this.state.value;
    let comment_id;

    if (this.state.reply) {
      comment_id = this.state.reply;
    } else {
      comment_id = 0;
    }

    Axios.post(process.env.REACT_APP_API_URL + "comment", {
      post_id,
      text,
      comment_id
    }).then(
      res => {
        this.setState(
          {
            submitting: false,
            hide: true,
            value: "",
            reply: "",
            btnTxt: "ارسال نظر"
          },
          this.getComment()
        );
        if (comment_id === 0 && this.state.Comments.length > 3) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      },
      err => {
        this.setState({
          submitting: false
        });
        message.error({
          content: "عملیات با مشکل مواجه شد، لطفا دوباره امتحان کنید",
          duration: 2
        });
      }
    );
  };

  getItems = id => {
    Axios.get(
      process.env.REACT_APP_API_URL + "post/" + this.props.match.params.id // firstblog
    ).then(
      res =>
        this.setState({
          data: res.data,
          loading: false,
          tags: res.data.meta.split(",")
        }),
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      }),
      this.getComment()
    );
  };

  componentDidMount() {
    this.getItems();
    this.setState({
      effect: true
    });
  }
  render() {
    const { data, loading, effect, value } = this.state;
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
        <div className="post-container">
          <div className="img-post-section right">
            <div className="post-border">
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
                <Spin
                  className="img-post-spin"
                  spinning={this.state.loading}
                  size="large"
                />
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
          <div className="img-post-section left">
            <div className="sticky-title">
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
                  <div className="control-btns">
                    <div className="like-btn">
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
                      <strong> {data.like}</strong>
                    </div>
                    <div className="comment-btn">
                      <span>
                        <div
                          // onClick={this.handleSave}
                          className="view"
                        >
                          <EyeOutlined className="views-img-line" />
                        </div>
                      </span>
                      <strong> 3K</strong>
                    </div>
                    <div className="comment-btn">
                      <span>
                        <div
                          // onClick={this.handleSave}
                          className="comment"
                        >
                          <MessageOutlined className="cmnt-img-line" />
                        </div>
                      </span>
                      <strong>{data.cm}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="img-post-caption">
                <Paragraph
                  style={{ textAlign: `justify` }}
                  ellipsis={{ rows: 2, expandable: true, symbol: "ادامه" }}
                >
                  {data.caption}
                </Paragraph>
                {this.state.tags.map((tag, idx) => {
                  return (
                    <Tag key={idx} color="blue">
                      #{tag}
                    </Tag>
                  );
                })}
                <div className="center-cm-btn">
                  <div
                    onClick={() => {
                      this.setState({
                        hide: !this.state.hide
                      });
                    }}
                    className="toggle-btn-comment"
                  >
                    <MessageOutlined className="cmnt-img-line" />
                  </div>
                </div>
                <div className={this.state.hide && "hide-cm"}>
                  <Divider />
                  <div className="emoji-keyboard">
                    <span onClick={this.emojiClick}>😍</span>
                    <span onClick={this.emojiClick}>😉</span>
                    <span onClick={this.emojiClick}>😂</span>
                    <span onClick={this.emojiClick}>😁</span>
                    <span onClick={this.emojiClick}>😘</span>
                    <span onClick={this.emojiClick}>🤬</span>
                    <span onClick={this.emojiClick}>😤</span>
                    <span onClick={this.emojiClick}>😒</span>
                    <span onClick={this.emojiClick}>👌</span>
                    <span onClick={this.emojiClick}>👍</span>
                    <span onClick={this.emojiClick}>👎</span>
                    <span onClick={this.emojiClick}>❤️</span>
                    <span onClick={this.emojiClick}>🙏</span>
                    <span onClick={this.emojiClick}>👏</span>
                    <span onClick={this.emojiClick}>😎</span>
                    <span onClick={this.emojiClick}>🤩</span>
                    <span onClick={this.emojiClick}>😊</span>
                    <span onClick={this.emojiClick}>😏</span>
                    <span onClick={this.emojiClick}>🤨</span>
                  </div>
                  <Form.Item>
                    <TextArea
                      // rows={1}
                      allowClear={true}
                      ref="imgComment"
                      onChange={this.onCommentChange}
                      id="img-post-comment"
                      value={this.state.value}
                      autoSize={true}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      loading={this.state.submitting}
                      onClick={this.onSubmit}
                      type="primary"
                    >
                      {this.state.btnTxt}
                    </Button>
                  </Form.Item>
                </div>
                <Divider style={{ marginTop: 0 }} />
              </div>
            </div>
            <div className="img-post-comment-container">
              <Spin
                className="img-post-spin"
                spinning={this.state.Cloading}
                size="large"
              />
              {this.state.Comments.map(cm => {
                return (
                  <Comment
                    key={cm.id}
                    author={
                      <a id={cm.id} name={cm.user.name} onClick={this.onReply}>
                        {cm.user.name} <RollbackOutlined />
                      </a>
                    }
                    avatar={
                      <Avatar className="capital-letter">
                        {cm.user.name.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    content={
                      <Paragraph
                        className="img-post-cm"
                        ellipsis={{
                          rows: 2,
                          expandable: true,
                          symbol: "ادامه"
                        }}
                      >
                        {cm.text}
                      </Paragraph>
                    }
                  >
                    {cm.sub_comment.map(subCm => {
                      return (
                        <Comment
                          key={subCm.id}
                          author={<span>{subCm.user.name}</span>}
                          avatar={
                            <Avatar className="capital-letter">
                              {subCm.user.name.charAt(0).toUpperCase()}
                            </Avatar>
                          }
                          content={
                            <Paragraph
                              className="img-post-cm"
                              ellipsis={{
                                rows: 2,
                                expandable: true,
                                symbol: "ادامه"
                              }}
                            >
                              {subCm.text}
                            </Paragraph>
                          }
                        ></Comment>
                      );
                    })}
                  </Comment>
                );
              })}
            </div>
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
// export default sizeMe()(PaginateGrid);
