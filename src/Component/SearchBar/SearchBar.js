import React, { Component } from "react";

import { Input, AutoComplete } from "antd";
import { UserOutlined } from "@ant-design/icons";

const renderTitle = title => (
  <span>
    {title}
    <a
      style={{
        float: "right"
      }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);

const renderItem = (title, count) => ({
  value: title,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  )
});

const options = [
  {
    label: renderTitle("Libraries"),
    options: [renderItem("AntDesign", 10000), renderItem("AntDesign UI", 10600)]
  },
  {
    label: renderTitle("Solutions"),
    options: [
      renderItem("AntDesign UI FAQ", 60100),
      renderItem("AntDesign FAQ", 30010)
    ]
  },
  {
    label: renderTitle("Articles"),
    options: [renderItem("AntDesign design language", 100000)]
  }
];

export default class SearchBar extends Component {
  state = {
    optClass: "",
    mask: "inherit"
  };
  componentDidMount() {
    this.setState({
      optClass: "with-opacity"
    });
  }
  render() {
    const { optClass } = this.state;

    return (
      <div className={"" + optClass}>
        <AutoComplete
          className="Search-custom"
          dropdownClassName="search-dropdown-custom"
          //   dropdownMatchSelectWidth={500}

          options={options}
        >
          <Input.Search
            className="Search-input-custom"
            size="large"
            placeholder="جستجو"
            onFocus={() => {
              this.setState({ mask: "fixed-mask" });
            }}
            onBlur={() => {
              this.setState({ mask: "inherit-mask" });
            }}
          />
        </AutoComplete>
        <div className={"search-mask " + this.state.mask}></div>
      </div>
    );
  }
}
