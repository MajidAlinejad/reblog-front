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
              <Route exact path={i == 0 ? "/" : "B" + i + 1}>
                <Blog
                  view={blog.view}
                  view="Grid"
                  base={blog.base}
                  toolbar="search"
                  loader="paginate"
                  switcher={true}
                  filters={false}
                  drawer={false}
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
