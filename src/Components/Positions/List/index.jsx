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
          return <ListItem key={position._id} position={position} />;
        })}
      </tbody>
    </table>
  );
}

export default List;
