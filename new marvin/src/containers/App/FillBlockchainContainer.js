import { connect } from 'react-redux'
import FillBlockchain from '../../components/App/FillBlockchain'
import addNewAcademicYear from '../../redux/actions/Admin/AddAcademicYear'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = {
  addAcademicYear: addNewAcademicYear
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     readDidacticActivitiesData: (years, degreeC) => {
//       dispatch(readDidacticActivitiesFromDatabase(years, degreeC))
//     }
//   }
// }

const FillBlockchainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FillBlockchain)

export default FillBlockchainContainer