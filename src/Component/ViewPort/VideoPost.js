import React, { Component } from "react";
import ReactPlayer from "react-player";
import {
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
import {
  MessageOutlined,
  SaveFilled,
  SaveOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  RollbackOutlined,
  EditOutlined
} from "@ant-design/icons";
import moment from "jalali-moment";
import noPic from "../../assets/picture/nopic.svg";
import { toggleLike, toggleSave } from "../../GlobalFunc/GlobalFunc";
import heart from "../../assets/picture/heart.png";
import { connect } from "react-redux";
import { isLoggedIn } from "../../Auth/Auth";
const { TextArea } = Input;
const { Paragraph } = Typography;

class VideoPost extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    id: "",
    data: {
      username: ""
    },
    loading: true,
    effect: false,
    tags: [],
    hide: true,
    value: "",
    reply: "",
    btnTxt: "ارسال نظر",
    Comments: [],
    Cloading: false,
    submitting: false,
    action: "",
    blocks: [],
    edit: false
  };

  isLiked = () => {
    let id = parseInt(this.props.id);
    this.setState({ liked: false });
    if (this.props.user.likes) {
      if (this.props.user.likes.find(element => id === element)) {
        this.setState({
          liked: true
        });
      }
    }
  };

  isSaved = () => {
    let id = parseInt(this.props.id);
    this.setState({ saved: false });
    if (this.props.user.saves) {
      if (this.props.user.saves.find(element => id === element)) {
        this.setState({
          saved: true
        });
      }
    }
  };

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded", loading: false });
  }
  onCommentChange = e => {
    this.setState({ value: e.target.value });
  };

  emojiClick = e => {
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

  handleSave = e => {
    this.setState({
      saved: !this.state.saved
    });
    this.props.user
      ? toggleSave(this.props.id, this.state.saved).then(
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

  handleLiked = () => {
    this.setState({
      liked: !this.state.liked,
      liker: this.state.liked ? this.state.liker - 1 : this.state.liker + 1
    });
    this.props.user
      ? toggleLike(this.props.id, this.state.liked).then(
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
    Axios.get(process.env.REACT_APP_API_URL + "comments/" + this.props.id).then(
      res =>
        this.setState({
          Comments: res.data,
          Cloading: false
        })
    );
  };

  getBlocks = id => {
    Axios.get(process.env.REACT_APP_API_URL + "blocks/" + this.props.id).then(
      res =>
        this.setState({
          blocks: res.data,
          Bloading: false
        })
    );
  };

  onReply = e => {
    let txt = "پاسخ شما به " + e.target.name;
    this.setState({
      hide: false,
      btnTxt: txt,
      reply: e.target.id
    });
  };

  onSubmit = () => {
    if (this.state.edit) {
      this.onEdit();
    } else {
      this.setState({
        submitting: true
      });
      let post_id = this.props.id;
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
            window.scrollTo(0, this.myRef.current.offsetTop - 500);
            console.log(this.myRef.current.offsetTop, this.myRef.current);
          }
        },
        err => {
          this.setState({
            submitting: false
          });
          message.error({
            content: "عملیات با مشکل مواجه شد، آیا وارد شده اید؟",
            duration: 2
          });
        }
      );
    }
  };

  getItems = id => {
    Axios.get(process.env.REACT_APP_API_URL + "post/" + this.props.id).then(
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
      this.getBlocks(),
      this.getComment()
    );
  };

  onEdit = () => {
    this.setState({
      submitting: true
    });
    let text = this.state.value;
    Axios.put(process.env.REACT_APP_API_URL + "comment/" + this.state.edit, {
      text
    }).then(
      res => {
        this.setState(
          {
            submitting: false,
            hide: true,
            edit: false,
            value: "",
            reply: "",
            btnTxt: "ارسال نظر"
          },
          this.getComment()
        );
      },
      err => {
        this.setState({
          submitting: false
        });
        message.error({
          content: "عملیات با مشکل مواجه شد، آیا وارد شده اید؟",
          duration: 2
        });
      }
    );
  };

  componentDidUpdate(prevProps) {
    if (isLoggedIn()) {
      if (prevProps.user !== this.props.user) {
        this.isLiked();
        this.isSaved();
      }
    }
    if (prevProps.id !== this.props.id) {
      this.setState(
        {
          data: {
            username: ""
          },
          loading: true
        },
        this.getItems()
      );
      if (isLoggedIn()) {
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
    window.scrollTo(0, 0);
    this.getItems();
  }

  render() {
    const { data, loading } = this.state;

    return (
      <div className="post-container origin-post">
        <div className="origin-post-section">
          <div className="img-post-info">
            <div className="img-post-info-content right">
              <Avatar size="large" className="capital-letter">
                {data.username.charAt(0).toUpperCase()}
              </Avatar>
              <div className="img-post-autor">
                <strong> {data.username}</strong>
              </div>
              <i className="img-post-date">
                {moment(data.created_at)
                  .locale("fa")
                  .format("DD/MMMM/YYYY")}
              </i>
            </div>
            <div className="img-post-info-content left">
              <div className="control-btns">
                <div className="like-btn">
                  <span>
                    <div
                      onClick={this.handleLiked}
                      style={{ background: `url(${heart})` }}
                      className={this.state.liked ? "heart is-active" : "heart"}
                    ></div>
                  </span>
                  <strong> {data.like}</strong>
                </div>
                <div className="comment-btn">
                  <span>
                    <div className="view">
                      <EyeOutlined className="views-img-line" />
                    </div>
                  </span>
                  <strong> 3K</strong>
                </div>

                <div className="comment-btn">
                  <span>
                    <div className="comment">
                      <MessageOutlined className="cmnt-img-line" />
                    </div>
                  </span>

                  <strong>{data.cm}</strong>
                </div>
                <div className="comment-btn">
                  <span>
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
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="origin-post-title">
            <h1 className="title img-post-title origin-title">
              {data.title}
              {this.state.tags.map((tag, idx) => {
                return (
                  <Tag key={idx} color="blue">
                    #{tag}
                  </Tag>
                );
              })}
            </h1>
            <Divider />

            <div className="img-post-caption">
              <Paragraph style={{ textAlign: `justify` }}>
                {data.caption}
              </Paragraph>
            </div>
          </div>

          <div className="post-border">
            <div
              className={
                this.state.imgError
                  ? "origin-post-container nopic"
                  : "origin-post-container"
              }
              style={
                this.state.imgError
                  ? { background: `url(${noPic})` }
                  : { background: `inherit` }
              }
            >
              <Spin
                className="origin-post-spin"
                spinning={this.state.loading}
                size="large"
              />

              <ReactPlayer
                light={data.img}
                width="100%"
                height="400px"
                pip={false}
                controls={true}
                url={data.stream}
              />
              {/* <img
                className="main-img"
                alt=""
                src={data.img}
                style={loading ? { opacity: 0 } : { opacity: 1 }}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
              /> */}
            </div>
          </div>
        </div>
        <div className="img-post-section">
          <div className="origin-post-text-container">
            {this.state.blocks.map(block => {
              return (
                <div className="origin-post-block">
                  <Paragraph style={{ textAlign: `justify` }}>
                    {block.text}
                  </Paragraph>
                  <div className="origin-post-img-container">
                    <img className="main-img" alt="" src={block.img} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="sticky-title origin-post-sticky">
            <div className="img-post-caption">
              <div className="center-cm-btn">
                <div
                  onClick={() => {
                    this.setState({
                      hide: !this.state.hide,
                      value: "",
                      edit: false,
                      comment_id: "",
                      btnTxt: "ارسال نظر"
                    });
                  }}
                  className="toggle-btn-comment"
                >
                  {this.state.hide ? (
                    <MessageOutlined className="cmnt-img-line" />
                  ) : (
                    <CloseCircleOutlined className="cmnt-img-line" />
                  )}
                </div>
              </div>
              <div className={this.state.hide ? "hide-cm" : ""}>
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
                <div className="cm-textbox">
                  <Form.Item>
                    <TextArea
                      // rows={1}
                      allowClear={true}
                      ref="imgComment"
                      onChange={this.onCommentChange}
                      id="origin-post-comment"
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
              </div>
              <Divider style={{ marginTop: 0 }} />
            </div>
          </div>
          <div className="origin-post-comment-container">
            <Spin
              className="origin-post-spin"
              spinning={this.state.Cloading}
              size="large"
            />
            {this.state.Comments.map(cm => {
              return (
                <Comment
                  actions={[
                    <div>
                      <span
                        className="origin-post-comment-edit"
                        onClick={() => {
                          this.setState({
                            hide: false,
                            value: cm.text,
                            edit: cm.id
                          });
                        }}
                      >
                        <EditOutlined />

                        <span
                          id={cm.id}
                          name={cm.text}
                          className="comment-action"
                        >
                          ویرایش
                        </span>
                      </span>
                    </div>
                  ]}
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
                      className="origin-post-cm"
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
                        actions={[
                          <div>
                            <span
                              className="origin-post-comment-edit"
                              onClick={() => {
                                this.setState({
                                  hide: false,
                                  value: subCm.text,
                                  edit: subCm.id
                                });
                              }}
                            >
                              <EditOutlined />

                              <span className="comment-action">ویرایش</span>
                            </span>
                          </div>
                        ]}
                        key={subCm.id}
                        author={<span>{subCm.user.name}</span>}
                        avatar={
                          <Avatar className="capital-letter">
                            {subCm.user.name.charAt(0).toUpperCase()}
                          </Avatar>
                        }
                        content={
                          <Paragraph
                            className="origin-post-cm"
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
            <div ref={this.myRef}></div>
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

export default connect(mapStateToProps)(VideoPost);
