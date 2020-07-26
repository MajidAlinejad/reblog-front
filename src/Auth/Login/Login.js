import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Checkbox, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { forgot, login, setAccessToken } from "../Auth";

// redux import
import { getUser } from "../../Redux/Action/User";

class Login extends Component {
  state = {
    loading: false,
    username: "",
    password: "",
    token: ""
  };

  onUsernameChange = e => {
    const { value } = e.target;
    this.setState({ username: value });
  };

  onPasswordChange = e => {
    const { value } = e.target;
    this.setState({ password: value });
  };
  validateFields = () => {
    if ((this.state.username === "") & !this.state.forgot) {
      message.error({
        content: "نام کاربری خود را وارد کنید",
        duration: 2
      });
      return false;
    }
    if ((this.state.password === "") & !this.state.forgot) {
      message.error({
        content: "رمز عبور خود را وارد کنید",
        duration: 2
      });

      return false;
    }

    return true;
  };

  forgotPassword = () => {
    // this.props.history.push('/login?forgot=true');
    this.setState(prevState => ({
      forgot: !prevState.forgot,
      error: undefined
    }));
  };

  onSubmit = () => {
    const { username, password, token } = this.state;

    if (this.validateFields()) {
      this.setState({ loading: true });

      if (this.state.forgot) {
        // forgot(mobile, token).then(
        //   res => {
        //     this.setState({
        //       loading: false,
        //       sent: true,
        //       message: res.data.message
        //     });
        //     if (res.data.reset_token) {
        //       this.props.history.replace(
        //         "/reset?token=" + res.data.reset_token
        //       );
        //     }
        //   },
        //   err =>
        //     this.setState({
        //       error: err.response.data.message,
        //       loading: false
        //     })
        // );
      } else {
        login(username, password).then(
          res => {
            setAccessToken(res.data.token);
            this.props.getUser();

            message.success({
              content: "خوش آمدید" + res.data.user.name,
              duration: 2
            });
            this.setState({
              loading: false
            });
            // this.props.history.push("/dashboard");
          },
          err => {
            message.error({
              content: err.response.data.error,
              duration: 2
            });
            this.setState({
              loading: false
            });
          }
        );
      }
    }
  };

  // componentDidUpdate(prevProps) {
  //   if (prevProps.user !== this.props.user) {

  //     });
  //   }
  // }
  componentDidMount() {
    // this.props.getUser();
  }

  render() {
    return (
      <div>
        <Form
          name="Login"
          className="login-form"
          onsu
          initialValues={{
            remember: true
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "لطفا نام کاربری را وارد نمایید!"
              }
            ]}
          >
            <Input
              //   value={this.state.username}
              onChange={this.onUsernameChange}
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="نام کاربری"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "لطفا رمز عبور را وارد نمایید!"
              }
            ]}
          >
            <Input
              size="large"
              value={this.state.password}
              onChange={this.onPasswordChange}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="رمز عبور"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>مرا به یاد داشته باش</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              فراموشی رمز عبور؟
            </a>
          </Form.Item>
          <Form.Item name="submit">
            <Button
              block={1}
              onClick={this.onSubmit}
              loading={this.state.loading}
              key="back"
              type="primary"
            >
              ورود
            </Button>
          </Form.Item>
        </Form>
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
    getUser: () => {
      dispatch(getUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
