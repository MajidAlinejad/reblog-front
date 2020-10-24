import React, { Component } from "react";
import logo from "../../logo.svg";
import logoWide from "../../logo-wide.svg";
import circleSvg from "../../assets/picture/circle.svg";
import { connect } from "react-redux";

import {
  Affix,
  Badge,
  Modal,
  Button,
  Popover,
  Layout,
  Menu,
  message,
  Switch
} from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  DownOutlined,
  BellOutlined,
  MailOutlined,
  SettingOutlined
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import Login from "../../Auth/Login/Login";
import Register from "../../Auth/Register/Register";
import { getUser, deleteUser } from "../../Redux/Action/User";
import { toggleNightMode, getNightMode } from "../../Redux/Action/View";

class Header extends Component {
  state = {
    loading: false,
    visible: false,
    register: false,
    popover: false,
    letter: false,
    name: false,
    nightMode: false,
    user: {
      email: ""
    }
  };

  Popover = () => {
    this.setState({
      popover: false
    });
  };

  iconSelector = (i, svgCode) => {
    let svgComponent = () => (
      <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
        <path d={svgCode} />
      </svg>
    );
    let IconComponent = props => <Icon component={svgComponent} {...props} />;
    return <IconComponent className="header-icon-link" />;
  };

  handleVisiblePopover = visible => {
    this.setState({ popover: visible });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleNightMode = () => {
    let nightMode = !this.state.nightMode;
    this.props.toggleNightMode(nightMode);
    // this.setState({
    //   nightMode: !this.state.nightMode
    // });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onFinish = values => {
    console.log("Success:", values);
  };

  toggleRegister = () => {
    this.setState({ register: this.state.register ? false : true });
  };

  signOut = () => {
    this.props.deleteUser();
    localStorage.removeItem("token");
    message.warn({
      content: "از حساب کاربری خارج شدید",
      duration: 2
    });
    this.setState(
      {
        user: []
      },
      () => this.props.getUser()
    );
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      let letter = this.props.user.name;
      this.handleCancel();
      this.setState({
        letter: letter ? letter.charAt(0).toUpperCase() : null,
        name: this.props.user.name,
        user: this.props.user
      });
    }
    if (prevProps.night !== this.props.night) {
      this.setState({
        nightMode: this.props.night
      });
    }
  }

  componentDidMount() {
    this.props.getNightMode();
  }

  render() {
    const { visible } = this.state;
    const { blogs } = this.props;
    return (
      <Affix>
        <Layout.Header
          style={{
            backgroundColor: "#fafafa"
          }}
        >
          <Menu
            style={{
              backgroundColor: "#fafafa"
            }}
            className="baseMenu"
            mode="horizontal"
          >
            <Menu.Item key="0" disabled>
              <img alt="-" className="logoSm" src={logo} width={40} />
              <img alt="-" className="logoWide" src={logoWide} width={120} />
            </Menu.Item>
            {this.state.letter ? (
              <Menu.Item
                key="1"
                className="user-circle"
                style={{
                  float: "left"
                }}
              >
                <Link to="/User">
                  <div
                    className="user-letter"
                    style={{ background: `url(${circleSvg})` }}
                  >
                    {this.state.letter}
                  </div>
                </Link>

                <Popover
                  content={
                    <Menu
                      style={{ width: 180 }}
                      // defaultSelectedKeys={["1"]}
                      mode="vertical"
                      className="login-menu"
                    >
                      <Menu.Item
                        className="night-mode"
                        onClick={this.handleNightMode}
                        key="1"
                        // icon={<AppstoreOutlined />}
                      >
                        حالت شب
                        <Switch
                          checked={this.state.nightMode}
                          checkedChildren="🌙"
                          unCheckedChildren="☀️"
                        />
                      </Menu.Item>
                      <Menu.Item key="2" icon={<MailOutlined />}>
                        خروج
                      </Menu.Item>
                      <Menu.Item
                        onClick={this.signOut}
                        key="3"
                        icon={<SettingOutlined />}
                      >
                        خروج
                      </Menu.Item>
                    </Menu>
                  }
                  title={
                    <div>
                      <div
                        className="user-letter-big"
                        style={{ background: `url(${circleSvg})` }}
                      >
                        {this.state.letter}
                      </div>
                      <div className="center grey">{this.state.name}</div>
                      <div className="center gray">{this.state.user.email}</div>
                    </div>
                  }
                  trigger="click"
                  placement="bottomLeft"
                  visible={this.state.popover}
                  onVisibleChange={this.handleVisiblePopover}
                >
                  <DownOutlined className="letter-login-caret" />
                </Popover>
              </Menu.Item>
            ) : (
              <Menu.Item
                key="1"
                onClick={this.showModal}
                style={{
                  float: "left"
                }}
              >
                <UserOutlined
                  style={{
                    fontSize: "15pt"
                  }}
                />
              </Menu.Item>
            )}
            <Menu.Item key="2" className="centerize-nav">
              <Link to="/Notify">
                <Badge
                  count={2}
                  style={{
                    backgroundColor: "#eb2f96"
                  }}
                >
                  <BellOutlined
                    style={{
                      fontSize: "15pt"
                    }}
                  />
                </Badge>
              </Link>
            </Menu.Item>
            {blogs.map((blog, i) => {
              return (
                blog.status === "active" && (
                  <Menu.Item key={i + 3} className="centerize-nav">
                    <Link to={"/blog/" + blog.url + `/${blog.seo}`}>
                      {/* <Badge
                        count={1}
                        style={{
                          backgroundColor: "#eb2f96"
                        }}
                      > */}
                      {this.iconSelector(i, blog.icon)}
                      {/* </Badge> */}
                    </Link>
                  </Menu.Item>
                )
              );
            })}
          </Menu>
          <Modal
            className="login-modal"
            visible={visible}
            title={this.state.register ? "ثبت نام" : "ورود"}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button
                block={1}
                key="back"
                type="link"
                onClick={this.toggleRegister}
              >
                {this.state.register
                  ? "حساب کاربری دارید؟ وارد شوید"
                  : "حساب کاربری ندارید ؟ ثبت نام"}
              </Button>
            ]}
          >
            {this.state.register ? <Register /> : <Login />}
          </Modal>
        </Layout.Header>
      </Affix>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    night: state.view.night
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(getUser());
    },
    deleteUser: () => {
      dispatch(deleteUser());
    },
    toggleNightMode: mode => {
      dispatch(toggleNightMode(mode));
    },
    getNightMode: () => {
      dispatch(getNightMode());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
