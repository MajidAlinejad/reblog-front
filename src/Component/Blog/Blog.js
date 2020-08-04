import React, { Component } from "react";

import { Affix, Layout } from "antd";
import GridView from "../GridView/GridView";
import Toolbar from "../Toolbar/Toolbar";
import ListView from "../ListView/ListView";
import Sidebar from "../Sidebar/Sidebar";
import { connect } from "react-redux";
// import { getSidebar } from "../../Redux/Action/View";

const { Content } = Layout;

class Blog extends Component {
  state = {
    view: "List",
    hide: true,
    desktop: false
  };

  handleResize = () => {
    // console.log(window.innerWidth);
    if (window.innerWidth >= 1100) {
      this.setState({
        desktop: true
      });
    } else {
      this.setState({
        desktop: false
      });
    }
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize, true);
  }

  viewSwitcher(view) {
    switch (view) {
      case "Grid":
        return (
          <div className="grid-container">
            <GridView
              custom={this.props.custom}
              loader={this.props.loader}
              base={this.props.base}
              product={this.props.product}
            />
          </div>
        );
      case "List":
        return (
          <div className="grid-container">
            <ListView
              custom={this.props.custom}
              loader={this.props.loader}
              base={this.props.base}
              product={this.props.product}
            />
          </div>
        );

      default:
        return (
          <div className="grid-container">
            <ListView
              custom={this.props.custom}
              loader={this.props.loader}
              base={this.props.base}
              product={this.props.product}
            />
          </div>
        );
    }
  }

  render() {
    const { view, toolbar, switcher, sidebar, base } = this.props;
    return (
      <div>
        <Affix offsetTop={66}>
          <Toolbar toolbar={toolbar} switcher={switcher} leftSide={sidebar} />
        </Affix>
        <Layout className="full-content">
          {sidebar === "sider" && this.state.desktop ? <Sidebar /> : null}

          <Content className="view-content"> {this.viewSwitcher(view)}</Content>
        </Layout>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     sidebar: state.sidebar
//     // user: state.user.user
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     getSidebar: () => {
//       dispatch(getSidebar());
//     }
//   };
// };

export default connect()(Blog);
// mapStateToProps,
// mapDispatchToProps
