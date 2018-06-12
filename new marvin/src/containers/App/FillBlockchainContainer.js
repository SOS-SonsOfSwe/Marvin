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
//     readCoursesData: (years, degreeC) => {
//       dispatch(readCoursesFromDatabase(years, degreeC))
//     }
//   }
// }

const FillBlockchainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FillBlockchain)

export default FillBlockchainContainer