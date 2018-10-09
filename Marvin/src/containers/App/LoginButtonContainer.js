import {
  connect
} from 'react-redux'
import LoginButton from '../../components/App/LoginButton'
import { loginUser } from '../../redux/actions/Login-logout-signup/LoginButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUserClick: (event) => {
      event.preventDefault();

      dispatch(loginUser())
    }
  }
}

const LoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton)

export default LoginButtonContainer