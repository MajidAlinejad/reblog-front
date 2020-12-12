import React, { Component } from "react";
import { FieldTimeOutlined, StarOutlined } from "@ant-design/icons";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { ColorExtractor } from "react-color-extractor";

const defaultConf = {
  discount: true,
  modern: false,
  time: true
};

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <span className="count-grid-end">زمان به اتمام رسید</span>;
  } else {
    // Render a countdown
    return (
      <span className="count-grid">
        <FieldTimeOutlined />
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

export default class ProductItem extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }
  state = {
    time: false,
    loading: true,
    discount: false,
    conf: {},
    colors: []
  };

  getColors = colors =>
    this._isMounted &&
    this.setState(state => ({ colors: [...state.colors, ...colors] }));

  handleImageLoaded() {
    this._isMounted && this.setState({ imageStatus: "loaded", loading: false });
  }

  handleImageErrored() {
    this._isMounted &&
      this.setState({ imageStatus: "failed to load", loading: true });
  }

  componentDidMount() {
    this._isMounted = true;

    if (this.props.product) {
      this._isMounted &&
        this.setState({
          conf: this.props.product
        });
    } else {
      this._isMounted &&
        this.setState({
          conf: defaultConf
        });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({
      item: [],
      colors: [],
      conf: [],
      loading: null
    });
  }
  render() {
    const { item } = this.props;
    const { loading, conf, colors } = this.state;
    return (
      <React.Fragment>
        <div className="container-base-item-store">
          <Link to={"/post/" + item.id + `/${item.seo}`}>
            {item.off && <div className="special-product">{item.off}%</div>}
            <div
              className="grid-product-card"
              style={
                {
                  // background: `linear-gradient(to bottom, #ffffff30 92%, ${
                  //   colors[0]
                  // } 8%)`
                  // background: `linear-gradient(to bottom, #ffffff30 92%, #ff605b 8%)`
                }
              }
            >
              <div
                className="grid-card-cover"
                style={{
                  transition: "all 1s",
                  background: `linear-gradient(115deg, ${colors[1]}40 , ${
                    colors[5]
                  }05)`
                }}
              >
                <ColorExtractor getColors={this.getColors} maxColors={4}>
                  <img
                    alt={item.title}
                    style={loading ? { opacity: 0 } : { opacity: 1 }}
                    className={
                      conf.modern ? "product-img artistic" : "product-img "
                    }
                    onLoad={this.handleImageLoaded.bind(this)}
                    onError={this.handleImageErrored.bind(this)}
                    // src={perfume}
                    src={process.env.REACT_APP_BASE_URL + item.thumbnail}
                  />
                </ColorExtractor>
              </div>
              {/* <span className="dashed-hr"></span> */}
              {/* <hr className="middle-hr" /> */}

              <div className="grid-card-body">
                <div className="grid-card-meta">
                  <h1>{item.title}</h1>
                  <hr className="middle-hr" />
                  <div className="extra-grid">
                    <span className={item.status > 0 ? "exist green" : "exist"}>
                      {item.status === "active"
                        ? "موجود"
                        : item.status > 0
                        ? item.status + " عدد"
                        : "ناموجود"}
                    </span>
                    <div className="rate">
                      <StarOutlined />
                      {Math.round(
                        ((item.like - item.unlike) /
                          (item.like + item.unlike)) *
                          5 *
                          10
                      ) / 10}
                    </div>
                  </div>

                  {/* {conf.discount && (
                    <h3 className="last-price-grid">3,200,000</h3>
                  )} */}
                  {item.expire > 0 && conf.time ? (
                    <Countdown
                      date={item.expire - Date.now()}
                      renderer={renderer}
                    />
                  ) : (
                    <div className="count-grid empty"> </div>
                  )}
                </div>
              </div>
              <div className="grid-card-footer">
                {/* {conf.time ? (
                  <Countdown date={Date.now() + 900000} renderer={renderer} />
                ) : (
                  <h1 className="price-grid white">3,000,000 تومان</h1>
                )} */}
                {/* {conf.time ? (
                  <Countdown date={Date.now() + 900000} renderer={renderer} />
                ) : ( */}
                <h1 className="price-grid white">
                  <NumberFormat
                    value={item.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" تومان"}
                  />
                </h1>
                {/* )} */}
              </div>
            </div>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
