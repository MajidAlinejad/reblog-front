import React, { Component } from "react";
import { connect } from "react-redux";

import { Layout } from "antd";

import { getSidebar } from "../../Redux/Action/View";
import SidebarContent from "./SidebarContent/SidebarContent";

const { Sider } = Layout;

// let lastScrollY = 0;
// let ticking = false;

class Sidebar extends Component {
  // sider = React.createRef();

  state = {
    sidebar: {
      hide: true
    },
    endPage: false,
    startPage: true
  };

  handleScroll = () => {
    if (
      window.scrollY + window.innerHeight + 75 >=
      document.documentElement.scrollHeight
    ) {
      // console.log("end");
      this.setState({
        endPage: true,
        startPage: false
      });
    } else if (window.scrollY <= 30) {
      // console.log("start");
      this.setState({
        endPage: false,
        startPage: true
      });
    } else {
      // console.log("still scrolling");
    }
  };

  componentDidMount() {
    this.props.getSidebar();
    window.addEventListener("scroll", this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sidebar !== this.props.sidebar) {
      this.setState({
        sidebar: this.props.sidebar
      });
    }
  }

  render() {
    const { hide } = this.state.sidebar;
    return (
      <React.Fragment>
        <Sider
          width={280}
          className={hide ? "side-content hide" : "side-content"}
        >
          <div
            className={
              this.state.endPage
                ? "side-menu-container end-page"
                : "side-menu-container start-page"
            }
          >
            <div
              className={
                this.state.endPage
                  ? "side-menu end-page"
                  : "side-menu start-page"
              }
            >
              <SidebarContent />
            </div>
          </div>
        </Sider>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    sidebar: state.view.sidebar
    // user: state.user.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSidebar: () => {
      dispatch(getSidebar());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
