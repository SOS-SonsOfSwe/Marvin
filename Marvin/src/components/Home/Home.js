import React, { Component } from 'react'
import book from '../../../public/media/1.jpg'
// import webpack from 'webpack';

class Home extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Welcome to Marvin, the Uniweb Ðapp demonstrator!</h1>
            <p>This is the website that the Sons Of SWE group edited for the Marvin project. It consist,
              through the use of blockchain technology, in an Uniweb demonstrator on Ethereum.
              </p>
            <div className="book-img">
              {/* <img src={book} className="img-fluid" alt="Book" /> */}
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Home;
