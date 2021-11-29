import styles from './admins.module.css';
import React, { useState, useEffect } from 'react';

//Function: Show all candidates
function Admins() {
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setAdmins(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Function: Delete a candidate
  const onClick = (id) => {
    fetch(`${process.env.REACT_APP_API}/admins/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setAdmins(admins.filter((deleteAdmin) => deleteAdmin._id !== id));
        }
      })
      .catch((error) => console.log(error));
  };
/*
  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <div>
        {admins.map((admins) => {
          return (
            <div key={admins._id}>
              <p>{admins.first_name}</p>
              <p>{admins.last_name}</p>
              <p>{admins.email}</p>
              <p>{admins.password}</p>
              <p>{admins.isActive}</p>
              <button
                type="button"
                onClick={() => {
                  console.log('Admins site');
                  window.location.href = `/admins/form?_id=${admins._id}`;
                }}
              >
                EDIT
              </button>
              <button type="button">DELETE</button>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => {
          window.location.href = `/admins/form/new`;
        }}
      >
        ADD ADMIN
      </button>
    </section>
  );
}
*/
return (
  <section className={styles.container}>
    <h2>Admins</h2>
    <div>
      <table className={styles.list}>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => {
            return (
              <tr
                onDoubleClick={() => {
                  window.location.href = `/admins/list?_id=${admin._id}`;
                }}
                key={admin._id}
              >
                <td>{admin.firstName}</td>
                <td>{admin.lastName}</td>
                <td>{admin.email}</td>
                <td>{admin.password}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = `/admins/form?_id=${admin._id}`;
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClick(admin._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className={styles.button}
        type="button"
        onClick={() => {
          window.location.href = `/admin/form`;
        }}
      >
        Add
      </button>
    </div>
  </section>
);
}

export default Admins;
