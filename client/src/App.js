import React from 'react';
import axios from 'axios';
import './App.css';
import HTMLRender from './components/HTMLRender';
import LoadingSign from './components/LoadingSign';
import Footer from './components/Footer';
import anime from 'animejs';
import StartAnimation from './components/StartAnimation';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      imageData: '',
      html: '',
      finalURL: '',
      loading: false,
      startAnimationFinished: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  //called by the StartAnimation component, allows for rendering of the
  setAnimState = (state) => {
    this.setState({ startAnimationFinished: state });
  }

  getHTML = () => {
    this.setState({ loading: true });

    axios.post('/html', {
      url: this.state.value
    })
      .then(response => {
        console.log(response)
        this.setState({
          html: response.data,
          finalURL: this.state.value,
          loading: false
        })
      })
      .catch(response => {
        console.log(response)
        this.setState({ loading: false })
      })
  }

  //get a screenshot of the web page at the url
  getScreenshot = () => {
    let imageSrc = "";

    axios.post('/screenshot', {
      url: this.state.value
    })
      .then((response) => {
        console.log(response);
        if (response.data.imageSaved || response.data.imageExists) {
          imageSrc = './img/' + this.state.value + '.png';
          this.setState({ imageData: imageSrc })
          console.log(imageSrc);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  closeFooter = () => {
    anime({
      targets: '.footer',
      translateX: '-100vw',
      duration: 750,
      easing: 'easeOutElastic',
      delay: 150
    }).play();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);
    //test input to see if it matches valid url regex
    if (this.state.value.match(regex)) {
      //this.getScreenshot();
      this.getHTML();
    } else {
      alert("Invalid input");
    }
  }

  render() {
    return (
      <div className="App">
        <div id="laptop-bg-outer">
          <div id="laptop-bg-inner">
            <div id="laptop-browser">
              {this.state.startAnimationFinished ?
                //TODO: get the form inside of the BrowserContent component
                <div id="browser-content-container">
                  <div id="browser-header">
                    <div className="browser-options" id="browser-close"></div>
                    <div className="browser-options" id=""></div>
                    <div className="browser-options" id=""></div>
                  </div>
                  <form className="search-form" onSubmit={this.handleSubmit}>
                    <label>
                      <div id="search-bar">
                        <p>Enter a a URL below</p>
                        <input id="submit-input" type="text" value={this.state.value} onChange={this.handleChange} />
                        <button id="submit-button" type="submit">Submit</button>
                      </div>
                    </label>
                    {this.state.loading ? <LoadingSign loading={true} /> : <LoadingSign loading={false} />}
                  </form>
                  {this.state.imageData ? <img alt="Website Screenshot" src={`../${this.state.imageData}`}></img> : null}
                  <HTMLRender url={this.state.finalURL} html={this.state.html} />
                </div> :
                <StartAnimation setAnimState={this.setAnimState} />}
            </div>
          </div>
        </div>
        {/* <div id="front-header" className="dark">
          <h1>Web Scraper!</h1>
          <form className="search-form" onSubmit={this.handleSubmit}>
            <label>
              <div id="search-bar">
                <p>Enter a a URL below</p>
                <input id="submit-input" type="text" value={this.state.value} onChange={this.handleChange} />
                <button id="submit-button" type="submit">Submit</button>
              </div>
            </label>
            {this.state.loading ? <LoadingSign loading={true} /> : <LoadingSign loading={false} />}
          </form>
        </div>
        <div className="light" id="front-body">
          {this.state.imageData ? <img alt="Website Screenshot" src={`../${this.state.imageData}`}></img> : <div></div>}
          <HTMLRender url={this.state.finalURL} html={this.state.html} />
        </div>
        <Footer closeFooter={() => this.closeFooter} message="<p><strong>NOTE:</strong> For security reasons, images and scripts have been stripped from all pages, so things may look funky/unfinished. Links have been disabled.</p>" /> */}
        {this.state.startAnimationFinished ? <Footer closeFooter={() => this.closeFooter} message="<p><strong>NOTE:</strong> For security reasons, images and scripts have been stripped from all pages, so things may look funky/unfinished. Links have been disabled.</p>" />
          : null}
      </div>

    );
  }
}

export default App;
