import React from 'react';

const Row = ({name, surname, badgeNumber, fiscalCode, univocalCode}) => (
    <tr className="clickable-row">
        <td>{name}</td>
        <td>{surname}</td>
        <td>{badgeNumber}</td>
        <td>{fiscalCode}</td>
        <td>{univocalCode}
            <div className="float-right">
                <a href="#">Modify</a> <a href="#">Delete</a>
            </div>
        </td>
    </tr>
);

export default Row;