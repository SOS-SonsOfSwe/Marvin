import React from "react";

// Not found page component
export default class LoadingUser extends React.Component {
  // render
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          {console.log('Dentro alla pagina di loading')}
          <h1>Waiting for your data...</h1>
        </div>
      </main>
    )
  }
}