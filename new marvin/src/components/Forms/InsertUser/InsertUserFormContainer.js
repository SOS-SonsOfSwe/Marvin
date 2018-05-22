import {
  connect
} from 'react-redux'
import InsertUserForm from './InsertUserForm'
import {
  insertUser
} from '../../../../api/actions/forms/InsertUserFormAction'

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInsertUserFormSubmit: (FCInserted, UCInserted, tpInserted) => {
      event.preventDefault();

      dispatch(insertUser(FCInserted, UCInserted, tpInserted))
    }
  }
}

const InsertUserFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertUserForm)

export default InsertUserFormContainer