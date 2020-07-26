import React, { Component } from "react";
import { connect } from "react-redux";

import { Layout, Collapse, Affix } from "antd";

import { getSidebar } from "../../Redux/Action/View";

const { Sider } = Layout;

class Sidebar extends Component {
  state = {
    sidebar: {
      hide: true
    }
  };
  componentDidMount() {
    this.props.getSidebar();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.sidebar !== this.props.sidebar) {
      this.setState({
        sidebar: this.props.sidebar
      });
    }
  }

  render() {
    const { hide } = this.state.sidebar;
    return (
      <React.Fragment>
        <Sider
          width={280}
          className={hide ? "side-content hide" : "side-content"}
        >
          <div className="side-menu">
            <Collapse defaultActiveKey={["1"]}>
              <Collapse.Panel
                className="side-collapse"
                header="دسته بندی"
                key="1"
              >
                <hr className="minimal-border" />
                <p>
                  <div className="cat-list">کامپیوتر و تجهیزات جانبی</div>
                  <div className="cat-list">تجهیزات ذخیره‌سازی اطلاعات</div>
                  <div className="cat-list">تجهیزات شبکه و ارتباطات</div>
                  <div className="cat-list">کامپیوترهای All-in-One</div>
                  <div className="cat-list">کیس های اسمبل شده</div>
                  <div className="cat-list">کامپیوترهای کوچک</div>
                  <div className="cat-list">قطعات کامپیوتر</div>
                </p>
              </Collapse.Panel>
            </Collapse>
            <Collapse defaultActiveKey={["1"]}>
              <Collapse.Panel
                className="side-collapse"
                header="دسته بندی"
                key="1"
              >
                <hr className="minimal-border" />
                <p>
                  <div className="cat-list">کامپیوتر و تجهیزات جانبی</div>
                  <div className="cat-list">تجهیزات ذخیره‌سازی اطلاعات</div>
                  <div className="cat-list">تجهیزات شبکه و ارتباطات</div>
                  <div className="cat-list">کامپیوترهای All-in-One</div>
                  <div className="cat-list">کیس های اسمبل شده</div>
                  <div className="cat-list">کامپیوترهای کوچک</div>
                  <div className="cat-list">قطعات کامپیوتر</div>
                </p>
              </Collapse.Panel>
            </Collapse>
            <Collapse defaultActiveKey={["1"]}>
              <Collapse.Panel
                className="side-collapse"
                header="دسته بندی"
                key="1"
              >
                <hr className="minimal-border" />
                <p>
                  <div className="cat-list">کامپیوتر و تجهیزات جانبی</div>
                  <div className="cat-list">تجهیزات ذخیره‌سازی اطلاعات</div>
                  <div className="cat-list">تجهیزات شبکه و ارتباطات</div>
                  <div className="cat-list">کامپیوترهای All-in-One</div>
                  <div className="cat-list">کیس های اسمبل شده</div>
                  <div className="cat-list">کامپیوترهای کوچک</div>
                  <div className="cat-list">قطعات کامپیوتر</div>
                </p>
              </Collapse.Panel>
            </Collapse>
            <Collapse defaultActiveKey={["1"]}>
              <Collapse.Panel
                className="side-collapse"
                header="دسته بندی"
                key="1"
              >
                <hr className="minimal-border" />
                <p>
                  <div className="cat-list">کامپیوتر و تجهیزات جانبی</div>
                  <div className="cat-list">تجهیزات ذخیره‌سازی اطلاعات</div>
                  <div className="cat-list">تجهیزات شبکه و ارتباطات</div>
                  <div className="cat-list">کامپیوترهای All-in-One</div>
                  <div className="cat-list">کیس های اسمبل شده</div>
                  <div className="cat-list">کامپیوترهای کوچک</div>
                  <div className="cat-list">قطعات کامپیوتر</div>
                </p>
              </Collapse.Panel>
            </Collapse>
            <Collapse defaultActiveKey={["1"]}>
              <Collapse.Panel
                className="side-collapse"
                header="دسته بندی"
                key="1"
              >
                <hr className="minimal-border" />
                <p>
                  <div className="cat-list">کامپیوتر و تجهیزات جانبی</div>
                  <div className="cat-list">تجهیزات ذخیره‌سازی اطلاعات</div>
                  <div className="cat-list">تجهیزات شبکه و ارتباطات</div>
                  <div className="cat-list">کامپیوترهای All-in-One</div>
                  <div className="cat-list">کیس های اسمبل شده</div>
                  <div className="cat-list">کامپیوترهای کوچک</div>
                  <div className="cat-list">قطعات کامپیوتر</div>
                </p>
              </Collapse.Panel>
            </Collapse>
          </div>
        </Sider>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    sidebar: state.view.sidebar
    // user: state.user.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSidebar: () => {
      dispatch(getSidebar());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
