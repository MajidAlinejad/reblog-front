import React, { Component } from "react";
import InfinitGrid from "../InfinitGrid/InfinitGrid";
import PaginateGrid from "../PaginateGrid/PaginateGrid";
import LoadMore from "../LoadMore/LoadMore";

export default class FirstBlog extends Component {
  state = {
    mode: "LoadMore"
  };

  ModSwitcher(mode) {
    switch (mode) {
      case "infinit":
        return <InfinitGrid />;
        break;
      case "paginate":
        return <PaginateGrid />;
        break;
      case "LoadMore":
        return <LoadMore />;
        break;
      default:
        return <PaginateGrid />;
        break;
    }
  }

  componentDidMount() {}
  render() {
    return <div className="grid-view">{this.ModSwitcher(this.state.mode)}</div>;
  }
}
