//Basic import
import React, { Component } from "react";
import { connect } from "react-redux";
import { BackTop, ConfigProvider, Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import Axios from "axios";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
// css import
import "./App.css";
import "antd/dist/antd.css";
import "animate.css/animate.min.css";
import "simplebar/dist/simplebar.min.css";
import "react-jinke-music-player/assets/index.css";

// config import

//component import
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import Routes from "./Routes/Routes";
import Lottie from "react-lottie";
import ReactJkMusicPlayer from "react-jinke-music-player";
import * as animationData from "./assets/lottie/car.json";
// redux import
import { getUser } from "./Redux/Action/User";
import { getNightMode } from "./Redux/Action/View";

const { Content } = Layout;
var styleArray = [
  'background-image:    url("https://colinbendell.cloudinary.com/image/upload/c_crop,f_auto,g_auto,h_350,w_400/v1512090971/Wizard-Clap-by-Markus-Magnusson.gif")',
  "background-size: cover",
  "color: #000",
  "padding: 10px 20px",
  "line-height: 50px",
  "width : 150px",
  "height : 150px",
  "border : 2px solid #ccc"
];

var logoConsole = [
  'background-image:    url("http://smarblog.mamp:8050/logo-wide.png")',
  "background-size: cover",
  "line-height: 30px"
];

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const audioList1 = [];

const options = {
  audioLists: audioList1,
  defaultPlayIndex: 0,
  theme: "dark",
  bounds: "body",
  clearPriorAudioLists: false,
  autoPlayInitLoadPlayList: false,
  preload: false,
  glassBg: true,
  remember: false,
  remove: false,
  defaultPosition: {
    right: 100,
    bottom: 120
  },

  defaultPlayMode: "order",
  mode: "full",
  once: true,
  autoPlay: true,
  toggleMode: false,
  drag: false,
  seeked: true,
  showMediaSession: false,
  showProgressLoadBar: true,
  showPlay: true,
  showReload: true,
  showDownload: false,
  showPlayMode: false,
  showThemeSwitch: false,
  showLyric: false,
  showDestroy: false,
  extendsContent: null,
  defaultVolume: 1,
  playModeShowTime: 600,
  loadAudioErrorPlayNext: true,
  autoHiddenCover: false,
  spaceBar: true,
  responsive: true,

  // audio load failed error handle
  onAudioError(errMsg, currentPlayId, audioLists, audioInfo) {
    console.error(
      "audio load error",
      errMsg,
      currentPlayId,
      audioLists,
      audioInfo
    );
  },

  getContainer() {
    return document.body;
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.audio = {};
  }
  state = {
    data: [],
    loading: true,
    night: false,
    // apploading: true
    miniPlayer: false,
    togglePlayer: false,
    params: {
      ...options,
      getAudioInstance: audio => {
        this.audio = audio;
      }
    }
  };

  onAddAudio = block => {
    // console.log(id);
    this.setState({ togglePlayer: true, miniPlayer: false });
    this.updateParams({
      clearPriorAudioLists: true,
      audioLists: [
        // ...this.state.params.audioLists,
        {
          name: block.name,
          singer: block.singer,
          cover: block.cover,
          musicSrc: block.musicSrc
        }
      ]
    });
  };

  onShowGlassBg = () => {
    this.onChangeKey("glassBg");
  };

  onSeeked = () => {
    this.onChangeKey("seeked");
  };

  updateParams = params => {
    const data = {
      ...this.state.params,
      ...params
    };
    this.setState({
      params: data
    });
  };

  onPlayModeChange = e => {
    this.updateParams({ playMode: e.target.value });
  };

  togglePlayer = () => {
    this.setState({
      miniPlayer: !this.state.miniPlayer
    });
  };

  async getItems(items) {
    this.setState({ loading: true });
    Axios.get(process.env.REACT_APP_API_URL + items).then(res => {
      const data = res.data;
      this.setState({
        data: data,
        loading: false
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        loading: this.props.user.loading
      });
    }
    if (prevProps.night !== this.props.night) {
      this.setState({
        night: this.props.night
      });
    }

    if (prevProps.stream !== this.props.stream) {
      this.onAddAudio(this.props.stream);
    }
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getNightMode();
    this.getItems("blogs");
    console.log("%c            ", logoConsole.join(";"));
    console.log(
      "%cWelcome to NegarAfar , We are Happy for you 😍 and wish you Good luck 😘",
      "font-weight: lighter;color:#999999; font-size: 13px; font-family : cursive "
    );

    console.log("%cBe Happy", styleArray.join(";"));
  }

  render() {
    return (
      <Router>
        <div
          className={this.state.loading ? "abs-loading active" : "abs-loading"}
        >
          {/* <div class="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div> */}
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
        <Layout>
          <Header blogs={this.state.data} />
          <Content>
            <Routes blogs={this.state.data} />
          </Content>
          <BackTop />
          <Footer />
        </Layout>

        <span
          id={this.state.togglePlayer ? "show" : "hide"}
          onClick={this.togglePlayer}
          className={
            this.state.miniPlayer ? "toggle-player up" : "toggle-player down"
          }
        >
          {this.state.miniPlayer ? (
            <UpCircleOutlined />
          ) : (
            <DownCircleOutlined />
          )}
        </span>

        <ReactJkMusicPlayer
          className={
            this.state.togglePlayer
              ? this.state.miniPlayer
                ? "show up"
                : "show down"
              : "hide"
          }
          // className="animate__animated animate__bounce"
          {...this.state.params}
          // onThemeChange={(theme) => {
          //   console.log('onThemeChange: ', theme)
          //   this.updateParams({ theme })
          // }}
          onModeChange={mode => {
            // console.log('onModeChange: ', mode)
            this.updateParams({ mode });
          }}
          onPlayModeChange={playMode => {
            // console.log('onPlayModeChange: ', playMode)
            this.updateParams({ playMode });
          }}
          onPlayIndexChange={playIndex => {
            // console.log('onPlayIndexChange: ', playIndex)
            this.updateParams({ playIndex });
          }}
        />
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    night: state.view.night,
    stream: state.stream.stream
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(getUser());
    },
    getNightMode: () => {
      dispatch(getNightMode());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
