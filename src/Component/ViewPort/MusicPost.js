import React, { Component } from "react";
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
  PlayCircleFilled,
  RollbackOutlined,
  EditOutlined
} from "@ant-design/icons";
import moment from "jalali-moment";
import noPic from "../../assets/picture/nopic.svg";
import { toggleLike, toggleSave } from "../../GlobalFunc/GlobalFunc";
import heart from "../../assets/picture/heart.png";
import { connect } from "react-redux";
import { isLoggedIn } from "../../Auth/Auth";
import { ColorExtractor } from "react-color-extractor";
import { addStream } from "../../Redux/Action/Stream";
import { setPosts } from "../../Redux/Action/Post";
const { TextArea } = Input;
const { Paragraph } = Typography;

class MusicPost extends Component {
  constructor(props) {
    super(props);
    this.audio = {};

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
    colors: [],
    edit: false
  };

  onAddAudio = block => {
    // console.log(id);
    // add to q
    this.props.addStream(block);
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

  getColors = colors =>
    this.setState(state => ({ colors: [...state.colors, ...colors] }));

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
          Comments: res.data.data,
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
            // console.log(this.myRef.current.offsetTop, this.myRef.current);
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
        this.setState(
          {
            data: res.data,
            loading: false,
            tags: res.data.meta.split(",")
          },
          () => {
            this.props.setPosts(res.data);
          }
        ),
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
          data: [],
          colors: [],
          //   liked: false,
          //   saved: false,
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
    const { data, loading, colors } = this.state;

    return (
      <div className="post-container music-post">
        <Spin
          className="music-post-spin"
          spinning={this.state.loading}
          size="large"
        />
        <div
          style={{
            background: `linear-gradient(0deg,#cacaca00, ${colors[1]}70 , ${
              colors[5]
            }90)`
          }}
          className="music-post-section album-container"
        >
          <div className="post-border">
            <div
              className={
                this.state.imgError
                  ? "music-post-container nopic"
                  : "music-post-container"
              }
              style={
                this.state.imgError
                  ? { background: `url(${noPic})` }
                  : { background: `inherit` }
              }
            >
              <ColorExtractor getColors={this.getColors} maxColors={4}>
                <img
                  className="main-img"
                  alt=""
                  src={process.env.REACT_APP_BASE_URL + data.thumbnail}
                  style={loading ? { opacity: 0 } : { opacity: 1 }}
                  onLoad={this.handleImageLoaded.bind(this)}
                  onError={this.handleImageErrored.bind(this)}
                />
              </ColorExtractor>
            </div>
          </div>

          <div className="music-post-title">
            <h1 className="title img-post-title music-title">{data.title}</h1>
            <h3 className="title img-post-title music-title">{data.special}</h3>

            <div className="music-control-btns">
              <div className="like-btn">
                <span>
                  <div
                    onClick={this.handleLiked}
                    style={{ background: `url(${heart})` }}
                    className={this.state.liked ? "heart is-active" : "heart"}
                  ></div>
                </span>
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

            <Divider />

            <div className="img-post-caption">
              <Paragraph style={{ textAlign: `justify` }}>
                {data.caption}
              </Paragraph>
              {this.state.tags.map((tag, idx) => {
                return (
                  <Tag key={idx} color="default">
                    #{tag}
                  </Tag>
                );
              })}
            </div>
          </div>
        </div>
        <Divider />

        <div className="music-list">
          <ul>
            <li>
              <div>نام آهنگ</div>
              <div>آلبوم</div>
              <div>خواننده</div>
              <div>تاریخ</div>
            </li>
            {this.state.blocks.map(block => {
              return (
                <li key={block.id}>
                  <div>
                    <span
                      className="music-play-btn"
                      onClick={() => this.onAddAudio(block)}
                    >
                      <PlayCircleFilled />
                    </span>
                    {block.title}
                  </div>
                  <div>{data.title}</div>
                  <div>{block.text}</div>
                  <div>
                    {moment(block.created_at)
                      .locale("fa")
                      .format("DD/MMMM/YYYY")}
                  </div>

                  {/* {block.text} */}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="music-post-section cm">
          <div className="music-post-text-container"></div>
          <div className="sticky-title music-post-sticky">
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
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    😍
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    😉
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    😂
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    😁
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    😘
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    🤬
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    😤
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    😒
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    👌
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    👍
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    👎
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    ❤️
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    🙏
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    👏
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    😎
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    🤩
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    😊
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    😏
                  </span>
                  <span role="img" aria-label="xxxx" onClick={this.emojiClick}>
                    🤨
                  </span>
                </div>
                <div className="cm-textbox">
                  <Form.Item>
                    <TextArea
                      // rows={1}
                      allowClear={true}
                      ref="imgComment"
                      onChange={this.onCommentChange}
                      id="music-post-comment"
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
          <div className="music-post-comment-container">
            <Spin
              className="music-post-spin"
              spinning={this.state.Cloading}
              size="large"
            />
            {this.state.Comments.map(cm => {
              return (
                <Comment
                  actions={[
                    <div>
                      <span
                        className="music-post-comment-edit"
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
                    <Button
                      type="link"
                      id={cm.id}
                      name={cm.user.name}
                      onClick={this.onReply}
                    >
                      {cm.user.name} <RollbackOutlined />
                    </Button>
                  }
                  avatar={
                    <Avatar className="capital-letter">
                      {cm.user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  content={
                    <Paragraph
                      className="music-post-cm"
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
                              className="music-post-comment-edit"
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
                            className="music-post-cm"
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

const mapDispatchToProps = dispatch => {
  return {
    addStream: block => {
      dispatch(addStream(block));
    },
    setPosts: payload => {
      dispatch(setPosts(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPost);
// export default sizeMe()(PaginateGrid);
