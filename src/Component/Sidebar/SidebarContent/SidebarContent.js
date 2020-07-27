import React, { Component } from "react";
import { connect } from "react-redux";
import { Collapse } from "antd";

class SidebarContent extends Component {
  render() {
    return (
      <div>
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel className="side-collapse" header="دسته بندی" key="1">
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
          <Collapse.Panel className="side-collapse" header="دسته بندی" key="1">
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
          <Collapse.Panel className="side-collapse" header="دسته بندی" key="1">
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
          <Collapse.Panel className="side-collapse" header="دسته بندی" key="1">
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
          <Collapse.Panel className="side-collapse" header="دسته بندی" key="1">
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
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContent);
