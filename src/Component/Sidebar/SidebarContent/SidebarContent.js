import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Checkbox,
  Collapse,
  Divider,
  Input,
  Select,
  Tree,
  Slider,
  InputNumber,
  Row,
  Col,
  Button,
  Empty,
  Tag
} from "antd";
import { DownOutlined } from "@ant-design/icons";

import axios from "axios";
import {
  setBrands,
  setCategory,
  setPrice,
  setParams
} from "../../../Redux/Action/Filter";
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
    selectedFilter: [],
    category: null,
    filter: [],
    allowBrands: true,
    base: "",
    inputValue: 1,
    dataList: [],
    price: [],
    searchValue: "",
    brandsTags: [],
    priceTags: [],
    filterTags: [],
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
  onChangeSlider = value => {
    this.setState({ price: value });
  };

  filterize = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    this.props.setParams(this.state.filter);
  };

  check(spec, param, e, p) {
    if (e.target.checked) {
      //add to
      var obj = {};
      if (this.state.filter[spec]) {
        let sortedArry = [];
        sortedArry = [param, ...this.state.filter[spec].param];
        sortedArry.sort(function(a, b) {
          return a - b;
        });
        obj[spec] = {
          param: sortedArry
        };
      } else {
        obj[spec] = {
          // spec: spec,
          param: [param]
        };
      }

      this.setState({
        filter: { ...this.state.filter, ...obj },
        filterTags: [...this.state.filterTags, p]
      });
    } else {
      var filter = { ...this.state.filter };

      if (filter[spec].param.length > 1) {
        filter[spec].param = filter[spec].param.filter(p => p != param);
      } else {
        delete filter[spec];
      }

      this.setState({
        filter: filter,
        filterTags: this.state.filterTags.filter(p => p.id != param)
      });
    }
  }
  setBrand = () => {
    this.props.setBrands(this.state.selectedBrand);
  };

  setPriceRange = () => {
    this.props.setPrice(this.state.price);
  };

  getSpec = selected => {
    this._isMounted && this.props.setCategory(selected);
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
        // if (this.props.base === "product") {
        this._isMounted && this.getSpec(selectedKeys[0]);
        this._isMounted && this.getCatBrands(selectedKeys[0]);
        // }
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
      axios
        .get(process.env.REACT_APP_API_URL + "blogcat/" + this.props.id)
        .then(
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

  // getBrands = cat => {
  //   this._isMounted &&
  //     axios.get(process.env.REACT_APP_API_URL + "brands").then(
  //       res =>
  //         this._isMounted &&
  //         this.setState({
  //           brands: res.data,
  //           loading: false
  //         })
  //     );
  // };

  getCatBrands = id => {
    this._isMounted &&
      axios.get(process.env.REACT_APP_API_URL + "catbrands/" + id).then(
        res =>
          this._isMounted &&
          this.setState({
            brands: res.data,
            loading: false
          })
      );
  };

  onChangeBrand = (value, obj) => {
    this.setState({
      selectedBrand: obj
    });
  };

  deleteFilter = () => {
    this._isMounted &&
      this.setState(
        {
          brandsTags: [],
          filterTags: [],
          priceTags: [],
          selectedBrand: [],
          price: [],
          specs: [],
          selectedFilter: [],
          filter: [],
          allowBrands: false
        },
        () => {
          this._isMounted && this.props.setParams([]);
          this._isMounted && this.props.setPrice([]);
          this._isMounted && this.props.setBrands([]);
          this._isMounted && this.getSpec(this.state.category);
          this.setState({
            allowBrands: true
          });
        }
      );
  };

  componentDidMount() {
    this._isMounted = true;
    if (this.props.id !== undefined) {
      this._isMounted && this.getCategories();
    }
    if (this.props.base !== undefined) {
      if (this.props.base === "product") {
        // this._isMounted && this.getBrands();
        this._isMounted &&
          this.setState({
            base: this.props.base
          });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this._isMounted && this.getCategories();
      if (this.props.base === "product") {
        // this._isMounted && this.getBrands();
      }
    }

    if (prevProps.base !== this.props.base) {
      // console.log(prevProps.base, this.props.base);
      this._isMounted &&
        this.setState({
          base: this.props.base
        });
    }

    if (prevProps.brands !== this.props.brands) {
      this._isMounted &&
        this.setState({
          brandsTags: this.props.brands
        });
    }
    if (prevProps.price !== this.props.price) {
      this._isMounted &&
        this.setState({
          priceTags: this.props.price
        });
    }
    if (prevProps.category !== this.props.category) {
      this._isMounted &&
        this.setState({
          selectedFilter: [],
          filterTags: []
        });
    }

    if (prevProps.params !== this.props.params) {
      this._isMounted &&
        this.setState({
          selectedFilter: this.state.filterTags
        });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({
      data: []
    });
  }

  render() {
    const { expandedKeys, autoExpandParent, inputValue } = this.state;
    return (
      <div>
        {(!!this.state.brandsTags.length ||
          !!this.state.priceTags.length ||
          !!this.state.selectedFilter.length) && (
          <React.Fragment>
            <Divider className="side-hr" orientation="right">
              فیلتر های انتخاب شده
            </Divider>
            {!!this.state.brandsTags.length &&
              this.state.brandsTags.map(brand => {
                return <Tag>{brand.children}</Tag>;
              })}
            {!!this.state.priceTags.length && (
              <Tag>
                از {this.state.priceTags[0]}تومان تا {this.state.priceTags[1]}{" "}
                تومان
              </Tag>
            )}

            {!!this.state.selectedFilter.length &&
              this.state.selectedFilter.map(filter => {
                return <Tag key={filter.id}>{filter.text}</Tag>;
              })}
            <Button
              className="brand-btn-filter"
              block
              danger
              type="primary"
              onClick={this.deleteFilter}
            >
              حذف تمامی فیلتر ها
            </Button>
          </React.Fragment>
        )}

        {!!this.state.data.length && (
          <div>
            <Divider className="side-hr" orientation="right">
              انتخاب دسته
            </Divider>

            <div className="category-container">
              <Search
                style={{ marginBottom: 8 }}
                placeholder="جستجو در دسته ها"
                onChange={this.onChange}
              />
              <Tree
                onExpand={this.onExpand}
                defaultExpandAll={true}
                // showLine={{ showLeafIcon: false }}
                switcherIcon={<DownOutlined />}
                // expandedKeys={expandedKeys}
                onSelect={this.onSelect}
                autoExpandParent={autoExpandParent}
                treeData={this.loop(this.state.data)}
              />
            </div>
          </div>
        )}

        {!!this.state.brands.length && this.state.allowBrands && (
          <div>
            <Divider className="side-hr" orientation="right">
              انتخاب برند
            </Divider>

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

            <Button
              className="brand-btn-filter"
              block
              type="primary"
              onClick={this.setBrand}
            >
              اعمال فیلتر برند
            </Button>
          </div>
        )}
        {this.state.base === "product" && (
          <div>
            <Divider className="side-hr" orientation="right">
              محدوده قیمت
            </Divider>
            <Slider
              min={1000000}
              max={20000000}
              step={500000}
              defaultValue={[1000000, 20000000]}
              range
              onChange={this.onChangeSlider}
              // value={typeof inputValue === "number" ? inputValue : 0}
            />
            <Button block type="primary" onClick={this.setPriceRange}>
              اعمال فیلتر قیمت
            </Button>
          </div>
        )}

        <hr className="hide-strock" />
        {!!this.state.data.length && (
          <React.Fragment>
            {!!this.state.specs.length ? (
              <div>
                <Divider className="side-hr" orientation="right">
                  فیلتر های مرتبط
                </Divider>

                {this.state.specs.map((spec, index) => {
                  return (
                    <Collapse
                      className="spec-collapse"
                      key={spec.id}
                      // defaultActiveKey={[index + 1]}
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
                                <Checkbox
                                  className={
                                    param.special
                                      ? "check check-special"
                                      : "check"
                                  }
                                  onChange={e =>
                                    this.check(
                                      spec.id,
                                      param.id,
                                      e,
                                      param,
                                      spec
                                    )
                                  }
                                  key={param.id}
                                >
                                  {param.value}
                                  {param.special && (
                                    <span
                                      style={{ background: param.special }}
                                    ></span>
                                  )}
                                </Checkbox>
                              </div>
                            );
                          })}
                        </div>
                      </Collapse.Panel>
                    </Collapse>
                  );
                })}

                <Button block type="primary" onClick={this.filterize}>
                  اعمال فیلتر های مرتبط
                </Button>
              </div>
            ) : (
              <div>
                <Divider className="side-hr" orientation="right">
                  فیلتر های مرتبط
                </Divider>
                <Empty
                  className="side-empty"
                  description="این دسته فیلتر خاصی ندارد"
                />
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    category: state.filter.category,
    brands: state.filter.brands,
    params: state.filter.params,
    id: state.blog.id,
    base: state.blog.base,
    price: state.filter.price
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCategory: cat => {
      dispatch(setCategory(cat));
    },
    setPrice: price => {
      dispatch(setPrice(price));
    },
    setBrands: brands => {
      dispatch(setBrands(brands));
    },
    setParams: params => {
      dispatch(setParams(params));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContent);
