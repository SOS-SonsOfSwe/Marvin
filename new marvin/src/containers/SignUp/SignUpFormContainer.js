import {
  connect
} from 'react-redux'
import SignUpForm from '../../components/SignUp/SignUpForm'
import {
  signUpUser
} from '../../redux/actions/Login-logout-signup/SignUpFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpFormSubmit: (userData, hashIPFS, event) => {
      event.preventDefault()
      dispatch(signUpUser(userData, hashIPFS))
    }
  }
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)

export default SignUpFormContainer