import React from 'react';

// var arrayData = [
//     { year: "2018" },
// ]

// const Row = ({ year }) => (
//     <div>
//         <p>Acaddemic year: {year}</p>
//     </div>
// );

class DeleteAcademicYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: this.props.year
        }
        this.handleDelete = this.handleDelete.bind(this)

    }
    // componentWillMount() {
    //     if (!this.props.year) {

    //         browserHistory.replace(null, '/profile/academic-years')
    //     }
    //     else {
    //         this.handleDelete = this.handleDelete.bind(this)
    //     }
    // }

    handleDelete(event) {
        event.preventDefault()
        this.props.deleteAcademicYear(this.props.year)
    }
    render() {
        return (
            <main className='container' onSubmit={this.handleDelete}>
                <div className="pure-u-1-1">
                    <h1>Delete academic year</h1>
                    <p>Are you sure you want to delete this academic year? Once you delete it, you can't go back.</p>
                    <form className="pure-form pure-form-stacked delete-form">
                        <fieldset className="delete-fieldset">
                            <p>Acaddemic year: {this.state.year}</p>
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

export default DeleteAcademicYear;