import axios from "axios";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Skeleton, Space, Tooltip, message } from "antd";
import { setTags } from "../../../Redux/Action/Filter";
import { connect } from "react-redux";

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
  slidesToScroll: 5,
  variableWidth: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        // slidesToScroll: 3,
        slidesToShow: 8
      }
    },
    {
      breakpoint: 1000,
      settings: {
        // slidesToScroll: 3,
        slidesToShow: 5
      }
    },
    {
      breakpoint: 900,
      settings: {
        // slidesToScroll: 3,
        slidesToShow: 4
      }
    },
    {
      breakpoint: 700,
      settings: {
        // slidesToScroll: 2,
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        // slidesToScroll: 1,
        slidesToShow: 1
      }
    }
  ]
};

class Swaper extends Component {
  _isMounted = false;

  state = {
    tags: [],
    loading: true,
    selectedTags: [],
    originsTag: [],
    optClass: ""
  };

  addMessage = name => {
    message.success(
      {
        content: name + " انتخاب شد",
        className: "custom-class",
        duration: 0.5,
        style: {
          marginTop: "15vh"
        }
      },
      12
    );
  };

  removeMessage = name => {
    message.warning(
      {
        content: name + " حذف شد",
        className: "custom-class",
        duration: 0.5,
        style: {
          marginTop: "15vh"
        }
      },
      12
    );
  };

  selectTag = (clicked, e) => {
    let tags = [];
    let result = [];
    let tempTag = [];
    let select = {
      ...clicked,
      className: "selected-tag"
    };

    tags = tags.concat(this.state.originsTag);
    let selectedTags = this.state.selectedTags.concat(select);
    if (this.state.selectedTags.filter(item => item.id === select.id).length) {
      selectedTags = this.state.selectedTags.filter(
        item => item.id !== select.id
      );
      this.removeMessage(clicked.text);
    } else {
      this.addMessage(clicked.text);
    }

    tempTag = tags;
    selectedTags.map(tag => {
      tempTag = tempTag.filter(item => item.id !== tag.id);
      return null; //just for remove warning in console :))))
    });

    result = selectedTags.concat(tempTag);
    this.setState(
      {
        selectedTags: selectedTags,
        tags: result
      },
      () => {
        this.props.setTags(this.state.selectedTags);
      }
      //set tags
    );
  };

  async getItems(id) {
    axios.get(process.env.REACT_APP_API_URL + "tagsname/" + id).then(res => {
      const tags = res.data;
      if (this._isMounted) {
        this.setState({
          originsTag: tags,
          tags: tags,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.getItems(this.props.id);
    }
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.id !== undefined) {
      this._isMounted && this.getItems(this.props.id);
    }
    this.setState({
      optClass: "with-opacity"
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <React.Fragment>
        <div className="categorySlider ">
          {loading ? (
            <CatSketon />
          ) : (
            <Slider {...settings}>
              {this.state.tags.map(tag => {
                return (
                  <React.Fragment key={tag.id}>
                    {tag.className ? (
                      <Tooltip placement="bottom" title="حذف؟">
                        <div
                          className={"category-slide " + tag.className}
                          key={tag.id}
                          onClickCapture={e => {
                            this.selectTag(tag, e.target);
                          }}
                        >
                          {tag.text}
                        </div>
                      </Tooltip>
                    ) : (
                      <div
                        className="category-slide "
                        key={tag.id}
                        onClickCapture={e => {
                          this.selectTag(tag, e.target);
                        }}
                      >
                        {tag.text}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </Slider>
          )}
        </div>
      </React.Fragment>
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

const mapStateToProps = state => {
  return {
    tags: state.filter.tags,
    id: state.blog.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTags: tags => {
      dispatch(setTags(tags));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Swaper);
