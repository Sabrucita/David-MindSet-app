import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSessions } from '../../redux/sessions/thunks';
import List from './List';
import Modal from '../shared/Modal';
import Preloader from '../shared/Preloader';
import styles from './sessions.module.css';

function Sessions() {
  const dispatch = useDispatch();
  const sessions = useSelector((store) => store.sessions);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const url = process.env.REACT_APP_API;
  const tableHeader = ['Candidate', 'Psychologist', 'Date', 'Action'];

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  const deleteItem = () => {
    fetch(`${url}/sessions/${selectedItem.id}`, {
      method: 'DELETE'
    })
      .then(async (res) => {
        if (res.status === 200) {
          setShowModal(false);
          const sessionsUpdated = sessions.filter((session) => session._id !== selectedItem.id);
          //setSessions(sessionsUpdated);
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
      <Modal
        showModal={showModal}
        type={modalType}
        titleModal={modalTitle}
        content={selectedItem}
        closeModalFn={closeModalFn}
        acceptModalFn={deleteItem}
      />
      <section className={styles.container}>
        <h1 className={styles.mainTitle}>Sessions</h1>
        {sessions.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={sessions.list} header={tableHeader} openModal={openModal} />
            <Link to="/sessions/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD SESSION</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Sessions;
