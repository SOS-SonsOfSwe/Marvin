import { connect } from 'react-redux'
import InsertExam from '../../../../components/Profile/Admin/Courses/InsertExam'
import addNewExam from '../../../../redux/actions/Admin/AddExam'

const mapStateToProps = (state, ownProps) => {
    return {
        adding: state.admin.adding,
        success: state.admin.success,
        Class: ownProps.location.state.Class
    }
}


const mapDispatchToProps = {
    addExam: addNewExam
}

const InsertExamContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InsertExam)

export default InsertExamContainer