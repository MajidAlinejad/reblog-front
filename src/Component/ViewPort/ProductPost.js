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
  Input,
  Breadcrumb,
  Radio,
  Popover,
  Tabs,
  Collapse,
  Empty
} from "antd";
import Axios from "axios";
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
  EditOutlined,
  RollbackOutlined,
  ShareAltOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
  SearchOutlined,
  SlidersOutlined,
  TagOutlined,
  TagFilled,
  CaretLeftFilled,
  FullscreenOutlined
} from "@ant-design/icons";
import { LikeDisLike, toggleSave } from "../../GlobalFunc/GlobalFunc";
import { connect } from "react-redux";
import { SRLWrapper, useLightbox } from "simple-react-lightbox";
import { isLoggedIn } from "../../Auth/Auth";
import { ColorExtractor } from "react-color-extractor";
import moment from "jalali-moment";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import Modal from "antd/lib/modal/Modal";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  EmailIcon,
  PinterestIcon,
  RedditShareButton,
  RedditIcon
} from "react-share";
import Countdown from "react-countdown";
import OpenLightBox from "../GlobalHook/OpenLightBox";
import { setPosts } from "../../Redux/Action/Post";
const { TabPane } = Tabs;
const { Panel } = Collapse;
var QRCode = require("qrcode.react");
const { TextArea } = Input;
const { Paragraph } = Typography;

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <span className="pr-timer ended">زمان به اتمام رسید</span>;
  } else {
    // Render a countdown
    return (
      <span className="pr-timer">
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

const options = {
  settings: {
    overlayColor: "#000000ba",
    autoplaySpeed: 1500,
    transitionSpeed: 900
  },
  buttons: {
    showAutoplayButton: false,
    showDownloadButton: false,
    showThumbnailsButton: false
  }
};

class ProductPost extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.TextAreaRef = React.createRef();
  }
  state = {
    id: "",
    data: {
      username: ""
    },
    loading: true,
    tab: "1",
    effect: false,
    disliked: false,
    tags: [],
    hide: true,
    value: "",
    reply: "",
    btnTxt: "ارسال نظر",
    Comments: [],
    Cloading: false,
    submitting: false,
    action: "",
    colors: [],
    specs: [],
    sloading: false,
    imageLoaded: false,
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
    if (this.props.user.unlikes) {
      if (this.props.user.unlikes.find(element => id === element)) {
        this.setState({
          disliked: true
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

  handleLiked = operation => {
    let type = operation ? 1 : -1;
    this.setState({
      liked: operation && true,
      disliked: !operation && true
    });
    this.props.user
      ? LikeDisLike(this.props.id, type).then(
          res => {},
          err => {
            message.error({
              content: "عملیات با مشکل مواجه شد، آیا وارد شده اید؟",
              duration: 2
            });
            this.setState({
              liked: operation && !this.state.liked,
              disliked: !operation && !this.state.disliked
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

  getSpecs = id => {
    Axios.get(
      process.env.REACT_APP_API_URL +
        "detail/" +
        this.props.id +
        `/${this.state.data.category_id}`
    ).then(res =>
      this.setState({
        specs: res.data,
        sloading: false
      })
    );
  };

  callback = key => {
    // console.log(key);
    this.setState({
      tab: key
    });
    // (key === "2") & !this.state.specs.length &&
    //   this.setState({ sloading: true }, () => {
    //     this.getSpecs();
    //   });
  };

  onReply = e => {
    window.scrollTo(0, this.TextAreaRef.current.offsetTop - 300);
    let txt = "پاسخ شما به " + e.currentTarget.name;
    this.setState({
      hide: false,
      btnTxt: txt,
      reply: e.currentTarget.id
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
            () => {
              message.success({
                content: "بازخورد شما ذخیره شد",
                duration: 2
              });
              this.getComment();
            }
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
        this.setState(
          {
            data: res.data,
            loading: false,
            tags: res.data.meta.split(",")
          },
          () => {
            this.getSpecs();
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
          () => {
            message.success({
              content: "بازخورد شما ذخیره شد",
              duration: 2
            });
            this.getComment();
          }
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

  getColors = colors =>
    this.setState(state => ({ colors: [...state.colors, ...colors] }));

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
          tab: "1",
          tags: [],
          specs: [],
          imageLoaded: false,
          loading: true
        },
        () => {
          this.getItems();
        }
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
    const { data, loading, colors, imageLoaded } = this.state;

    return (
      <div className="post-container product-post">
        <div
          className="product-row row-top "
          style={{
            transition: `all 2s ease !important`,

            background:
              imageLoaded && !!colors.length
                ? `linear-gradient(115deg,  ${colors[5]}05,${colors[1]}40 )`
                : `linear-gradient(115deg,#b8b8b833,#ebebeb3d)`
          }}
        >
          <Spin className="product-post-spin" spinning={loading} size="large" />
          <div className="pr-extra-btn">
            {this.state.liked ? (
              <LikeFilled />
            ) : (
              <LikeOutlined
                onClick={() => {
                  this.handleLiked(true);
                }}
              />
            )}

            {this.state.disliked ? (
              <DislikeFilled />
            ) : (
              <DislikeOutlined
                onClick={() => {
                  this.handleLiked(false);
                }}
              />
            )}

            <ShareAltOutlined
              onClick={() => {
                this.setState({ visible: true });
              }}
            />
            <MessageOutlined
              onClick={() => {
                this.setState({ tab: "3" }, () => {
                  window.scrollTo(0, this.TextAreaRef.current.offsetTop + 200);
                });
              }}
            />
            {this.state.saved ? (
              <TagFilled onClick={this.handleSave} />
            ) : (
              <TagOutlined onClick={this.handleSave} />
            )}
          </div>
          <Modal
            className="pr-share-btns"
            title="اشتراک گذاری"
            footer={null}
            visible={this.state.visible}
            onCancel={() => {
              this.setState({ visible: false });
            }}
          >
            <div className="pr-share-div">
              <WhatsappShareButton
                title={data.title}
                url={window.location.href}
              >
                <WhatsappIcon size={32} round={true} /> <span>واتس اپ</span>
              </WhatsappShareButton>

              <TelegramShareButton
                title={data.title}
                url={window.location.href}
              >
                <TelegramIcon size={32} round={true} /> <span>تلگرام</span>
              </TelegramShareButton>

              <TwitterShareButton title={data.title} url={window.location.href}>
                <TwitterIcon size={32} round={true} /> <span>توییتر</span>
              </TwitterShareButton>

              <FacebookShareButton
                title={data.title}
                url={window.location.href}
              >
                <FacebookIcon size={32} round={true} /> <span>فیس بوک</span>
              </FacebookShareButton>
            </div>
            <div className="pr-share-div">
              <LinkedinShareButton
                title={data.title}
                url={window.location.href}
              >
                <LinkedinIcon size={32} round={true} /> <span>لینکد این</span>
              </LinkedinShareButton>

              <PinterestShareButton
                description={data.title}
                media={data.img}
                url={window.location.href}
              >
                <PinterestIcon size={32} round={true} />
                <span> پینترست</span>
              </PinterestShareButton>

              <EmailShareButton title={data.title} url={window.location.href}>
                <EmailIcon size={32} round={true} /> <span>ایمیل</span>
              </EmailShareButton>

              <RedditShareButton title={data.title} url={window.location.href}>
                <RedditIcon size={32} round={true} /> <span>ردیت</span>
              </RedditShareButton>
            </div>
          </Modal>
          <div className="product-right-section">
            <div className="main-img-container">
              <SRLWrapper options={options}>
                <ColorExtractor getColors={this.getColors} maxColors={4}>
                  <img
                    alt="example"
                    // style={loading ? { opacity: 0 } : { opacity: 1 }}
                    className={`product-img ${imageLoaded ? "show" : "hide"}`}
                    onLoad={() => this.setState({ imageLoaded: true })}
                    // src={perfume}
                    src={data.img ? data.img : "0"}
                  />
                </ColorExtractor>
                <div className="pr-alter-img">
                  {this.state.blocks.map(blk => {
                    return <img key={blk.id} src={blk.special} />;
                  })}
                </div>
              </SRLWrapper>
            </div>
            {/* <div
              className={`thumnail-pr-main ${imageLoaded ? "show" : "hide"}`}
            >
              <img alt="example" src={data.img} />
            </div>
            <div
              className={`thumnail-pr-main ${imageLoaded ? "show" : "hide"}`}
            >
              <img alt="example" src={data.img} />
            </div>
            <div
              className={`thumnail-pr-main ${imageLoaded ? "show" : "hide"}`}
            >
              <img alt="example" src={data.img} />
            </div> */}
            <div
              className={`thumnail-pr-main ${imageLoaded ? "show" : "hide"}`}
            >
              {/* <img alt="example" src={data.img} /> */}
              <OpenLightBox />
            </div>
          </div>

          <div className="product-left-section">
            <div className="product-post-title">
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
              {/* <Divider className="product-top-hr" /> */}
              <div className="pr-control-panel">
                <div className="pr-right">
                  <Divider className="pr-block-hr" orientation="right">
                    خرید
                  </Divider>

                  <Breadcrumb className="breadcrumb-product" separator=">">
                    {data.breadcrumb &&
                      data.breadcrumb.map(bre => {
                        return (
                          <Breadcrumb.Item key={bre.id}>
                            <Link
                              to={"/blog/" + data.blog_id + "&cat=" + bre.id}
                            >
                              {bre.text}
                            </Link>
                          </Breadcrumb.Item>
                        );
                      })}
                  </Breadcrumb>
                  <Divider className="product-right-hr" />
                  <span className="pr-off-price">
                    <NumberFormat
                      value={data.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" تومان"}
                    />
                  </span>
                  <h1 className="product-price center">
                    قیمت :
                    <NumberFormat
                      value={Math.round(
                        data.price - data.price * (data.off / 100)
                      )}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" تومان"}
                    />
                    <span className="pr-right-off">{data.off}% تخفیف</span>
                  </h1>
                  <Divider dashed />
                  <Radio.Group
                    className="pr-radio-color"
                    // onChange={this.onChange} value={this.state.value}
                  >
                    <Radio className="pr-radio cream" value={1}>
                      کرمی
                    </Radio>
                    <Radio className="pr-radio blue" value={2}>
                      آبی
                    </Radio>
                    <Radio className="pr-radio red" value={3}>
                      قرمز
                    </Radio>
                    <Radio className="pr-radio lime" value={4}>
                      لیمویی
                    </Radio>
                  </Radio.Group>

                  <Button
                    className="pr-shop"
                    size="large"
                    block
                    type="primary"
                    danger
                  >
                    <ShoppingCartOutlined className="pr-shop-icon" />
                    افزودن به سبد خرید
                  </Button>
                </div>
                <div className="pr-left">
                  <Divider className="pr-block-hr" orientation="right">
                    جزئیات
                  </Divider>
                  <div className="pr-left-container">
                    <div className="center qr-code">
                      <QRCode value={window.location.href} />
                    </div>
                    <Divider className="m-0" dashed />

                    <Popover
                      trigger="click"
                      content={<p>{data.brand && data.brand.desc}</p>}
                    >
                      <li>
                        برند :
                        <span className="pr-det-link">
                          {data.brand && data.brand.fa_name}
                        </span>
                      </li>
                    </Popover>
                    <li>
                      تعداد افرادی که این محصول را پسندیده اند :
                      <span className="pr-det-link">{data.like} نفر </span>
                    </li>
                    <li>
                      تعداد افرادی که این محصول را نپسندیده اند :
                      <span className="pr-det-link">{data.unlike} نفر</span>
                    </li>
                    <li>
                      تعداد نظرات برای این محصول :
                      <span className="pr-det-link">{data.cm} نظر</span>
                    </li>
                    <li>
                      تاریخ افزودن محصول به فروشگاه :
                      <span className="pr-det-link">
                        {moment(data.created_at)
                          .locale("fa")
                          .format("DD/MMMM/YYYY")}
                      </span>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {data.expire > 0 && (
            <Countdown date={data.expire - Date.now()} renderer={renderer} />
          )}
        </div>
        {/* <div className="break-flex"></div> */}
        <div className="row-top">
          <Tabs
            className="pr-tab-main"
            defaultActiveKey={this.state.tab}
            activeKey={this.state.tab}
            onChange={this.callback}
            type="card"
            size="large"
          >
            <TabPane
              tab={
                <span>
                  <SearchOutlined />
                  نقد و بررسی
                </span>
              }
              key="1"
            >
              <div className="pr-tab-review">
                <Collapse defaultActiveKey={["1", "2", "3", "4"]} ghost>
                  {this.state.blocks.map((block, idx) => {
                    return (
                      <Panel
                        header={block.title}
                        key={idx + 1}
                        className={!block.text && "hide"}
                      >
                        <div>
                          <Paragraph style={{ textAlign: `justify` }}>
                            {block.text}
                          </Paragraph>
                          <div>
                            {block.img && (
                              <img
                                className="pr-img-review"
                                alt=""
                                src={block.img}
                              />
                            )}
                          </div>
                        </div>
                      </Panel>
                    );
                  })}
                </Collapse>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <SlidersOutlined />
                  جزئیات کالا
                </span>
              }
              key="2"
            >
              <Spin spinning={this.state.sloading} size="small" />
              {/* <h1> جزئیات کالا </h1> */}
              {this.state.specs.length ? (
                this.state.specs.map(spec => {
                  return (
                    <div>
                      <h2 className="spec-main-h">
                        <CaretLeftFilled />
                        {spec.name}
                      </h2>
                      {spec.det_spec.map(sub => {
                        return (
                          <div key={sub.id} className="spec-row">
                            <h4 className="spec-h"> {sub.name}</h4>
                            <span className="spec-v">
                              {sub.details.length > 1
                                ? sub.details.map((det, idx) => {
                                    return (
                                      <span>
                                        {sub.details.length > idx + 1
                                          ? det.value + " ,"
                                          : det.value}
                                      </span>
                                    );
                                  })
                                : sub.details[0] && sub.details[0].value}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              ) : (
                <Empty description={false} />
              )}

              {/* <Table dataSource={this.state.specs} /> */}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <MessageOutlined />
                  نظرات
                </span>
              }
              className="product-comment"
              key="3"
            >
              <div className="img-post-comment-container">
                <Spin spinning={this.state.Cloading} size="small" />
                <div className="center-cm-btn"></div>
                <div className={this.state.hide ? "hide-cm" : ""}>
                  <div className="emoji-keyboard">
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      😍
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      😉
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      😂
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      😁
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      😘
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      🤬
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      😤
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      😒
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      👌
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      👍
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      👎
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      ❤️
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      🙏
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      👏
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      😎
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      🤩
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      😊
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      😏
                    </span>
                    <span
                      role="img"
                      aria-label="xxxx"
                      onClick={this.emojiClick}
                    >
                      🤨
                    </span>
                  </div>
                  <div ref={this.TextAreaRef} className="cm-textbox">
                    <Form.Item>
                      <TextArea
                        rows={5}
                        allowClear={true}
                        className="product-post-comment"
                        onChange={this.onCommentChange}
                        id="img-post-comment"
                        value={this.state.value}
                        autoSize={true}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        className="pr-submit-btn"
                        size="large"
                        block
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
                {!!this.state.Comments.length &&
                  this.state.Comments.map(cm => {
                    return (
                      <Comment
                        className="pr-upper-cm"
                        actions={[
                          <div>
                            <span
                              className="img-post-comment-edit"
                              onClick={() => {
                                this.setState(
                                  {
                                    hide: false,
                                    value: cm.text,
                                    edit: cm.id
                                  },
                                  () => {
                                    window.scrollTo(
                                      0,
                                      this.TextAreaRef.current.offsetTop - 300
                                    );
                                  }
                                );
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
                              actions={[
                                <div>
                                  <span
                                    className="img-post-comment-edit"
                                    onClick={() => {
                                      this.setState({
                                        hide: false,
                                        value: subCm.text,
                                        edit: subCm.id
                                      });
                                    }}
                                  >
                                    <EditOutlined />

                                    <span className="comment-action">
                                      ویرایش
                                    </span>
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
                <div ref={this.myRef}></div>
              </div>
            </TabPane>
          </Tabs>
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
    setPosts: payload => {
      dispatch(setPosts(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPost);
// export default sizeMe()(PaginateGrid);
