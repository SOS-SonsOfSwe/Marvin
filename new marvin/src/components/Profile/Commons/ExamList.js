import React from 'react';

const Row = ({degreeCourse, course, typology, date}) => (
    <tr className="clickable-row">
        <td>{degreeCourse}</td>
        <td>{course}</td>
        <td>{typology}</td>
        <td>{date}</td>
    </tr>
);

export default Row;
