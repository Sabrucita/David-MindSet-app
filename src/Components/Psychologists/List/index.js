import { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import styles from './list.module.css';

function Psychologists() {
  const [showModal, setShowModal] = useState(false);
  const [psychologists, setPsychologists] = useState([]);
  const [lastIdClicked, setLastIdCLicked] = useState('');
  const [lastAction, setLastAction] = useState('');
  const [itemListInfo, setItemListInfo] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => response.json())
      .then((response) => {
        setPsychologists(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //MODAL
  const closeModal = () => {
    setShowModal(false);
  };

  //Delete a psycho
  const deleteClick = (id) => {
    fetch(`${process.env.REACT_APP_API}/psychologists/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (response.status == 204) {
          setPsychologists(
            psychologists.filter((deletePsychologist) => deletePsychologist._id !== id)
          );
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
      <h2>Psychologists</h2>
      <div>
        <tr className={styles.title}>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Turns</th>
          <th>Actions</th>
        </tr>
        {psychologists.map((psychologist) => {
          return (
            <tbody className={styles.list} key={psychologist._id}>
              <tr>
                <th>{psychologist.firstName}</th>
                <th>{psychologist.lastName}</th>
                <th>{psychologist.email}</th>
                <th>{psychologist.password}</th>
                <th>{psychologist.turns}</th>
                <th className={styles.keypad}>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = `/psychologists/form?_id=${psychologist._id}`;
                    }}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setLastIdCLicked(psychologist._id);
                      setLastAction('delete');
                    }}
                    type="button"
                  >
                    DELETE
                  </button>
                  <button
                    onClick={() => {
                      setLastIdCLicked(psychologist._id);
                      setLastAction('view');
                      setItemListInfo(psychologist);
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
          window.location.href = `/psychologists/form/new`;
        }}
      >
        ADD PSYCHOLOGIST
      </button>
    </section>
  );
}

export default Psychologists;
