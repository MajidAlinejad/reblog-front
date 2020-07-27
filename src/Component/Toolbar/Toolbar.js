// import axios from "axios";
import React, { Component } from "react";
import { Row, Col, Drawer } from "antd";
import Icon from "@ant-design/icons";
import Swaper from "../Swaper/Swaper";
import SearchBar from "./SearchBar/SearchBar";
import { getUser } from "../../Redux/Action/User";
import { connect } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import { toggleSidebar } from "../../Redux/Action/View";
import SidebarContent from "../Sidebar/SidebarContent/SidebarContent";

const FilterSVG = () => (
  <div>
    <svg
      className="svg-grey"
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      viewBox="0 0 174.97 174.68"
    >
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer" />
        <path
          d="M4.17 29.02l29.54 0c2.09,11.95 12.49,20.68 24.62,20.68 12.14,0 22.53,-8.73 24.63,-20.69l87.86 0.01c2.3,0 4.17,-1.87 4.17,-4.17 0,-2.3 -1.87,-4.17 -4.17,-4.17l-87.86 0c-2.1,-11.95 -12.49,-20.68 -24.63,-20.68 -12.13,0 -22.53,8.73 -24.62,20.68l-29.54 0c-2.3,0 -4.17,1.87 -4.17,4.17 0,2.3 1.87,4.17 4.17,4.17l0 0z"
          data-name="Layer 15"
        />
        <path
          d="M58.32 8.19c9.21,0 16.67,7.46 16.67,16.66 0,9.2 -7.47,16.66 -16.67,16.66 -9.2,0 -16.66,-7.47 -16.66,-16.66 0,-9.21 7.47,-16.66 16.66,-16.66l0 0z"
          data-name="Layer 15"
        />
        <path
          d="M170.81 83.17l-29.54 0c-2.09,-11.95 -12.49,-20.68 -24.62,-20.68 -12.14,0 -22.53,8.73 -24.63,20.68l-87.86 0c-2.3,0 -4.17,1.87 -4.17,4.17 0,2.3 1.87,4.17 4.17,4.17l87.86 0c2.1,11.95 12.49,20.68 24.63,20.68 12.13,0 22.53,-8.73 24.62,-20.68l29.54 0c2.3,0 4.17,-1.87 4.17,-4.17 0,-2.3 -1.87,-4.17 -4.17,-4.17z"
          data-name="Layer 15"
        />
        <path
          d="M116.65 104c-9.21,0 -16.67,-7.46 -16.67,-16.66 0,-9.21 7.47,-16.66 16.67,-16.66 9.2,0 16.66,7.46 16.66,16.66 0,9.21 -7.47,16.66 -16.66,16.66l0 0z"
          data-name="Layer 15"
        />
        <path
          d="M170.81 145.66l-87.86 0c-2.1,-11.95 -12.49,-20.68 -24.63,-20.68 -12.13,0 -22.53,8.73 -24.62,20.69l-29.54 -0.01c-2.3,0 -4.17,1.87 -4.17,4.17 0,2.3 1.87,4.17 4.17,4.17l29.54 0c2.09,11.95 12.49,20.68 24.62,20.68 12.14,0 22.53,-8.73 24.63,-20.68l87.86 0c2.3,0 4.17,-1.87 4.17,-4.17 0,-2.3 -1.87,-4.17 -4.17,-4.17l0 0z"
          data-name="Layer 15"
        />
        <path
          d="M58.32 166.49c-9.2,0 -16.66,-7.46 -16.66,-16.66 0,-9.2 7.47,-16.66 16.66,-16.66 9.21,0 16.67,7.47 16.67,16.66 0,9.21 -7.47,16.66 -16.67,16.66l0 0z"
          data-name="Layer 15"
        />
        <rect
          x="-0"
          y="17.85"
          width="174.97"
          height="14.69"
          rx="7.66"
          ry="7.35"
        />
        <rect
          x="-0"
          y="142.49"
          width="174.97"
          height="14.69"
          rx="7.66"
          ry="7.35"
        />
        <rect
          x="-0"
          y="79.99"
          width="174.97"
          height="14.69"
          rx="7.66"
          ry="7.35"
        />
      </g>
    </svg>
  </div>
);

