import React, { Component } from "react";
import InfinitGrid from "./InfinitGrid/InfinitGrid";
import PaginateGrid from "./PaginateGrid/PaginateGrid";
import LoadMoreGrid from "./LoadMoreGrid/LoadMoreGrid";

export default class GridView extends Component {
  ModSwitcher(mode) {
    switch (mode) {
      case "infinit":
        return (
          <InfinitGrid
            custom={this.props.custom}
            base={this.props.base}
            product={this.props.product}
          />
        );
      case "paginate":
        return (
          <PaginateGrid
            custom={this.props.custom}
            base={this.props.base}
            product={this.props.product}
          />
        );
      case "loadmore":
        return (
          <LoadMoreGrid
            custom={this.props.custom}
            base={this.props.base}
            product={this.props.product}
          />
        );
      default:
        return (
          <PaginateGrid
            custom={this.props.custom}
            base={this.props.base}
            product={this.props.product}
          />
        );
    }
  }

  componentDidMount() {}
  render() {
    const { loader } = this.props;
    return <div className="grid-view">{this.ModSwitcher(loader)}</div>;
  }
}
