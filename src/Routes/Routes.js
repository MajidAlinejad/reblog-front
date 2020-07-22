import React, { Component } from "react";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import Blog from "../Component/Blog/Blog";

export default class Routes extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/">
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
          </Route>
          <Route path="/notify">{/* <Notify /> */}</Route>
          <Route path="/contact">{/* <Contact /> */}</Route>
        </Switch>
      </React.Fragment>
    );
  }
}
