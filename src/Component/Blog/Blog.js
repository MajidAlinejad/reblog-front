import React, { Component } from "react";

import { Affix } from "antd";
import GridView from "../GridView/GridView";
import Toolbar from "../Toolbar/Toolbar";
import ListView from "../ListView/ListView";
export default class FirstBlog extends Component {
  state = {
    view: "List"
  };

  viewSwitcher(view) {
    switch (view) {
      case "Grid":
        return (
          <div className="grid-container">
            <GridView loader={this.props.loader} />
          </div>
        );
      case "List":
        return (
          <div className="grid-container">
            <ListView loader={this.props.loader} />
          </div>
        );

      default:
        return (
          <div className="grid-container">
            <ListView loader={this.props.loader} />
          </div>
        );
    }
  }

  render() {
    const { view, toolbar, filters, switcher } = this.props;
    return (
      <div>
        <Affix offsetTop={66}>
          <Toolbar toolbar={toolbar} switcher={switcher} filters={filters} />
        </Affix>
        <div>{this.viewSwitcher(view)}</div>
      </div>
    );
  }
}
