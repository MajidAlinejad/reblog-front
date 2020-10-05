import React, { Component } from "react";
import { connect } from "react-redux";
import { Checkbox, Collapse, Divider, Input, Select, Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";

import axios from "axios";
import { setCategory } from "../../../Redux/Action/Filter";
const { Search } = Input;
const { Option } = Select;
class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }
  state = {
    loading: true,
    data: [],
    specs: [],
    expandedKeys: [],
    brands: [],
    category: null,
    dataList: [],
    searchValue: "",
    autoExpandParent: true
  };

  generateList = data => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      this.state.dataList.push({ key: node.id, title: node.title });
      if (node.children) {
        this._isMounted && this.generateList(node.children);
      }
    }
  };

  getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.id === key)) {
          parentKey = node.id;
        } else if (this._isMounted && this.getParentKey(key, node.children)) {
          parentKey = this._isMounted && this.getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  getSpec = () => {
    this._isMounted &&
      axios
        .get(process.env.REACT_APP_API_URL + `speclists/${this.state.category}`)
        .then(
          res =>
            this._isMounted &&
            this.setState({
              specs: res.data
            })
        );
  };

  onSelect = selectedKeys => {
    this.setState(
      {
        category: selectedKeys[0]
      },
      () => {
        this.props.setCategory(selectedKeys[0]);
        this.getSpec();
      }
    );
    //set category
  };

  onExpand = expandedKeys => {
    this._isMounted &&
      this.setState({
        expandedKeys,
        autoExpandParent: false
      });
  };

  onChange = e => {
    const { value } = e.target;
    const expandedKeys = this.state.dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          let x =
            this._isMounted && this.getParentKey(item.key, this.state.data);
          return x;
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);

    this._isMounted &&
      this.setState({
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
  };

  loop = data =>
    this._isMounted &&
    data.map(item => {
      const index = item.title.indexOf(this.state.searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + this.state.searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">
              {this.state.searchValue}
            </span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.id, children: this.loop(item.children) };
      }

      return {
        title,
        key: item.id
      };
    });

  getCategories = () => {
    this._isMounted &&
      axios.get(process.env.REACT_APP_API_URL + "cats").then(
        res =>
          this._isMounted &&
          this.setState(
            {
              data: res.data,
              loading: false
            },
            () => {
              this._isMounted && this.generateList(res.data);
            }
          )
      );
  };

  getBrands = () => {
    this._isMounted &&
      axios.get(process.env.REACT_APP_API_URL + "brands").then(
        res =>
          this._isMounted &&
          this.setState({
            brands: res.data,
            loading: false
          })
      );
  };

  onChangeBrand = value => {
    console.log(`selected ${value}`);
  };

  componentDidMount() {
    this._isMounted = true;

    this._isMounted && this.getCategories();
    this._isMounted && this.getBrands();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({
      data: []
    });
  }

  render() {
    const { expandedKeys, autoExpandParent } = this.state;
    return (
      <div>
        <div className="category-container">
          <Search
            style={{ marginBottom: 8 }}
            placeholder="جستجو در دسته ها"
            onChange={this.onChange}
          />
          <Tree
            onExpand={this.onExpand}
            defaultExpandAll={true}
            showLine={{ showLeafIcon: false }}
            switcherIcon={<DownOutlined />}
            expandedKeys={expandedKeys}
            onSelect={this.onSelect}
            autoExpandParent={autoExpandParent}
            treeData={this.loop(this.state.data)}
          />
        </div>
        <Divider />
        <Select
          showSearch
          mode="multiple"
          allowClear
          className="brand-selector"
          placeholder="انتخاب برند"
          optionFilterProp="children"
          onChange={this.onChangeBrand}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {this.state.brands.map(brand => {
            return (
              <Option key={brand.id} value={brand.name}>
                {brand.fa_name}
              </Option>
            );
          })}
        </Select>
        <hr className="hide-strock" />
        {this.state.specs.map((spec, index) => {
          return (
            <Collapse
              className="spec-collapse"
              key={spec.id}
              defaultActiveKey={[index + 1]}
            >
              <Collapse.Panel
                className="side-collapse"
                header={spec.name}
                key={index + 1}
              >
                <hr className="minimal-border" />
                <div>
                  {spec.details.map(param => {
                    return (
                      <div key={param.id} className="cat-list">
                        <Checkbox key={param.id}>{param.value}</Checkbox>
                      </div>
                    );
                  })}
                </div>
              </Collapse.Panel>
            </Collapse>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    category: state.filter.category
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCategory: cat => {
      dispatch(setCategory(cat));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContent);
