import {
  connect
} from 'react-redux'
import SignUpForm from '../../components/SignUp/SignUpForm'
import {
  signUpUser
} from '../../redux/actions/Login-logout-signup/SignUpFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    ipfsAdding: state.ipfs.adding
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpFormSubmit: (userData, event) => {
      // event.preventDefault()
      dispatch(signUpUser(userData))
    }
  }
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)

export default SignUpFormContainer