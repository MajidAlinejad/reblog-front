import React, { Component } from "react";

import { Input, AutoComplete } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "jalali-moment";
import { render } from "@testing-library/react";

const renderTitle = title => (
  <span>
    <a href="#">{title}</a>
  </span>
);

const renderSug = title => ({
  value: title,
  label: <span className="suggest-item">{title}</span>
});

const renderItem = (title, count) => ({
  value: title,
  label: (
    <div className="search-item">
      {title}
      <span>{count}</span>
    </div>
  )
});

const renderPost = (img, title, count) => ({
  value: title,
  label: (
    <div className="search-item post">
      <div>
        <img
          className="search-item-img"
          src={process.env.REACT_APP_BASE_URL + img}
        />
        {title}
      </div>

      <span>
        <FieldTimeOutlined />{" "}
        <i>
          {moment({ count })
            .locale("fa")
            .format("DD/MMMM/YYYY")}
        </i>
      </span>
    </div>
  )
});

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }
  state = {
    optClass: "",
    mask: "inherit",
    options: [
      {
        label: renderTitle("Libraries"),
        options: [
          renderItem("AntDesign", 1222),
          renderItem("AntDesign UI", 10600)
        ]
      }
    ]
  };

  renderSuggest = suggest => {
    let arry = [];
    suggest.map(item => arry.push(renderSug(item.text)));
    console.log(arry);
    return arry;
  };

  getItems = keyword => {
    let opt = [];
    axios.get(process.env.REACT_APP_API_URL + `s?key=${keyword}`, {}).then(
      res =>
        res.data.res &&
        this.setState({
          options: [
            {
              label: renderTitle("پست ها"),
              options: [
                renderPost(
                  res.data.res.img,
                  res.data.res.title,
                  res.data.res.created_at
                )
              ]
            },

            {
              label:
                res.data.didyoumean && renderTitle("کلید واژه های پیشنهادی"),
              options:
                res.data.didyoumean &&
                this.renderSuggest(res.data.guess.suggest)
            }
          ]
        })
    );
  };

  handleSearch = e => {
    let keyword = e.currentTarget.value;
    // console.log(keyword.length);
    this.setState({
      options: []
    });
    keyword.length > 2 && this.getItems(keyword);
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        optClass: "with-opacity"
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { optClass } = this.state;

    return (
      <div className={"" + optClass}>
        <AutoComplete
          className="Search-custom"
          dropdownClassName="search-dropdown-custom"
          //   dropdownMatchSelectWidth={500}

          options={this.state.options}
        >
          <Input.Search
            className="Search-input-custom"
            size="large"
            value=""
            placeholder="جستجو"
            onFocus={() => {
              this.setState({ mask: "fixed-mask" });
            }}
            onBlur={() => {
              this.setState({ mask: "inherit-mask" });
            }}
            onChange={this.handleSearch}
          />
        </AutoComplete>
        <div className={"search-mask " + this.state.mask}></div>
      </div>
    );
  }
}
