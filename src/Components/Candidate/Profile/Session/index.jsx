import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSession, deleteSession } from 'redux/candidate/sessions/thunks';
import { showModal } from 'redux/modal/actions';
import Modal from 'Components/shared/Modal';
import styles from './session.module.css';

function Session() {
  const dispatch = useDispatch();
  const scheduledSession = useSelector((store) => store.candidateProfileessions.scheduledSession);
  const modal = useSelector((store) => store.modal.show);
  const [selectedSession, setSelectedSession] = useState({});
  const candidateId = useSelector((store) => store.auth.user._id);

  useEffect(() => {
    dispatch(getSession(candidateId));
  }, [dispatch]);

  const openModal = (session) => {
    dispatch(showModal('sessions', 'delete', session));
    setSelectedSession(session);
  };

  const deleteItem = () => {
    dispatch(deleteSession(selectedSession._id));
  };

  return (
    <>
      {modal && <Modal acceptModalFn={deleteItem} />}
      <h2 className={styles.title}>Upcoming session:</h2>
      <>
        <div className={styles.container}>
          {scheduledSession.date ? (
            <div className={styles.sessionContainer}>
              <ul>
                <li className={styles.sessionItem}>
                  <span>Date:</span>
                  <span>{scheduledSession.date?.substr(0, 10)}</span>
                </li>
                <li className={styles.sessionItem}>
                  <span>Time:</span>
                  <span>{scheduledSession.time}:00</span>
                </li>
                <li className={styles.sessionItem}>
                  <span>Psychologist:</span>
                  <span>{`${scheduledSession.idPsychologist?.firstName} ${scheduledSession.idPsychologist?.lastName}`}</span>
                </li>
              </ul>
              <div className={styles.actions}>
                <Link
                  to={`/candidate/curriculumvitae/work-profile/available-dates/${scheduledSession._id}`}
                >
                  <button>
                    <span className="material-icons-outlined">edit</span>
                  </button>
                </Link>
                <button onClick={() => openModal(scheduledSession)}>
                  <span className="material-icons-outlined">clear</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <p>
                There is not a scheduled session yet. You need yo have a session with a psychologist
                to be able to access job interviews.
              </p>
              <Link
                to={`/candidate/curriculumvitae/work-profile/available-dates`}
                className={styles.addMore}
              >
                <span>Schedule a session!</span>
              </Link>
            </>
          )}
        </div>
      </>
    </>
  );
}

export default Session;
