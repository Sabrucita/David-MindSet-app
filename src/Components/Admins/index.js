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

  //FUNCTION FOR DELETING AN ADMINISTRATOR
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
      <h2>Admins</h2>
      <div>
        {admins.map((admin) => {
          return (
            <ul
              onDoubleClick={() => {
                window.location.href = `/admins/listitem?_id=${admin._id}`;
              }}
              className={styles.ulAdmins}
              key={admin._id}
            >
              <li>{admin.firstName}</li>
              <li>{admin.lastName}</li>
              <li>{admin.email}</li>
              <li>{admin.password}</li>
              <li>{admin.isActive}</li>
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
            </ul>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => {
          window.location.href = `/admins/form/new`;
        }}
      >
        ADD COMPANY
      </button>
    </section>
  );
}

export default Admins;
