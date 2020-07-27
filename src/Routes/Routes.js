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
                  view="Grid" //    Grid / List
                  // base={blog.base} //
                  base="img" //
                  // "base":    video    /        cms        /   play     /
                  // img    /  free   /  info     / home

                  // "view" : list-Grid /  list-Grid-custom /  list-Grid /
                  // Grid   /   All   / table-chart/ --

                  toolbar="search" //search/ null --> hashtag
                  loader="paginate" //loadmore/paginate/infinit
                  switcher={true} //toolbar btn for search/hashtag
                  sidebar="drawer" //drawer/sider/{false}
                />
              </Route>
            );
          })}
          {/* <Route exact path="/">
            <Blog
              view="list"
              toolbar="search"
              loader="paginate"
              switcher={false}
              filters={false}
            />
          </Route>
          <Route path="/B2">
            <Blog
              view="Grid"
              loader="loadMore"
              toolbar="hashtags"
              switcher={true}
              filters={true}
            />
          </Route>
          <Route path="/B3">
            <Blog
              view="Grid"
              loader="infinit"
              toolbar="search"
              switcher={false}
              filters={true}
            />
          </Route> */}
          <Route path="/notify">{/* <Notify /> */}</Route>
          <Route path="/contact">{/* <Contact /> */}</Route>
        </Switch>
      </React.Fragment>
    );
  }
}
