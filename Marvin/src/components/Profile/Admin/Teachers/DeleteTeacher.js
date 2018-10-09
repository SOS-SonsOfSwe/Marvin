import React from 'react';
import { Link } from 'react-router'

class DeleteTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            badgeNumber: this.props.badgeNumber,
            FC: this.props.FC
        }
        this.handleDelete = this.handleDelete.bind(this)

    }
    handleDelete(event) {
        event.preventDefault()
        this.props.deleteUser(this.props.badgeNumber)
    }
    render() {
        return (
            <main className='container' onSubmit={this.handleDelete}>
                <div className="pure-u-1-1">
                    <h1>Delete teacher</h1>
                    <p>Are you sure you want to delete this teacher? Once you delete it, you can't go back.</p>
                    <form className="pure-form pure-form-stacked delete-form">
                        <fieldset className="delete-fieldset">
                            <p>Badge number: {this.state.badgeNumber}</p>
                            <p>Fiscal code: {this.state.FC}</p>
                            <div className="div-buttons delete-but">
                                <input type="submit" value="Delete" />
                                <Link to='/profile/teachers'>
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

export default DeleteTeacher;