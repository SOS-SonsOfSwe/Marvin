import { connect } from 'react-redux'
import InsertDidacticActivity from '../../../../components/Profile/Admin/DidacticActivities/InsertDidacticActivity'
import addNewDidacticActivity from '../../../../redux/actions/Admin/AddDidacticActivity'

const mapStateToProps = (state, ownProps) => {
  return {
    adding: state.admin.adding,
    success: state.admin.success,
  }
}

const mapDispatchToProps = {
  addDidacticActivity: addNewDidacticActivity
}

const InsertDidacticActivityContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertDidacticActivity)

export default InsertDidacticActivityContainer