const SearchSVG = () => (
  <div>
    <svg
      className="svg-grey"
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      viewBox="0 0 217.06 217.07"
    >
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer" />
        <g id="_2544001840768">
          <g>
            <path d="M144.95 24.83c-33.11,-33.11 -87,-33.11 -120.11,0 -33.11,33.12 -33.11,87.01 0,120.12 29.49,29.48 75.41,32.64 108.5,9.62 0.7,3.3 2.29,6.44 4.85,9l48.22 48.23c7.03,7.01 18.39,7.01 25.38,0 7.02,-7.03 7.02,-18.38 0,-25.38l-48.22 -48.23c-2.55,-2.55 -5.7,-4.15 -9,-4.84 23.03,-33.1 19.88,-79.02 -9.62,-108.52zm-15.22 104.9c-24.72,24.72 -64.95,24.72 -89.67,0 -24.71,-24.72 -24.71,-64.95 0,-89.67 24.72,-24.71 64.94,-24.71 89.67,0 24.72,24.73 24.72,64.95 0,89.67z" />
          </g>
        </g>
      </g>
    </svg>
  </div>
);

const HashtagSVG = () => (
  <div>
    <svg
      className="svg-grey"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 464 464"
    >
      <path
        d="M436,128h-56.504l19.744-85.056c3.504-15.096-5.44-30.288-20.344-34.544
	c-15.992-4.568-32.56,5.184-36.32,21.384L319.784,128H188.992l19.744-85.056c3.504-15.096-5.44-30.288-20.344-34.544
	c-15.992-4.568-32.56,5.184-36.32,21.384L129.28,128H64c-15.464,0-28,12.536-28,28s12.536,28,28,28h52.28l-22.288,96H28
	c-15.464,0-28,12.536-28,28s12.536,28,28,28h52.992l-19.744,85.056c-3.504,15.096,5.44,30.288,20.344,34.544
	c15.992,4.568,32.56-5.184,36.32-21.392L140.704,336h130.792l-19.744,85.056c-3.504,15.096,5.44,30.288,20.344,34.544
	c15.992,4.568,32.56-5.184,36.32-21.392L331.208,336H396c15.464,0,28-12.536,28-28s-12.536-28-28-28h-51.792l22.288-96H436
	c15.464,0,28-12.536,28-28S451.464,128,436,128z M284.496,280H153.704l22.288-96h130.792L284.496,280z"
      />
    </svg>
  </div>
);

const FiltersIcon = props => <Icon component={FilterSVG} {...props} />;
const SearchIcon = props => <Icon component={SearchSVG} {...props} />;
const HashtagIcon = props => <Icon component={HashtagSVG} {...props} />;

class Toolbar extends Component {
  state = {
    searchMode: true,
    switcher: true,
    filters: true,
    drawer: false,
    visible: false,
    mobile: undefined
    // sidebar: {
    //   hide: false
    // }
  };

  toggleSider = () => {
    // document.body.classList.add("no-sroll");
    this.setState({
      visible: !this.state.visible
    });
    // const { hide } = this.state.sidebar;
    // if (this.props.drawer) {
    //   this.setState({
    //     visible: !this.state.visible
    //   });
    // } else {
    //   this.props.toggleSidebar(!hide);
    //   this.setState({
    //     hide: !hide
    //   });
    // }
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };

