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
//     readClassesData: (years, degreeC) => {
//       dispatch(readClassesFromDatabase(years, degreeC))
//     }
//   }
// }

const FillBlockchainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FillBlockchain)

export default FillBlockchainContainer