import {
  connect
} from 'react-redux'
import ProfileForm from './ProfileForm'
import {
  updateUser
} from '../../../../api/actions/forms/ProfileFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.user.data.name,
    surname: state.user.data.surname
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileFormSubmit: (name, surname) => {
      event.preventDefault();

      dispatch(updateUser(name, surname))
    }
  }
}

const ProfileFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm)

export default ProfileFormContainer