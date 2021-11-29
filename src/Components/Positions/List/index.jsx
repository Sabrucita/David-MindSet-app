import { useState, useEffect } from 'react';
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

  return (
    <table className={styles.list}>
      <thead>
        <tr>
          <th>Candidate</th>
          <th>Psychologist</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((session) => {
          return (
            <ListItem
              key={session._id}
              session={session}
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
