import React from 'react';
import axios from 'axios';
import './App.css';
import HTMLRender from './components/HTMLRender';
import LoadingSign from './components/LoadingSign';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      value: '',
      imageData: '',
      html: '',
      finalURL: '',
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          this.setState({imageData: imageSrc})
          console.log(imageSrc);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
        <h1>Web Scraper!</h1>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <label>
            <p><strong>NOTE:</strong> For security reasons, images and scripts have been stripped from all pages, so things may look funky/unfinished. Links have been disabled.</p>
            Enter a URL to be scraped:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
          {this.state.loading ? <LoadingSign loading={true} /> : <LoadingSign loading={false} />}
        </form>
        {this.state.imageData ? <img alt="Website Screenshot" src={`../${this.state.imageData}`}></img> : <div></div>}
        <HTMLRender url={this.state.finalURL} html={this.state.html} />
      </div>

    );
  }
}

export default App;
