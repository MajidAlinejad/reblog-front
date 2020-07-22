import React, { Component } from "react";
import InfinitGrid from "./InfinitGrid/InfinitGrid";
import PaginateGrid from "./PaginateGrid/PaginateGrid";
import LoadMoreGrid from "./LoadMoreGrid/LoadMoreGrid";

export default class GridView extends Component {
  ModSwitcher(mode) {
    switch (mode) {
      case "infinit":
        return <InfinitGrid />;
      case "paginate":
        return <PaginateGrid />;
      case "loadMore":
        return <LoadMoreGrid />;
      default:
        return <PaginateGrid />;
    }
  }

  componentDidMount() {}
  render() {
    const { loader } = this.props;
    return <div className="grid-view">{this.ModSwitcher(loader)}</div>;
  }
}
