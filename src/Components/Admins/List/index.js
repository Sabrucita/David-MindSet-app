import { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import styles from './list.module.css';
import { Link } from 'react-router-dom';

function Admins() {
  const [showModal, setShowModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [lastIdClicked, setLastIdCLicked] = useState('');
  const [lastAction, setLastAction] = useState('');
  const [itemListInfo, setItemListInfo] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/administrators`)
      .then((response) => response.json())
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //MODAL
  const closeModal = () => {
    setShowModal(false);
  };

  //Delete an admin
  const deleteClick = (id) => {
    fetch(`${process.env.REACT_APP_API}/administrators/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (response.status == 200) {
          setAdmins(admins.filter((deleteAdmin) => deleteAdmin._id !== id));
        }
      })
      .catch((error) => console.log(error));
  };

  const onConfirmDeleteModal = () => {
    deleteClick(lastIdClicked);
  };

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        closeModal={closeModal}
        onCloseModal={onConfirmDeleteModal}
        itemListInfo={itemListInfo}
        action={lastAction}
      />
      <h2>Admins</h2>
      <div>
        <tr className={styles.title}>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
        {admins.map((admin) => {
          return (
            <tbody className={styles.list} key={admin._id}>
              <tr>
                <th>{admin.firstName}</th>
                <th>{admin.lastName}</th>
                <th>{admin.email}</th>
                <th>{admin.password}</th>
                <th className={styles.keypad}>
                  <Link to={`/admins/form?_id=${admin._id}`}>
                    <button type="button">EDIT</button>
                  </Link>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setLastIdCLicked(admin._id);
                      setLastAction('delete');
                    }}
                    type="button"
                  >
                    DELETE
                  </button>
                  <button
                    onClick={() => {
                      setLastIdCLicked(admin._id);
                      setLastAction('view');
                      setItemListInfo(admin);
                      setShowModal(true);
                    }}
                    type="button"
                  >
                    VIEW MORE
                  </button>
                </th>
              </tr>
            </tbody>
          );
        })}
      </div>
      <Link to="/admins/form">
        <button className={styles.addButton} type="button">
          ADD ADMIN
        </button>
      </Link>
    </section>
  );
}

export default Admins;
