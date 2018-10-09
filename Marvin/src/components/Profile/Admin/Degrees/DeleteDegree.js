import React from 'react';
import { Link } from 'react-router'


// var arrayData = [
//     { year: "2018", degree: "informatica" },
// ]



class DeleteDegree extends React.Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this)

    }
    handleDelete(event) {
        event.preventDefault()
        this.props.deleteDegree(this.props.degreeUnicode, this.props.year)
    }
    render() {
        return (
            <main className='container'>
                <div className="pure-u-1-1">
                    <h1>Delete degree</h1>
                    <p>Are you sure you want to delete this degree? Once you delete it, you can't go back.</p>
                    <form className="pure-form pure-form-stacked delete-form" onSubmit={this.handleDelete}>
                        <fieldset className="delete-fieldset">
                            <p>Academic year: {this.props.year}</p>
                            <p>Degree: {this.props.degreeUnicode}</p>
                            <div className="div-buttons delete-but">
                                <input type="submit" value="Delete" />
                                <Link to='/profile/degrees'>
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

export default DeleteDegree;