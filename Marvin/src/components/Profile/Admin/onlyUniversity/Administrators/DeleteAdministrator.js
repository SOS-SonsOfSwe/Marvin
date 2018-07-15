import React from 'react';
import { Link } from 'react-router'

// var arrayData = [
//     { name: "Mario", surname: "Rossi", badgeNumber: "3547385", fiscalCode: "12g324hgfd4cf3", univocalCode: "124356456" }
// ]

// const Row = ({ name, surname, badgeNumber, fiscalCode, univocalCode }) => (
//     <div>
//         <p>Name: {name}</p>
//         <p>Surname: {surname}</p>
//         <p>Badge number: {badgeNumber}</p>
//         <p>Fiscal code: {fiscalCode}</p>
//         <p>Univocal code: {univocalCode}</p>
//     </div>
// );

class DeleteAdministrator extends React.Component {
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
                    <h1>Delete administrator</h1>
                    <p>Are you sure you want to delete this administrator? Once you delete it, you can't go back.</p>
                    <form className="pure-form pure-form-stacked delete-form">
                        <fieldset className="delete-fieldset">
                            <p>Badge number: {this.state.badgeNumber}</p>
                            <p>Fiscal code: {this.state.FC}</p>
                            <div className="div-buttons delete-but">
                                <input type="submit" value="Delete" />
                                <button className="button_cancel">
                                    <Link to='/profile/administrators'>Cancel</Link>
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </main>
        )
    }
}

export default DeleteAdministrator;