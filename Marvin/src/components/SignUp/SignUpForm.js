import React, { Component } from 'react'
import * as utils from '../../utils/validations'
import LoadingData from '../Loading/LoadingData';
import {signUpPopup}from '../../utils/popup';
import Popup from 'react-popup' 
// import ipfsPromise from '../../../api/utils/ipfsPromise'

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      surname: '',
      email: '',
      FC: '',
      UC: '',
      uploadedFile: ''
    }
    this.captureFile = this.captureFile.bind(this)
    // this.saveToIpfs = this.saveToIpfs.bind(this)
  }

  onInputNameChange(event) {
    this.setState({ name: event.target.value })
  }

  onInputSurnameChange(event) {
    this.setState({ surname: event.target.value })
  }

  onInputEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  onInputFCChange(event) {
    this.setState({ FC: event.target.value })
  }

  onInputUCChange(event) {
    this.setState({ UC: event.target.value })
  }

  captureFile(event) {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.onloadend = () => this.setState({
      uploadedFile: Buffer(reader.result)
    });
    reader.readAsArrayBuffer(file)
  }


  handleSubmit(event) {
    event.preventDefault()

    if (!utils.checkFiscalCode(this.state.FC) || !utils.checkUniqueCode(this.state.UC) || !utils.checkMail(this.state.email)) {
      
      Popup.queue(signUpPopup)
      Popup.clearQueue()
      return alert('ppppppppppppppp')
    }
    else{

      var userData = {
        "name": this.state.name,
        "surname": this.state.surname,
        "email": this.state.email,
        "FC": this.state.FC,
        "UC": this.state.UC,
        "uploadedFile": this.state.uploadedFile
      }

      // var ipfs = new ipfsPromise()

      // ipfs.pushJSON(userData).then(hashIPFS =>
      this.props.onSignUpFormSubmit(userData, event)
    }
  }

  render() {
    const adding = this.props.blockchainAdding === true || this.props.ipfsAdding ? <LoadingData label='Loading...' /> : <div />;

    return (
      <div>
        {adding}
        {this.props.ipfsLoading !== true && this.props.ipfsAdding !== true && this.props.blockchainAdding !== true &&

          <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
            <fieldset>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" value={this.state.name} onChange={this.onInputNameChange.bind(this)} placeholder="Name" />
              <span className="pure-form-message">This is a required field.</span>

              <br />
              <label htmlFor="surname">Surname</label>
              <input id="surname" type="text" value={this.state.surname} onChange={this.onInputSurnameChange.bind(this)} placeholder="Surname" />
              <span className="pure-form-message">This is a required field.</span>

              <br />
              <label htmlFor="email">eMail</label>
              <input id="email" type="text" value={this.state.email} onChange={this.onInputEmailChange.bind(this)} onFocus={Popup.close()} placeholder="eMail" />
              <span className="pure-form-message">This is a required field.</span>

              <br />
              <label htmlFor="FC">Fiscal code</label>
              <input id="FC" type="text" value={this.state.FC} onChange={this.onInputFCChange.bind(this)} onFocus={Popup.close()} placeholder="Fiscal code" />
              <span className="pure-form-message">This is a required field.</span>

              <br />

              <label htmlFor="UC">Univocal code</label>
              <input id="UC" type="text" value={this.state.UC} onChange={this.onInputUCChange.bind(this)} onFocus={Popup.close()} placeholder="Univocal code" />
              <span className="pure-form-message">This is a required field.</span>

              <br />
              <label htmlFor="UC">Profile image</label>
              <input id="profileImage" type='file' onChange={this.captureFile} />

              <br />

              <div className="div_button_signup">
                <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
              </div>

            </fieldset>
          </form>

        }
      </div>
    )
  }
}

export default SignUpForm
