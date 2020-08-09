import React, { Component } from "react";
import { Layout } from "antd";

export default class Header extends Component {
  render() {
    return (
      <Layout.Footer
        style={{
          textAlign: "center"
        }}
      >
        "Made with ❤ by Negar Afar"
      </Layout.Footer>
    );
  }
}
