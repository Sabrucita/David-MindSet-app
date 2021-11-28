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

  const updateItem = (id) => {
    console.log('update', id);
    localStorage.setItem('operation', 'update');
    localStorage.setItem('id', id);
    window.location.pathname = './sessions/form';
  };

  const deleteItem = (id) => {
    console.log('delete');
    const sessionsUpdated = sessions.filter((session) => session._id !== id);
    fetch(`${url}/sessions/${id}`, {
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
    setSessions(sessionsUpdated);
  };

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
