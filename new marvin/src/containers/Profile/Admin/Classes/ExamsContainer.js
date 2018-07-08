import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Exams from '../../../../components/Profile/Admin/Classes/Exams'

import { readExamsFromDatabase } from '../../../../redux/actions/Admin/readExams'
import { readClassesFromDatabase } from '../../../../redux/actions/Admin/readClasses'
import { readDegreesFromDatabase } from '../../../../redux/actions/Admin/readDegrees'
import { readAcademicYearsFromDatabase } from '../../../../redux/actions/Admin/readAcademicYears'

const mapStateToProps = (state, ownProps) => {
    return {
        degrees: state.admin.degrees.payload,
        successDegree: state.admin.degrees.success,
        academicYears: state.admin.academicYears.payload,
        classes: state.admin.classes.payload,
        exams: state.admin.exams.payload,
        loadingClasses: state.admin.classes.loading,
        loadingDegree: state.admin.degrees.loading,
        loadingAcademic: state.admin.academicYears.loading,
        loadingExams: state.admin.exams.loading,
        successClasses: state.admin.classes.success,
        success: state.admin.exams.success,
        somethingChanged: state.admin.degrees.somethingChanged,
        emptyClasses: state.admin.classes.empty,
        emptyDegrees: state.admin.degrees.empty,
        emptyAcademicYears: state.admin.academicYears.empty,
        emptyExams: state.admin.exams.empty,

        ipfsLoading: state.ipfs.loading

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        readClassesData: bindActionCreators(readClassesFromDatabase, dispatch),
        readDegreeData: bindActionCreators(readDegreesFromDatabase, dispatch),
        readAcademicData: bindActionCreators(readAcademicYearsFromDatabase, dispatch),
        readExamsData: bindActionCreators(readExamsFromDatabase, dispatch)
    }
}

const ExamsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Exams)

export default ExamsContainer