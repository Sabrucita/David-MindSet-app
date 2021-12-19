import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSessions, deleteSession } from 'redux/sessions/thunks';
import { sessionsCleanup } from 'redux/sessions/actions';
import List from './List';
import Modal from 'Components/shared/Modal';
import Preloader from 'Components/shared/Preloader';
import styles from './sessions.module.css';

function Sessions() {
  const dispatch = useDispatch();
  const sessions = useSelector((store) => store.sessions);
  const modal = useSelector((store) => store.modal.show);

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(sessionsCleanup());
    };
  }, []);

  const deleteItem = () => {
    dispatch(deleteSession(sessions.selectedElement.id));
  };

  return (
    <>
      {modal && <Modal acceptModalFn={deleteItem} />}
      <section className={styles.container}>
        <h1 className={styles.mainTitle}>Sessions</h1>
        {sessions.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={sessions.list} />
            <Link to="/admin/sessions/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD SESSION</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Sessions;
