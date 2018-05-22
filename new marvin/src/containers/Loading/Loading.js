import React from "react";

// Not found page component
class Loading extends React.Component {
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

export default Loading;

//   render() {
//     return (
//       <div className="wait-for-data" >
//         {console.log('Dentro alla pagina di loading')}
//         <h4> We 're retrieving your data from our database!</h4>
//       </div>
//     );
//   }
// }
// import React from 'react'

// export default function Loading() {
//   return <div>
//     {console.log('Dentro alla pagina di loading')}
//     Logging you in ...
//   </div>