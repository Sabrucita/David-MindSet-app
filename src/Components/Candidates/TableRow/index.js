import React from 'react';

const TableRow = (el) => {
  return (
    <tr>
      <td>{el.firstName}</td>
      <td>{el.lastName}</td>
      <td>{el.email}</td>
      <td>{el.password}</td>
      <td>{el.phone}</td>
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  );
};

export default TableRow;
