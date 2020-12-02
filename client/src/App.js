import React from 'react';
import axios from 'axios';
import './App.css';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      value: '',
      imageData: '',
      imageURL: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderImage = () => {
    let imageSrc = "";
    let imageURL = "";
    axios.post('/scrape', {
      url: this.state.value
    })
      .then((response) => {
        console.log(response);
        if (response.data.imageSaved) {
          imageURL = this.state.value;
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

    let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);
    //test input to see if it matches valid url regex
    if (this.state.value.match(regex)) {
      this.renderImage()
    } else {
      alert("Invalid input");
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Web Scraper!</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter a URL to be scraped:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.imageData ? <img src={`../img/${this.state.value}.png`}></img> : <div>test</div>}
      </div>

    );
  }
}

export default App;
