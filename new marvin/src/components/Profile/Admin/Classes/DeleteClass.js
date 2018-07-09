import React from 'react';
import { Link } from 'react-router'

class DeleteClass extends React.Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(event) {
        event.preventDefault()
        this.props.deleteClass(this.props.degreeUnicode, this.props.classUnicode)
    }

    render() {

        return (
            <main className='container'>
                <div className="pure-u-1-1">
                    <h1>Delete Class</h1>
                    <p>Are you sure you want to delete this Class? Once you delete it, you can't go back.</p>
                    <form className="pure-form pure-form-stacked delete-form" onSubmit={this.handleDelete}>
                        <fieldset className="delete-fieldset">
                            <p>Degree course: {this.props.degreeUnicode}</p>
                            <p>Class: {this.props.classUnicode}</p>
                            <div className="delete-div-buttons">
                                <input type="submit" value="Delete" />
                                <button className="button_cancel">
                                    <Link to='/profile/classes'>Cancel</Link>
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default DeleteClass;