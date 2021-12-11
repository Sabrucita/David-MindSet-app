import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSessions, deleteSession } from '../../redux/sessions/thunks';
import List from './List';
import Modal from '../shared/Modal';
import Preloader from '../shared/Preloader';
import styles from './sessions.module.css';
import { hideModal, showModal } from '../../redux/modal/actions';
import { sessionsCleanup } from '../../redux/sessions/actions';

function Sessions() {
  const dispatch = useDispatch();
  const sessions = useSelector((store) => store.sessions);
  const modal = useSelector((state) => state.modal.show);

  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(sessionsCleanup());
    };
  }, []);

  const deleteItem = () => {
    dispatch(deleteSession(selectedItem.id));
  };

  const openModal = (item, type) => {
    setSelectedItem(item);
    dispatch(showModal('sessions', type));
  };

  const closeModal = () => {
    dispatch(hideModal());
  };

  return (
    <>
      {modal && <Modal closeModalFn={closeModal} acceptModalFn={deleteItem} />}
      <section className={styles.container}>
        <h1 className={styles.mainTitle}>Sessions</h1>
        {sessions.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={sessions.list} openModal={openModal} />
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
