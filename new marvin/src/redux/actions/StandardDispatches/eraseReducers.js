import { adminCostants, ipfsCostants } from '../../reducers/costants'
import store from '../../../store'

export function eraseAcademicYearsReducer() {
  return {
    type: adminCostants.ERASE_ACADEMIC_YEARS,
  }
}
export function eraseDegreesReducer() {
  return {
    type: adminCostants.ERASE_DEGREES,
  }
}
export function eraseClassesReducer() {
  return {
    type: adminCostants.ERASE_DEGREES,
  }
}
export function eraseIpfsReducer() {
  return {
    type: ipfsCostants.ERASE_IPFS_REDUCER
  }
}
export function eraseUniAdminsRead() {
  return {
    type: adminCostants.ERASE_ADMINS
  }
}
export function eraseTeachersRead() {
  return {
    type: adminCostants.ERASE_ADMINS
  }
}
export function eraseStudentsRead() {
  return {
    type: adminCostants.ERASE_STUDENTS
  }
}

export function eraseReducers() {
  store.dispatch(eraseAcademicYearsReducer())
  store.dispatch(eraseDegreesReducer())
  store.dispatch(eraseClassesReducer())
  store.dispatch(eraseIpfsReducer())
  store.dispatch(eraseUniAdminsRead())
  store.dispatch(eraseTeachersRead())
  store.dispatch(eraseStudentsRead())
}