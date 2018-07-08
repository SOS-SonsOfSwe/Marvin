import React from 'react';

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
            <main className='container' onSubmit={this.handleDelete}>
                <div className="pure-u-1-1">
                    <h1>Delete degree</h1>
                    <p>Are you sure you want to delete this degree? Once you delete it, you can't go back.</p>
                    <form className="pure-form pure-form-stacked delete-form">
                        <fieldset className="delete-fieldset">
                            <p>Academic year: {this.props.year}</p>
                            <p>Degree: {this.props.degreeUnicode}</p>
                            <div className="delete-div-buttons">
                                <button>Delete</button>
                                <button>Cancel</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default DeleteDegree;