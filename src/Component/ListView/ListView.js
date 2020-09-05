import React, { Component } from "react";
import PaginateList from "./PaginateList/PaginateList";
import LoadMoreList from "./LoadMoreList/LoadMoreList";

export default class extends Component {
  ModSwitcher(mode) {
    switch (mode) {
      case "paginate":
        return (
          <PaginateList
            id={this.props.id}
            custom={this.props.custom}
            base={this.props.base}
            user={this.props.user}
          />
        );
      case "loadmore":
        return (
          <LoadMoreList
            id={this.props.id}
            custom={this.props.custom}
            base={this.props.base}
            user={this.props.user}
          />
        );
      default:
        return (
          <PaginateList
            id={this.props.id}
            custom={this.props.custom}
            base={this.props.base}
            user={this.props.user}
          />
        );
    }
  }

  componentDidMount() {}
  render() {
    const { loader } = this.props;
    return <div className="list-view">{this.ModSwitcher(loader)}</div>;
  }
}
