// importing the connect wil "import" also the store
import { connect } from 'react-redux'

import getAverageGasPrice from '../redux/actions/costs'
import Costs from '../components/costs';

const mapStateToProps = (state, ownProps) => {
    console.log("eccoci" + state.cost.payload)
    return {
        costsJSON: state.cost.payload,
        loading: state.cost.loading,
        success: state.cost.success,
    }
}

// this map is useful to dispatch an action (=connect it to the store state) which will modify the
// store state. So we dispatch the action readAcademicYearsFromDatabase that will be 
// used inside the component imported
// Mind the "return" statements: we haven't done the dispatch here, neither in the action. It will
// be done by the connect below
const mapDispatchToProps = {
    getCostsJSON: getAverageGasPrice
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     readAcademicData: () => {
//       dispatch(readAcademicYearsFromDatabase())
//     }
//   }
// }

// this statement connects the mappings above to the component. It's a redux function
const CostsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Costs)

// this export is exporting a valid react class because of the importing above
export default CostsContainer

// this connect is for read-only components

// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)