import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import List from './List';
import Modal from '../shared/Modal';
import Preloader from '../shared/Preloader';
import styles from './positions.module.css';

function Positions() {
  const [positions, setPositions] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const url = process.env.REACT_APP_API;
  const tableHeader = ['Company', 'Start Date', 'End Date', 'Job Description', 'Action'];

  useEffect(() => {
    fetch(`${url}/open-positions`)
      .then((res) => res.json())
      .then((data) => {
        setPositions(data);
        setIsFetching(false);
      })
      .catch((err) => {
        showErrorMsg(err);
      });
  }, []);

  const deleteItem = () => {
    fetch(`${url}/open-positions/${selectedItem.id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          setShowModal(false);
          const positionsUpdated = positions.filter((position) => position._id !== selectedItem.id);
          setPositions(positionsUpdated);
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      })
      .catch((err) => {
        showErrorMsg(err);
      });
  };

  const openModal = (item, type, title) => {
    setSelectedItem(item);
    setModalType(type);
    setModalTitle(title);
    setShowModal(true);
  };

  const closeModalFn = () => {
    setShowModal(false);
  };

  const showErrorMsg = (data) => {
    setModalType('error');
    setModalTitle('Upsss an error has happened');
    setSelectedItem(data);
    setShowModal(true);
  };

  return (
    <>
      <section className={styles.container}>
        <h1 className="mainTitle">Positions</h1>
        {isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={positions} header={tableHeader} openModal={openModal} />
            <Link to="/positions/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD POSITION</span>
            </Link>
          </>
        )}
      </section>
      <Modal
        showModal={showModal}
        type={modalType}
        titleModal={modalTitle}
        content={selectedItem}
        closeModalFn={closeModalFn}
        acceptModalFn={deleteItem}
      />
    </>
  );
}

export default Positions;
