import axios from "axios";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Skeleton, Space, Divider, Switch, Form, Radio } from "antd";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} id="categoryArrow-next" onClick={onClick} />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} id="categoryArrow-prev" onClick={onClick} />
  );
}

const settings = {
  className: "center",
  infinite: false,
  centerPadding: "60px",
  slidesToScroll: 3,
  variableWidth: true,
  infinite: true,
  initialSlide: 3,
  // slidesToShow: 8,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  rtl: true,
  swipeToSlide: true
};

class Swaper extends Component {
  state = {
    categories: [],
    loading: true
  };

  constructor(props) {
    super(props);
  }

  handleActiveChange = checked => {
    this.setState({ active: checked });
  };

  async getItems() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const categories = res.data;
      this.setState({
        categories,
        loading: false
      });
    });
  }

  componentDidMount() {
    this.getItems();
  }
  render() {
    const { loading } = this.state;
    return (
      <div className="categorySlider">
        {loading ? (
          <CatSketon />
        ) : (
          <Slider {...settings}>
            {this.state.categories.map(function(slide) {
              return (
                <div className="category-slide" key={slide}>
                  <strong> {slide.website} </strong>
                </div>
              );
            })}
          </Slider>
        )}
      </div>
    );
  }
}

function CatSketon() {
  return (
    <Space>
      <Skeleton.Button
        style={{ width: 130 }}
        active="true"
        size="large"
        shape="round"
      />
      <Skeleton.Button
        style={{ width: 120 }}
        active="true"
        size="large"
        shape="round"
      />
      <Skeleton.Button
        style={{ width: 118 }}
        active="true"
        size="large"
        shape="round"
      />
      <Skeleton.Button
        style={{ width: 90 }}
        active="true"
        size="large"
        shape="round"
      />
      <Skeleton.Button
        style={{ width: 130 }}
        active="true"
        size="large"
        shape="round"
      />
      <Skeleton.Button
        style={{ width: 90 }}
        active="true"
        size="large"
        shape="round"
      />
      <Skeleton.Button
        style={{ width: 80 }}
        active="true"
        size="large"
        shape="round"
      />
      <Skeleton.Button
        style={{ width: 130 }}
        active="true"
        size="large"
        shape="round"
      />
      <Skeleton.Button
        style={{ width: 120 }}
        active="true"
        size="large"
        shape="round"
      />
      <Skeleton.Button
        style={{ width: 126 }}
        active="true"
        size="large"
        shape="round"
      />
      <Skeleton.Button
        style={{ width: 80 }}
        active="true"
        size="large"
        shape="round"
      />
      <Skeleton.Button
        style={{ width: 126 }}
        active="true"
        size="large"
        shape="round"
      />
      <Skeleton.Button
        style={{ width: 90 }}
        active="true"
        size="large"
        shape="round"
      />

      <Skeleton.Button
        style={{ width: 90 }}
        active="true"
        size="large"
        shape="round"
      />
      <Skeleton.Button
        style={{ width: 90 }}
        active="true"
        size="large"
        shape="round"
      />
      <Skeleton.Button
        style={{ width: 90 }}
        active="true"
        size="large"
        shape="round"
      />
    </Space>
  );
}

export default Swaper;
