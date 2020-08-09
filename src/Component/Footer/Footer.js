import React, { Component } from "react";
import { Layout, Affix } from "antd";

export default class Header extends Component {
  render() {
    return (
      // <Affix offsetBottom={0}>
      <Layout.Footer
        style={{
          textAlign: "center"
        }}
      >
        "Made with ❤ by Negar Afar"
      </Layout.Footer>
      // </Affix>
    );
  }
}
