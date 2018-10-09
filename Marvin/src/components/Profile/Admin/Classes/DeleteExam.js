import React from 'react';
import { Link } from 'react-router'

class DeleteExam extends React.Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(event) {
        event.preventDefault()
        this.props.deleteExam(this.props.classUnicode, this.props.examUnicode)
    }

    render() {

        return (
            <main className='container'>
                <div className="pure-u-1-1">
                    <h1>Delete exam</h1>
                    <p>Are you sure you want to delete this exam? Once you delete it, you can't go back.</p>
                    <form className="pure-form pure-form-stacked delete-form" onSubmit={this.handleDelete}>
                        <fieldset className="delete-fieldset">
                            <p>Class: {this.props.classUnicode}</p>
                            <p>Exam unicode: {this.props.examUnicode}</p>
                            <div className="div-buttons delete-but">
                                <input type="submit" value="Delete" />
                                <Link to='/profile/exams'>
                                    <button className="button_cancel">
                                        Cancel
                                </button>
                                </Link>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default DeleteExam;