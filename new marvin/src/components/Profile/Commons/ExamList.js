import React from 'react';

const Row = ({ degree, Sclass, typology, date }) => (
    <tr className="clickable-row">
        <td>{degree}</td>
        <td>{Sclass}</td>
        <td>{typology}</td>
        <td>{date}</td>
    </tr>
);

export default Row;
