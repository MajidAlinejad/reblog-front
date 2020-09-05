import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
// import moment from "jalali-moment";
import Blog from "../Component/Blog/Blog";
import ViewPost from "../Component/ViewPort/ViewPost";
import { DatePicker } from "antd";
// moment.locale("fa");
export default class Routes extends Component {
  // componentDidMount() {
  //   console.log(moment());
  // }
  render() {
    return (
      <React.Fragment>
        <Router></Router>
        <Switch>
          <Route exact path="/">
            <p>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              this is Home
              {/* {moment()
                .locale("fa")
                .format("YYYY/M/D")} */}
            </p>
          </Route>
          <Route
            path="/blog/:id"
            component={Blog}
            // children={<Child blogs={blogs} />}
          />
          <Route
            path="/post/:id"
            component={ViewPost}
            // children={<Child blogs={blogs} />}
          />
          <Route path="*">
            <p>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              notFound
            </p>
          </Route>
        </Switch>
      </React.Fragment>
    );
  }
}

// <Blog
// // view={blog.view}
// view="Grid" //    Grid / List / freeForm
// // base={blog.base} //
// base="post" //video /music/podcast/product / img  / post /free     info  / home
// // ---------------------if you want custom  productbase  ----------------->

// // product={{
// //   time: true,
// //   modern: false,
// //   discount: false
// // }}

// // ------------if  you want custom img/video/music/podcast/base --------------->

// // custom={{
// //   overlay: true,
// //   time: true,
// //   rate: true,
// //   text: false,
// //   //
// //   footer: true,
// //   //
// //   leftFooter: true,
// //   like: true,
// //   view: false,
// //   comment: true,
// //   save: true,
// //   date: false,
// //   //
// //   rightFooter: true,
// //   avatar: true,
// //   autor: true,
// //   //
// //   title: false,
// //   //
// //   type: false,
// //   setting: true
// // }}
// // ----------------------------------------------------->

// // "base":

// // "view" : list-Grid /  list-Grid-custom /  list-Grid /
// // Grid   /   All   / table-chart/ --

// toolbar="search" //search/ null --> hashtag
// loader="loadmore" //loadmore/paginate/infinit
// switcher={true} //toolbar btn for search/hashtag
// sidebar="sider" //drawer/sider/{false}
// />
