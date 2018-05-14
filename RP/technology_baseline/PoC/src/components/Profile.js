// import React, { Component } from 'react'
// import ProfileFormContainer from '../../ui/profileform/ProfileFormContainer'

// class Profile extends Component {
//   render() {
//     return(
//       <main className="container">
//         <div className="pure-g">
//           <div className="pure-u-1-1">
//             <h1>Profile</h1>
//             <p>Edit your account details here.</p>
//             <ProfileFormContainer />
//           </div>
//         </div>
//       </main>
//     )
//   }
// }

// export default Profile
import * as utils from '../util/util'
import React, { Component } from 'react'
// import ProfileFormContainer from './Profile/ProfileFormContainer'

class Profile extends Component {
  constructor(props, { authData }) { 
    super(props) 
    authData = this.props 
  } 

  render() {
    return(
      <main className="container">
        {/* <div className="pure-g"> */}
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            <p className="important-message"><strong>Congratulations {this.props.authData.payload.FC}!</strong> If you're seeing this page,
            you've logged in as <strong>{utils.userDef(this.props.authData.payload.tp)}</strong>.
            <br/>
            Your badge number is: <strong>{this.props.authData.payload.badgeNumber}</strong>.
            </p> 
          </div>
        {/* </div> */}
      </main>
    )
  }
}

export default Profile
