import { useState, useEffect } from 'react';
import ListItem from '../ListItem';
import styles from './list.module.css';
const url = process.env.REACT_APP_API;

function List() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch(`${url}/sessions`)
      .then((res) => res.json())
      .then((data) => {
        setSessions(data.data);
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
        {sessions.map((session) => {
          return <ListItem key={session._id} session={session} />;
        })}
      </tbody>
    </table>
  );
}

export default List;
