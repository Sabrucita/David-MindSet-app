import { useState, useEffect } from 'react';
import ListItem from '../ListItem';
import styles from './list.module.css';
const url = process.env.REACT_APP_API;

function List() {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    fetch(`${url}/open-positions`)
      .then((res) => res.json())
      .then((data) => {
        setPositions(data.data);
      });
  }, []);

  const updateItem = (id) => {
    console.log('update', id);
    localStorage.setItem('operation', 'update');
    localStorage.setItem('id', id);
    window.location.pathname = './positions/form';
  };

  const deleteItem = (id) => {
    console.log('delete');
    const positionsUpdated = positions.filter((position) => position._id !== id);
    fetch(`${url}/open-positions/${id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        const data = await res.json();
        console.log('deleted', data);
        //requestSuccessful(data, 'deleted');
      })
      .catch((err) => {
        console.log('error', err);
        //displayError(err);
      });
    setPositions(positionsUpdated);
  };

  return (
    <table className={styles.list}>
      <thead>
        <tr>
          <th>Company</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Job Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((position) => {
          return (
            <ListItem
              key={position._id}
              position={position}
              updateItem={updateItem}
              deleteItem={deleteItem}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default List;
