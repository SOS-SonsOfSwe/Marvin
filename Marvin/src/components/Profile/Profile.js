import * as utils from '../../utils/validations'
import React, { Component } from 'react'

import SubNavBar from './SubNavBar'

//stylesheet
import './Profile.scss'


class ProfileIntro extends Component {

  render() {
    // const rows = this.props.authData.payload.image.map((rowData, index) => <Row key={index} {...rowData} />);
    // console.log(this.props.authData.payload.image)
    return (
      <div className="pure-u-1-1">
        <h1>Profile</h1>
        <p className="important-message"><strong>Congratulations {this.props.authData.payload.name} {this.props.authData.payload.surname}!</strong>
          <br />
          If you are seeing this page, you've logged in as <strong>{utils.userDef(this.props.authData.payload.tp)}</strong>.
    <br />
          Your fiscal code is: <strong>{this.props.authData.payload.FC}</strong>
          <br />
          Your email is: <strong>{this.props.authData.payload.email}</strong>
          <br />
          Your badge number is: <strong>{this.props.authData.payload.badgeNumber}</strong>.
    </p>
      <div className="img-div">
        <img className="profileImage" src={'https://ipfs.infura.io/ipfs/' + this.props.authData.payload.image} alt="" />
      </div>
      </div>

    )
  }
}

class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }


  render() {
    return (
      <div className="profile">
        <SubNavBar />
        {this.props.children || <ProfileIntro authData={this.props.authData} />}
      </div>
    )
  }
}

export default Profile
// export default connect(state => ({ authData: state.user.data }))(Profile)

