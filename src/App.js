//Basic import
import React, { Component } from "react";
import { connect } from "react-redux";
import { BackTop, ConfigProvider, Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import SimpleBar from "simplebar-react";
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
// import { getUser } from "./Redux/Action/User";
// import rootReducer from "./Redux/Reducer/User";
// import { getCities } from './actions/city';
// import { getCart } from './actions/cart';
// import { getMessage } from './actions/message';

moment.locale("fa");

const { Content } = Layout;

// const store = createStore();

class App extends Component {
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
            <Header />
            <SimpleBar style={{ maxHeight: 660 }}>
              <Content>
                <Routes />
              </Content>
              <BackTop />
              <Footer />
            </SimpleBar>
          </Layout>
        </ConfigProvider>
      </Router>
      // </Provider>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     // getCities: () => dispatch(getCities()),
//     // getCart: () => dispatch(getCart()),
//     getUser: () => dispatch(getUser())
//     // getMessage: () => dispatch(getMessage())
//   };
// };

export default //  connect(
//   null,
//   mapDispatchToProps
// )(App);

App;
