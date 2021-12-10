import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSessions, deleteSession } from '../../redux/sessions/thunks';
import List from './List';
import Modal from '../shared/Modal';
import Preloader from '../shared/Preloader';
import styles from './sessions.module.css';
import { hideModal, showDeleteModal } from '../../redux/modal/actions';

function Sessions() {
  const dispatch = useDispatch();
  const sessions = useSelector((store) => store.sessions);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const tableHeader = ['Candidate', 'Psychologist', 'Date', 'Action'];

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  const deleteItem = () => {
    dispatch(deleteSession(selectedItem.id));
    dispatch(hideModal());
    // setShowModal(false);
  };

  const openModal = (item, type, title) => {
    setSelectedItem(item);
    dispatch(showDeleteModal());
    // setModalType(type);
    // setModalTitle(title);
    // setShowModal(true);
  };

  const closeModalFn = () => {
    dispatch(hideModal());
    // setShowModal(false);
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
        // showModal={showModal}
        // type={modalType}
        // titleModal={modalTitle}
        // content={selectedItem}
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
