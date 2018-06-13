import { adminCostants, ipfsCostants } from '../../reducers/costants'
import store from '../../../store'

export function eraseAcademicYearsReducer() {
  return {
    type: adminCostants.ERASE_ACADEMIC_YEARS,
  }
}
export function eraseDegreeCoursesReducer() {
  return {
    type: adminCostants.ERASE_DEGREE_COURSES,
  }
}
export function eraseCoursesReducer() {
  return {
    type: adminCostants.ERASE_DEGREE_COURSES,
  }
}
export function eraseIpfsReducer() {
  return {
    type: ipfsCostants.ERASE_IPFS_REDUCER
  }
}

export function eraseReducers() {
  store.dispatch(eraseAcademicYearsReducer())
  store.dispatch(eraseDegreeCoursesReducer())
  store.dispatch(eraseCoursesReducer())
  store.dispatch(eraseIpfsReducer())
}