import axios from "axios";
import React, { Component } from "react";
import logo from "./logo.svg";
import logoWide from "./logo-wide.svg";
import "./App.css";
import {
  DatePicker,
  Affix,
  BackTop,
  ConfigProvider,
  Badge,
  PageHeader,
  Col
} from "antd";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, List, Typography, Divider } from "antd";
import fa_IR from "antd/lib/locale-provider/fa_IR";
import "moment/locale/fa";
import moment from "moment";

import {
  UserOutlined,
  TrademarkCircleFilled,
  LaptopOutlined,
  NotificationOutlined,
  BellOutlined,
  MessageOutlined
} from "@ant-design/icons";

moment.locale("fa");

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires."
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async getItems() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const persons = res.data;
      this.setState({ persons });
    });
  }

  componentDidMount() {
    this.getItems();
  }
  render() {
    return (
      <Router>
        <ConfigProvider direction="rtl" locale={fa_IR}>
          <Layout>
            <Affix>
              <Header style={{ backgroundColor: "#fafafa" }}>
                <Menu
                  style={{ backgroundColor: "#fafafa" }}
                  className="baseMenu"
                  mode="horizontal"
                  defaultSelectedKeys={["1"]}
                >
                  <Menu.Item key="0" disabled>
                    <img alt="-" className="logoSm" src={logo} width={40} />
                    <img
                      alt="-"
                      className="logoWide"
                      src={logoWide}
                      width={120}
                    />
                    {/* <strong>نگار آفر</strong> */}
                  </Menu.Item>
                  <Menu.Item key="1" style={{ float: "left" }}>
                    <TrademarkCircleFilled style={{ fontSize: "15pt" }} />
                  </Menu.Item>
                  <Menu.Item key="2" style={{ float: "left" }}>
                    <Link to="/">
                      <Badge count={12} style={{ backgroundColor: "#eb2f96" }}>
                        <BellOutlined style={{ fontSize: "15pt" }} />
                      </Badge>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="3" style={{ float: "left" }}>
                    <Link to="/dashboard">
                      <Badge count={2} style={{ backgroundColor: "#eb2f96" }}>
                        <LaptopOutlined style={{ fontSize: "15pt" }} />
                      </Badge>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="4" style={{ float: "left" }}>
                    <Link to="/about">
                      <Badge count={1} style={{ backgroundColor: "#eb2f96" }}>
                        <UserOutlined style={{ fontSize: "15pt" }} />
                      </Badge>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="5" style={{ float: "left" }}>
                    <Link to="/contact">
                      <Badge count={2} style={{ backgroundColor: "#eb2f96" }}>
                        <MessageOutlined style={{ fontSize: "15pt" }} />
                      </Badge>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Header>
            </Affix>

            <Content style={{ padding: "0 50px" }}>
              {/* <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title="Title"
                subTitle="This is a subtitle"
              /> */}
              <Layout>
                <Sider>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    style={{ height: "100%" }}
                  >
                    <SubMenu
                      key="sub1"
                      icon={<UserOutlined />}
                      title="subnav 1"
                    >
                      <Menu.Item key="1">option1</Menu.Item>
                      <Menu.Item key="2">option2</Menu.Item>
                      <Menu.Item key="3">option3</Menu.Item>
                      <Menu.Item key="4">option4</Menu.Item>
                    </SubMenu>
                    <SubMenu
                      key="sub2"
                      icon={<LaptopOutlined />}
                      title="subnav 2"
                    >
                      <Menu.Item key="5">option5</Menu.Item>
                      <Menu.Item key="6">option6</Menu.Item>
                      <Menu.Item key="7">option7</Menu.Item>
                      <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu
                      key="sub3"
                      icon={<NotificationOutlined />}
                      title="subnav 3"
                    >
                      <Menu.Item key="9">option9</Menu.Item>
                      <Menu.Item key="10">option10</Menu.Item>
                      <Menu.Item key="11">option11</Menu.Item>
                      <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>
                <Content style={{ padding: "0 24px", minHeight: 280 }}>
                  <Switch>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route path="/about">
                      <About />
                    </Route>
                    <Route path="/dashboard">
                      <Dashboard />
                    </Route>
                    <Route path="/contact">
                      <Contact />
                    </Route>
                  </Switch>
                </Content>
              </Layout>
            </Content>
            <BackTop />
            <Footer style={{ textAlign: "center" }}>
              "Made with ❤ by Negar Afar"
            </Footer>
          </Layout>
        </ConfigProvider>
      </Router>
    );
  }
}

function Home() {
  return (
    <div>
      <h2>خانه</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>درباره ما</h2>
      <DatePicker />
      <hr />
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      minima. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      minima. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      minima. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      minima. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      minima. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      minima. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      minima. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      minima. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      minima. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      minima. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
      recusandae quos natus nemo voluptates, blanditiis quo commodi ab aliquid
      non quas voluptatum odit tenetur voluptatem officiis suscipit incidunt
      reiciendis minima. Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Delectus recusandae quos natus nemo voluptates, blanditiis quo
      commodi ab aliquid non quas voluptatum odit tenetur voluptatem officiis
      suscipit incidunt reiciendis minima. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Delectus recusandae quos natus nemo
      voluptates, blanditiis quo commodi ab aliquid non quas voluptatum odit
      tenetur voluptatem officiis suscipit incidunt reiciendis minima. Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Delectus recusandae
      quos natus nemo voluptates, blanditiis quo commodi ab aliquid non quas
      voluptatum odit tenetur voluptatem officiis suscipit incidunt reiciendis
      minima.
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>داشبورد</h2>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h2>تماس با ما</h2>
    </div>
  );
}

export default App;