  ToggleMode = () => {
    this.setState({
      searchMode: this.state.searchMode ? false : true
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.toolbar !== this.props.toolbar) {
      this.setState({
        searchMode: this.props.toolbar === "search" ? true : false,
        switcher: this.props.switcher ? true : false
        // filters: this.props.filters ? true : false
      });
    }
    if (prevProps.sidebar !== this.props.sidebar) {
      this.setState({
        sidebar: this.props.sidebar
      });
    }
  }

  handleResize = () => {
    // console.log(window.innerWidth);
    if (window.innerWidth < 869) {
      this.setState(
        {
          mobile: true
        },
        () => this.handleDrawer()
      );
    } else {
      this.setState(
        {
          mobile: false
        },
        () => this.handleDrawer()
      );
    }
  };

  handleDrawer = () => {
    // console.log(this.props.leftSide, this.state.mobile);
    if (this.props.leftSide === "sider" && this.state.mobile) {
      this.setState({ drawer: true, filters: true });
    } else if (this.props.leftSide === "drawer") {
      this.setState({ drawer: true, filters: true });
    } else {
      this.setState({ drawer: false, filters: false });
    }
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize, true);
    this.setState({
      searchMode: this.props.toolbar === "search" ? true : false,
      switcher: this.props.switcher ? true : false
      // filters: this.props.filters ? true : false
    });
  }

  render() {
    return (
      <React.Fragment>
        <Row className="category-row">
          {this.state.filters ? (
            <React.Fragment>
              <Col
                xs={2}
                sm={2}
                md={2}
                lg={1}
                xl={1}
                style={{ textAlign: "center" }}
              >
                <FiltersIcon
                  className="swaper-filter "
                  onClick={this.toggleSider}
                />
              </Col>
              {this.state.switcher ? (
                <React.Fragment>
                  <Col
                    xs={2}
                    sm={2}
                    md={2}
                    lg={1}
                    xl={1}
                    style={{ textAlign: "center" }}
                  >
                    {this.state.searchMode ? (
                      <HashtagIcon
                        onClick={this.ToggleMode}
                        className="swaper-filter "
                      />
                    ) : (
                      <SearchIcon
                        onClick={this.ToggleMode}
                        className="swaper-filter "
                      />
                    )}
                  </Col>
                  <Col xs={20} sm={20} md={20} lg={22} xl={22}>
                    {this.state.searchMode ? (
                      <div>
                        <SearchBar />
                      </div>
                    ) : (
                      <div>
                        <Swaper />
                      </div>
                    )}
                  </Col>
                </React.Fragment>
              ) : (
                <Col xs={21} sm={21} md={21} lg={23} xl={23}>
                  {this.state.searchMode ? (
                    <div>
                      <SearchBar />
                    </div>
                  ) : (
                    <div>
                      <Swaper />
                    </div>
                  )}
                </Col>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {this.state.switcher ? (
                <React.Fragment>
                  <Col
                    xs={2}
                    sm={2}
                    md={2}
                    lg={1}
                    xl={1}
                    style={{ textAlign: "center" }}
                  >
                    {this.state.searchMode ? (
                      <HashtagIcon
                        onClick={this.ToggleMode}
                        className="swaper-filter "
                      />
                    ) : (
                      <SearchIcon
                        onClick={this.ToggleMode}
                        className="swaper-filter "
                      />
                    )}
                  </Col>
                  <Col xs={21} sm={21} md={21} lg={23} xl={23}>
                    {this.state.searchMode ? (
                      <div>
                        <SearchBar />
                      </div>
                    ) : (
                      <div>
                        <Swaper />
                      </div>
                    )}
                  </Col>
                </React.Fragment>
              ) : (
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  {this.state.searchMode ? (
                    <div>
                      <SearchBar />
                    </div>
                  ) : (
                    <div>
                      <Swaper />
                    </div>
                  )}
                </Col>
              )}
            </React.Fragment>
          )}
        </Row>

        {this.state.drawer ? (
          <Drawer
            title="فیلتر و دسته بندی"
            placement="right"
            className="filter-drawer"
            closable={true}
            // mask={false}
            onClose={this.onClose}
            // closeIcon={true}
            visible={this.state.visible}
            getContainer={false}
            // style={{ position: "absolute" }}
          >
            {/* <p> */}
            <SidebarContent />
            {/* </p> */}
          </Drawer>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
    // sidebar: state.view.sidebar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(getUser());
    }
    // toggleSidebar: param => {
    //   dispatch(toggleSidebar(param));
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
