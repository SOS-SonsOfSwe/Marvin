import React from 'react';

const Row = ({degreeCourse, didacticActivity, typology, date}) => (
    <tr className="clickable-row">
        <td>{degreeCourse}</td>
        <td>{didacticActivity}</td>
        <td>{typology}</td>
        <td>{date}</td>
    </tr>
);

export default Row;
