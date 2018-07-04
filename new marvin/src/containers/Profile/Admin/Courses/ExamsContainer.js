import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Exams from '../../../../components/Profile/Admin/Courses/Exams'

import { readExamsFromDatabase } from '../../../../redux/actions/Admin/readExams'
import { readCoursesFromDatabase } from '../../../../redux/actions/Admin/readCourses'
import { readDegreeCoursesFromDatabase } from '../../../../redux/actions/Admin/readDegreeCourses'
import { readAcademicYearsFromDatabase } from '../../../../redux/actions/Admin/readAcademicYears'

const mapStateToProps = (state, ownProps) => {
    return {
        degreeCourses: state.admin.degreeCourses.payload,
        successDegree: state.admin.degreeCourses.success,
        academicYears: state.admin.academicYears.payload,
        classes: state.admin.courses.payload,
        exams: state.admin.exams.payload,
        loadingCourses: state.admin.courses.loading,
        loadingDegree: state.admin.degreeCourses.loading,
        loadingAcademic: state.admin.academicYears.loading,
        loadingExams: state.admin.exams.loading,
        successClasses: state.admin.courses.success,
        success: state.admin.exams.success,
        somethingChanged: state.admin.degreeCourses.somethingChanged,
        emptyClasses: state.admin.courses.empty,
        emptyDegreeCourses: state.admin.degreeCourses.empty,
        emptyAcademicYears: state.admin.academicYears.empty,
        emptyExams: state.admin.exams.empty,

        ipfsLoading: state.ipfs.loading

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        readCoursesData: bindActionCreators(readCoursesFromDatabase, dispatch),
        readDegreeData: bindActionCreators(readDegreeCoursesFromDatabase, dispatch),
        readAcademicData: bindActionCreators(readAcademicYearsFromDatabase, dispatch),
        readExamsData: bindActionCreators(readExamsFromDatabase, dispatch)
    }
}

const ExamsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Exams)

export default ExamsContainer