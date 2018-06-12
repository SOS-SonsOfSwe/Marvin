import { connect } from 'react-redux'
import InsertDidacticActivity from '../../../../components/Profile/Admin/DidacticActivities/InsertDidacticActivity'
import addNewDidacticActivity from '../../../../redux/actions/Admin/AddDidacticActivity'

const mapStateToProps = (state, ownProps) => {

  if (ownProps.location.state.fromDegree === false) {
    return {
      adding: state.admin.adding,
      success: state.admin.success
    }
  }

  else {
    return {
      adding: state.admin.adding,
      success: state.admin.success,
      year: ownProps.location.state.year,
      degreeUnicode: ownProps.location.state.degreeUnicode
    }
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