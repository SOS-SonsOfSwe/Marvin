import { connect } from 'react-redux'

import DidacticActivities from '../../../../components/Profile/Admin/DidacticActivities/DidacticActivities'

import { readDidacticActivitiesFromDatabase } from '../../../../redux/actions/Read/readAdminData'

const mapStateToProps = (state, ownProps) => {
  return {
    didacticActivitiesData: state.admin.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readDidacticActivitiesData: () => {
      dispatch(readDidacticActivitiesFromDatabase())
    }
  }
}

const DidacticActivitiesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DidacticActivities)

export default DidacticActivitiesContainer