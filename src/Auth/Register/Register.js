import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Checkbox, Button, message } from "antd";
import { register, setAccessToken } from "../Auth";

// redux import
import { getUser } from "../../Redux/Action/User";

class Register extends Component {
  state = {
    loading: false,
    password: "",
    email: "",
    confirm: "",
    name: ""
  };

  onNameChange = e => {
    const { value } = e.target;
    this.setState({ name: value });
  };

  onEmailChange = e => {
    const { value } = e.target;
    this.setState({ email: value });
  };

  onConfirmChange = e => {
    const { value } = e.target;
    this.setState({ confirm: value });
  };

  onPasswordChange = e => {
    const { value } = e.target;
    this.setState({ password: value });
  };
  validateFields = () => {
    if ((this.state.email === "") & !this.state.forgot) {
      message.error({
        content: "ایمیل خود را وارد کنید",
        duration: 2
      });
      return false;
    }
    if ((this.state.name === "") & !this.state.forgot) {
      message.error({
        content: "لطفا یک نام مستعار وارد کنید",
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

    if ((this.state.password !== this.state.confirm) & !this.state.forgot) {
      message.error({
        content: "رمز عبور با تکرار آن همخوانی ندارد!",
        duration: 2
      });

      return false;
    }

    return true;
  };

  onSubmit = () => {
    const { email, password, name } = this.state;

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
        register(email, password, name).then(
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
            // err.response.data.forEach(err => {

            // });
            if (err.response.data.email)
              message.error({
                content: err.response.data.email,
                duration: 2
              });
            if (err.response.data.password)
              message.error({
                content: err.response.data.password,
                duration: 2
              });

            console.log(err.response);
            this.setState({
              loading: false
            });
          }
        );
      }
    }
  };

  render() {
    return (
      <div>
        <Form
          name="Register"
          className="register-form"
          onFinish={this.onFinish}
        >
          <Form.Item
            name="email"
            onChange={this.onEmailChange}
            rules={[
              {
                type: "email",
                message: "لطفا یک آدرس ایمیل معتبر وارد کنید"
              },
              {
                required: true,
                message: "فیلد ایمیل اجباریست"
              }
            ]}
          >
            <Input size="large" placeholder="ایمیل" />
          </Form.Item>
          <Form.Item
            onChange={this.onNameChange}
            name="nickname"
            rules={[
              {
                required: true,
                message: "یک نام مستعار برای خود انتخاب کنید",
                whitespace: true
              }
            ]}
          >
            <Input size="large" placeholder="نام مستعار" />
          </Form.Item>
          {/* <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "لطفا نام کاربری را وارد نمایید!"
              }
            ]}
          >
            <Input size="large" placeholder="نام کاربری" />
          </Form.Item> */}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "لطفا رمز عبور را وارد نمایید!"
              }
            ]}
            hasFeedback
          >
            <Input.Password
              onChange={this.onPasswordChange}
              size="large"
              type="password"
              placeholder="رمز عبور"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            onChange={this.onConfirmChange}
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "لطفا تکرار رمز عبور را وارد نمایید!!"
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject("رمز عبور با تکرار آن همخوانی ندارد!");
                }
              })
            ]}
          >
            <Input.Password
              size="large"
              type="password"
              placeholder="تکرار رمز عبور"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>
                با <a href="">توافق نامه </a> این سایت موافق هستم
              </Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              فراموشی رمز عبور؟
            </a>
          </Form.Item>
          <Form.Item name="submit">
            <Button
              block={1}
              loading={this.state.loading}
              key="back"
              onClick={this.onSubmit}
              type="primary"
            >
              ثبت نام
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
)(Register);
