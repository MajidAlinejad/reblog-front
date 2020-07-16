import React, { Component } from "react";
import "./App.css";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import { BackTop, ConfigProvider } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import fa_IR from "antd/lib/locale-provider/fa_IR";
import "moment/locale/fa";
import moment from "moment";
import FirstBlog from "./Component/FirstBlog/FirstBlog";

moment.locale("fa");

const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <ConfigProvider direction="rtl" locale={fa_IR}>
          <Layout>
            <Header />

            <Content style={{ minHeight: 800 }}>
              <Switch>
                <Route exact path="/">
                  <FirstBlog />
                </Route>
                <Route path="/B2">{/* <B2 /> */}</Route>
                <Route path="/B3">{/* <B3 /> */}</Route>
                <Route path="/notify">{/* <Notify /> */}</Route>
                <Route path="/contact">{/* <Contact /> */}</Route>
              </Switch>
            </Content>
            <BackTop />
            <Footer />
          </Layout>
        </ConfigProvider>
      </Router>
    );
  }
}

export default App;
