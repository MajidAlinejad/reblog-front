import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Checkbox, Tooltip, Row, Col, Button } from "antd";
export class Register extends Component {
  state = {
    loading: false
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
              size="large"
              type="password"
              placeholder="رمز عبور"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
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

          {/* <Form.Item
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
          </Form.Item> */}

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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
