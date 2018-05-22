import {
  connect
} from 'react-redux'
import SignUpForm from './SignUpForm'
import {
  signUpUser
} from '../../../../api/actions/forms/SignUpFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpFormSubmit: (userData, hashIPFS) => {
      dispatch(signUpUser(userData, hashIPFS))
    }
  }
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)

export default SignUpFormContainer