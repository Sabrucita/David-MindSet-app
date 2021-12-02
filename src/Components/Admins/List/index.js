import { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import styles from './list.module.css';

function Admins() {
  const [showModal, setShowModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [lastIdClicked, setLastIdCLicked] = useState('');
  const [lastAction, setLastAction] = useState('');
  const [itemListInfo, setItemListInfo] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => response.json())
      .then((response) => {
        setAdmins(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //MODAL
  const closeModal = () => {
    setShowModal(false);
  };

  //FUNCTION FOR DELETING A COMPANY
  const deleteClick = (id) => {
    fetch(`${process.env.REACT_APP_API}/admins/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (response.status == 204) {
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
      <h2>Companies</h2>
      <div>
        <tr className={styles.title}>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Is active?</th>
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
                <th>{admin.isActive}</th>
                <th className={styles.keypad}>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = `/admins/form?_id=${admin._id}`;
                    }}
                  >
                    EDIT
                  </button>
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
      <button
        className={styles.addButton}
        type="button"
        onClick={() => {
          window.location.href = `/admin/form/new`;
        }}
      >
        ADD ADMIN
      </button>
    </section>
  );
}

export default Admins;
