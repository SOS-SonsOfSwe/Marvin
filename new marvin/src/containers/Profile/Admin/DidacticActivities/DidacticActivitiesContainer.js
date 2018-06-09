import { connect } from 'react-redux'

import DidacticActivities from '../../../../components/Profile/Admin/DidacticActivities/DidacticActivities'

import { readDidacticActivitiesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.admin.didacticActivities.payload,
    loading: state.admin.didacticActivities.loading,
    success: state.admin.didacticActivities.success

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readDidacticActivitiesData: (years, degreeC) => {
      dispatch(readDidacticActivitiesFromDatabase(years, degreeC))
    }
  }
}

const DidacticActivitiesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DidacticActivities)

export default DidacticActivitiesContainer