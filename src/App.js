//Basic import
import React, { Component } from "react";
import { connect } from "react-redux";
import { BackTop, ConfigProvider, Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import Axios from "axios";

// css import
import "./App.css";
import "antd/dist/antd.css";
import "simplebar/dist/simplebar.min.css";
// config import
import fa_IR from "antd/lib/locale-provider/fa_IR";
import "moment/locale/fa";
import moment from "moment";
//component import
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import Routes from "./Routes/Routes";
import Lottie from "react-lottie";
import * as animationData from "./assets/lottie/car.json";
// redux import
import { getUser } from "./Redux/Action/User";
import { getNightMode } from "./Redux/Action/View";

moment.locale("fa");

const { Content } = Layout;
var styleArray = [
  'background-image:    url("https://colinbendell.cloudinary.com/image/upload/c_crop,f_auto,g_auto,h_350,w_400/v1512090971/Wizard-Clap-by-Markus-Magnusson.gif")',
  "background-size: cover",
  "color: #000",
  "padding: 10px 20px",
  "line-height: 50px",
  "width : 150px",
  "height : 150px",
  "border : 2px solid #ccc"
];

var logoConsole = [
  'background-image:    url("http://smarblog.mamp:8050/logo-wide.png")',
  "background-size: cover",
  "line-height: 30px"
];

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class App extends Component {
  state = {
    data: [],
    loading: true,
    night: false
    // apploading: true
  };

  async getItems(items) {
    this.setState({ loading: true });
    Axios.get(process.env.REACT_APP_API_URL + items).then(res => {
      const data = res.data;
      this.setState({
        data: data,
        loading: false
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        loading: this.props.user.loading
      });
    }
    if (prevProps.night !== this.props.night) {
      this.setState({
        night: this.props.night
      });
    }
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getNightMode();
    this.getItems("blogs");
    console.log("%c            ", logoConsole.join(";"));
    console.log(
      "%cWelcome to NegarAfar , We are Happy for you 😍 and wish you Good luck 😘",
      "font-weight: lighter;color:#999999; font-size: 13px; font-family : cursive "
    );

    console.log("%cBe Happy", styleArray.join(";"));
  }

  render() {
    return (
      <Router>
        <ConfigProvider direction="rtl" locale={fa_IR}>
          <div
            className={
              this.state.loading ? "abs-loading active" : "abs-loading"
            }
          >
            {/* <div class="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div> */}
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
          <Layout>
            <Header blogs={this.state.data} />
            <Content>
              <Routes blogs={this.state.data} />
            </Content>
            <BackTop />
            <Footer />
          </Layout>
        </ConfigProvider>
      </Router>
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
    getNightMode: () => {
      dispatch(getNightMode());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
