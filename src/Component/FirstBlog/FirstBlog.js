import React, { Component } from "react";
import Swaper from "../Swaper/Swaper";
import { Affix } from "antd";
import GridItem from "../GridItem/GridItem";
export default class FirstBlog extends Component {
  render() {
    return (
      <div>
        <Affix offsetTop={66}>
          <Swaper />
        </Affix>
        <GridItem />
      </div>
    );
  }
}
