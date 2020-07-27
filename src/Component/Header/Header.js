// import axios from "axios";
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
  message
} from "antd";
// import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  BellOutlined,
  DownOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import Login from "../../Auth/Login/Login";
import Register from "../../Auth/Register/Register";
import { getUser, deleteUser } from "../../Redux/Action/User";
// const { Header } = Layout;
const CustomSVG1 = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const CustomSVG2 = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const CustomSVG3 = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
const { SubMenu } = Menu;
const CustomIcon1 = props => <Icon component={CustomSVG1} {...props} />;
const CustomIcon2 = props => <Icon component={CustomSVG2} {...props} />;
const CustomIcon3 = props => <Icon component={CustomSVG3} {...props} />;

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

class Header extends Component {
  state = {
    loading: false,
    visible: false,
    register: false,
    popover: false,
    letter: false,
    name: false,
    user: {
      email: ""
    }
  };

  Popover = () => {
    this.setState({
      popover: false
    });
  };

  iconSelector = i => {
    if (i == 2) {
      return (
        <CustomIcon3
          style={{
            fontSize: "15pt"
          }}
        />
      );
    } else if (i == 1) {
      return (
        <CustomIcon2
          style={{
            fontSize: "15pt"
          }}
        />
      );
    } else {
      return (
        <CustomIcon1
          style={{
            fontSize: "15pt"
          }}
        />
      );
    }
  };

  handleVisiblePopover = visible => {
    this.setState({ popover: visible });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
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
  }

  render() {
    const { visible, loading } = this.state;
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
            defaultSelectedKeys={["2"]}
          >
            <Menu.Item key="0" disabled>
              <img alt="-" className="logoSm" src={logo} width={40} />
              <img alt="-" className="logoWide" src={logoWide} width={120} />
              {/* <strong>نگار آفر</strong> */}
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
                      // onClick={this.handleClick}
                      style={{ width: 180 }}
                      defaultSelectedKeys={["1"]}
                      mode="vertical"
                      className="login-menu"
                    >
                      <Menu.Item key="1" icon={<AppstoreOutlined />}>
                        خروج
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
                  {/* <div className="user-letter-after">Ω</div> */}
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
                {/* <Link to="/User"> */}
                <UserOutlined
                  style={{
                    fontSize: "15pt"
                  }}
                />
                {/* </Link> */}
              </Menu.Item>
            )}
            {blogs.map((blog, i) => {
              return (
                <Menu.Item
                  key={i + 2}
                  className="centerize-nav"
                  // style={{
                  //   transform: "translateX(" + -180 + "px)"
                  // }}
                >
                  <Link to={i == 0 ? "/" : "B" + (i + 1)}>
                    <Badge
                      count={1}
                      style={{
                        backgroundColor: "#eb2f96"
                      }}
                    >
                      {this.iconSelector(i)}
                    </Badge>
                  </Link>
                </Menu.Item>
              );
            })}
            <Menu.Item
              key="5"
              className="centerize-nav"
              // style={{
              //   transform: "translateX(" + -210 + "px)"
              // }}
            >
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
    user: state.user.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(getUser());
    },
    deleteUser: () => {
      dispatch(deleteUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
