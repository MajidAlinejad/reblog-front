import React, { Component } from "react";

import { Affix, Layout, Spin } from "antd";
import GridView from "../GridView/GridView";
import Toolbar from "../Toolbar/Toolbar";
import ListView from "../ListView/ListView";
import Sidebar from "../Sidebar/Sidebar";
import { connect } from "react-redux";
import { getBlog } from "../../Redux/Action/Blog";

const { Content } = Layout;

class Blog extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }

  state = {
    desktop: false,
    id: "",
    blogProps: {
      view: "Grid",
      base: "music",
      toolbar: "hashtag", //search/ null --> hashtag
      loader: "loadmore", //loadmore/paginate/infinit
      switcher: true, //toolbar btn for search/hashtag
      sidebar: "drawer",
      loading: true
    }
  };

  handleResize = () => {
    // console.log(window.innerWidth);
    if (window.innerWidth >= 1100) {
      this._isMounted &&
        this.setState({
          desktop: true
        });
    } else {
      this._isMounted &&
        this.setState({
          desktop: false
        });
    }
  };
  componentWillUnmount() {
    this._isMounted = false;
    // console.log("blog UN mounted");
  }

  componentDidMount() {
    this._isMounted = true;
    this.handleResize();
    this.props.getBlog(this.props.match.params.id);
    window.addEventListener("resize", this.handleResize, true);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      // console.log(this.props.match.params.id);
      this._isMounted &&
        this.setState(
          {
            blogProps: { ...this.state.blogProps, loading: true }
          },
          this.props.getBlog(this.props.match.params.id)
        );
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
    if (prevProps.blog !== this.props.blog) {
      let pr = this.props.blog;
      this._isMounted &&
        this.setState({
          blogProps: { ...this.state.blogProps, ...pr, loading: false }
        });
    }
  }

  render() {
    const {
      view,
      toolbar,
      switcher,
      sidebar,
      loader,
      base,
      loading
    } = this.state.blogProps;
    return (
      <div>
        <div className={loading ? "loading" : "loading hide"}>
          <Spin className="grid-spinner-paginate" size="large" />
        </div>
        <Affix offsetTop={66}>
          <Toolbar toolbar={toolbar} switcher={switcher} leftSide={sidebar} />
        </Affix>
        <Layout className="full-content">
          {sidebar === "sider" && this.state.desktop ? <Sidebar /> : null}
          <Content className="view-content">
            {view === "grid" ? (
              <div className="grid-container">
                <GridView
                  id={this.props.id}
                  custom={this.props.custom}
                  loader={loader}
                  base={base}
                  product={this.props.product}
                />
              </div>
            ) : (
              <div className="grid-container">
                <ListView
                  id={this.props.id}
                  custom={this.props.custom}
                  loader={loader}
                  base={base}
                  product={this.props.product}
                />
              </div>
            )}
          </Content>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sidebar: state.sidebar,
    blog: state.blog,
    id: state.blog.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBlog: id => {
      dispatch(getBlog(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);
