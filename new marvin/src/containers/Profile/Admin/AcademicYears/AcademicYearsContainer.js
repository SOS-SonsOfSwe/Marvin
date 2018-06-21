// importing the connect wil "import" also the store
import { connect } from 'react-redux'
// we import the specific component we want to link to the store
import AcademicYears from '../../../../components/Profile/Admin/AcademicYears/AcademicYears'
// we import the action (=dispatch) we want to link to the store 
// import { readAcademicYearsFromDatabase } from '../../../../redux/actions/Admin/readAdminData'

import { readAcademicYearsFromDatabase } from '../../../../redux/actions/Admin/readAcademicYears'

// the two "map" listed here are useful to make the component "subscribe" the store.
// how it works? See the description below!

// this map is useful to create a parameter (academicYearsData) and to make it subscribe
// the store (=state) at the reducer selected (admin) with the data that are inside (data).
// it will be used in the component we previously imported.
// As the reader can see we are taking parameters from the exact place in which they are, so
// SO:
// state: store state
// admin: first reducer
// academicYears: second reducer
// payload: the data inside the reducer
const mapStateToProps = (state, ownProps) => {
  return {
    academicYears: state.admin.academicYears.payload,
    loading: state.admin.academicYears.loading,
    success: state.admin.academicYears.success,
    empty: state.admin.academicYears.empty,
    justDeleted: state.admin.academicYears.justDeleted
  }
}

// this map is useful to dispatch an action (=connect it to the store state) which will modify the
// store state. So we dispatch the action readAcademicYearsFromDatabase that will be 
// used inside the component imported
// Mind the "return" statements: we haven't done the dispatch here, neither in the action. It will
// be done by the connect below
const mapDispatchToProps = {
  readAcademicData: readAcademicYearsFromDatabase
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     readAcademicData: () => {
//       dispatch(readAcademicYearsFromDatabase())
//     }
//   }
// }

// this statement connects the mappings above to the component. It's a redux function
const AcademicYearsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AcademicYears)

// this export is exporting a valid react class because of the importing above
export default AcademicYearsContainer

// this connect is for read-only components

// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)