import React, { Component } from "react";
import PaginateList from "./PaginateList/PaginateList";
import LoadMoreList from "./LoadMoreList/LoadMoreList";

export default class extends Component {
  ModSwitcher(mode) {
    switch (mode) {
      case "paginate":
        return <PaginateList />;
      case "loadMore":
        return <LoadMoreList />;
      default:
        return <PaginateList />;
    }
  }

  componentDidMount() {}
  render() {
    const { loader } = this.props;
    return <div className="list-view">{this.ModSwitcher(loader)}</div>;
  }
}
