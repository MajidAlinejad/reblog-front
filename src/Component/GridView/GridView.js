import React, { Component } from "react";
import InfinitGrid from "./InfinitGrid/InfinitGrid";
import PaginateGrid from "./PaginateGrid/PaginateGrid";
import LoadMoreGrid from "./LoadMoreGrid/LoadMoreGrid";

export default class GridView extends Component {
  ModSwitcher(mode) {
    switch (mode) {
      case "infinit":
        return <InfinitGrid base={this.props.base} />;
      case "paginate":
        return <PaginateGrid base={this.props.base} />;
      case "loadmore":
        return <LoadMoreGrid base={this.props.base} />;
      default:
        return <PaginateGrid base={this.props.base} />;
    }
  }

  componentDidMount() {}
  render() {
    const { loader } = this.props;
    return <div className="grid-view">{this.ModSwitcher(loader)}</div>;
  }
}
