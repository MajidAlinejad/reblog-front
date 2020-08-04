import React, { Component } from "react";
import { FieldTimeOutlined, StarOutlined } from "@ant-design/icons";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { ColorExtractor } from "react-color-extractor";
import apple from "../../../assets/picture/example/apple.png";
import perfume from "../../../assets/picture/example/perfume.png";
import perfume2 from "../../../assets/picture/example/perfume2.png";

const defaultConf = {
  discount: false,
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
  state = {
    time: false,
    loading: true,
    discount: false,
    conf: {},
    colors: []
  };

  getColors = colors =>
    this.setState(state => ({ colors: [...state.colors, ...colors] }));

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded", loading: false });
  }

  handleImageErrored() {
    this.setState({ imageStatus: "failed to load", loading: true });
  }

  componentDidMount() {
    if (this.props.product) {
      this.setState({
        conf: this.props.product
      });
    } else {
      this.setState({
        conf: defaultConf
      });
    }
  }
  render() {
    const { item, base } = this.props;
    const { loading, conf, colors } = this.state;
    return (
      <React.Fragment>
        <div className="container-base-item-store">
          <Link to={item.url}>
            <div
              className="grid-product-card"
              style={{
                background: `linear-gradient(to bottom, white 92%, ${
                  colors[0]
                } 8%)`
              }}
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
                    alt="example"
                    style={loading ? { opacity: 0 } : { opacity: 1 }}
                    className={
                      conf.modern ? "product-img artistic" : "product-img "
                    }
                    onLoad={this.handleImageLoaded.bind(this)}
                    onError={this.handleImageErrored.bind(this)}
                    src={apple}
                    // src={item.thumbnailUrl}
                  />
                </ColorExtractor>
              </div>
              {/* <span className="dashed-hr"></span> */}
              {/* <hr className="middle-hr" /> */}

              <div className="grid-card-body">
                <div className="grid-card-meta">
                  <p>
                    ساعت هوشمند اپل سری 3 جی پی اس مدل 38mm Aluminium Case with
                    Sport Band ساعت هوشمند اپل سری 3 جی پی اس مدل 38mm Aluminium
                    Case with Sport Band
                  </p>
                  <hr className="middle-hr" />
                  <div className="extra-grid">
                    <span className="exist">ناموجود</span>
                    <div className="rate">
                      <StarOutlined />
                      3.7
                    </div>
                  </div>
                  {conf.discount && (
                    <h3 className="last-price-grid">3,200,000</h3>
                  )}

                  <h1 className="price-grid">3,000,000 تومان</h1>

                  {/* {item.title} */}
                </div>
              </div>
              <div className="grid-card-footer">
                {conf.time && (
                  <Countdown date={Date.now() + 900000} renderer={renderer} />
                )}
              </div>
            </div>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
