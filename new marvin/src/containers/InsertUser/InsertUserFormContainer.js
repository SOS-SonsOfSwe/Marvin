import {
  connect
} from 'react-redux'
import InsertUserForm from '../../components/InsertUser/InsertUserForm'
import {
  insertUser
} from '../../redux/actions/Admin/InsertUserFormAction'

const mapStateToProps = (state, ownProps) => {
  return {
    isUni: state.user.isUni,
    typeChecked: (ownProps.type !== undefined) ? ownProps.type : 3
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInsertUserFormSubmit: (FCInserted, UCInserted, tpInserted, event) => {
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