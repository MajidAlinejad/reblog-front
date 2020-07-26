//Basic import
import React, { Component } from "react";
import { connect } from "react-redux";
import { BackTop, ConfigProvider, Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import SimpleBar from "simplebar-react";
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

// redux import
import { getUser } from "./Redux/Action/User";
// import rootReducer from "./Redux/Reducer/User";
// import { getCities } from './actions/city';
// import { getCart } from './actions/cart';
// import { getMessage } from './actions/message';

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
  'background-image:    url("https://upload.wikimedia.org/wikipedia/commons/b/be/Lineage_OS_Logo.png")',
  "background-size: cover",
  "line-height: 80px",
  "width : 150px",
  "height : 150px"
];
class App extends Component {
  state = {
    data: [],
    loading: false
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

  componentDidMount() {
    this.props.getUser();
    this.getItems("blogs");
    console.log("%c                          ", logoConsole.join(";"));
    console.log(
      "%cWelcome to NegarAfar , We are Happy for you 😍 and wish you Good luck 😘",
      "font-weight: lighter; font-size: 13px; font-family : tahoma "
    );

    console.log("%cBe Happy", styleArray.join(";"));
  }
  render() {
    return (
      // <Provider>
      <Router>
        {/* {console.log(
          "%c JavaScript!!",
          "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)"
        )} */}
        <ConfigProvider direction="rtl" locale={fa_IR}>
          <Layout>
            <Header blogs={this.state.data} />
            {/* <SimpleBar style={{ maxHeight: 660 }}> */}
            <Content>
              <Routes blogs={this.state.data} />
            </Content>
            <BackTop />
            <Footer />
            {/* </SimpleBar> */}
          </Layout>
        </ConfigProvider>
      </Router>
      // </Provider>
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
)(App);
