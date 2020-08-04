import React, { Component } from "react";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import Blog from "../Component/Blog/Blog";

export default class Routes extends Component {
  render() {
    const { blogs } = this.props;
    return (
      <React.Fragment>
        <Switch>
          {blogs.map((blog, i) => {
            return (
              <Route
                exact={i == 0 ? true : false}
                path={i == 0 ? "/" : "B" + (i + 1)}
              >
                <Blog
                  // view={blog.view}
                  view="List" //    Grid / List / freeForm
                  // base={blog.base} //
                  base="free" //video /music/podcast/product / img  / post /free     info  / home
                  // ---------------------if you want custom  productbase  ----------------->

                  // product={{
                  //   time: true,
                  //   modern: false,
                  //   discount: false
                  // }}

                  // ------------if  you want custom img/video/music/podcast/base --------------->

                  // custom={{
                  //   overlay: true,
                  //   time: true,
                  //   rate: true,
                  //   text: false,
                  //   //
                  //   footer: true,
                  //   //
                  //   leftFooter: true,
                  //   like: true,
                  //   view: false,
                  //   comment: true,
                  //   save: true,
                  //   date: false,
                  //   //
                  //   rightFooter: true,
                  //   avatar: true,
                  //   autor: true,
                  //   //
                  //   title: false,
                  //   //
                  //   type: false,
                  //   setting: true
                  // }}
                  // ----------------------------------------------------->

                  // "base":

                  // "view" : list-Grid /  list-Grid-custom /  list-Grid /
                  // Grid   /   All   / table-chart/ --

                  toolbar="search" //search/ null --> hashtag
                  loader="loadmore" //loadmore/paginate/infinit
                  switcher={true} //toolbar btn for search/hashtag
                  sidebar="sider" //drawer/sider/{false}
                />
              </Route>
            );
          })}
          <Route path="/B2">
            <Blog
              view="Grid"
              base="product"
              product={{
                modern: true,
                time: true
              }}
              toolbar="search" //search/ null --> hashtag
              loader="paginate" //loadmore/paginate/infinit
              switcher={true} //toolbar btn for search/hashtag
              sidebar="drawer" //drawer/sider/{false}
            />
          </Route>
          <Route path="/B3">
            <Blog
              view="Grid"
              base="music"
              toolbar="hashtag" //search/ null --> hashtag
              loader="loadmore" //loadmore/paginate/infinit
              switcher={true} //toolbar btn for search/hashtag
              sidebar="drawer" //drawer/sider/{false}
            />
          </Route>

          <Route path="/notify">{/* <Notify /> */}</Route>
          <Route path="/contact">{/* <Contact /> */}</Route>
        </Switch>
      </React.Fragment>
    );
  }
}
