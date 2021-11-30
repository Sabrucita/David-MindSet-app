import { useState, useEffect } from 'react';
import List from './List';
import Modal from './Modal';
import styles from './positions.module.css';

const url = process.env.REACT_APP_API;

function Positions() {
  const [positions, setPositions] = useState([]);
  const [modalContent, setModalContent] = useState();
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${url}/open-positions`)
      .then((res) => res.json())
      .then((data) => {
        setPositions(data.data);
      });
  }, []);

  const deleteItem = (selectedItem) => {
    fetch(`${url}/open-positions/${selectedItem}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          setShowModal(false);
          const positionsUpdated = positions.filter((position) => position._id !== selectedItem);
          setPositions(positionsUpdated);
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      })
      .catch(() => {
        setShowModal(true);
        setModalType('error');
      });
  };

  const closeModalFn = () => {
    setShowModal(false);
  };

  const addPosition = () => {
    localStorage.setItem('operation', 'create');
    localStorage.setItem('id', '');
    window.location.pathname = './positions/form';
  };

  return (
    <>
      <section className={styles.container}>
        <h2>Positions</h2>
        <List
          positions={positions}
          setPositions={setPositions}
          modalContent={setModalContent}
          setModalType={setModalType}
          setShowModal={setShowModal}
        />
        <button className={styles.createBtn} onClick={addPosition}>
          ADD POSITION
        </button>
      </section>
      <Modal
        showModal={showModal}
        type={modalType}
        content={modalContent}
        acceptModalFn={deleteItem}
        closeModalFn={closeModalFn}
      />
    </>
  );
}

export default Positions;
