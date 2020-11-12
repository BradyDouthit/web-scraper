import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      axios.post('/scrape', {
        url: this.state.value
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

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
      </div>

    );
  }
}

export default App;
