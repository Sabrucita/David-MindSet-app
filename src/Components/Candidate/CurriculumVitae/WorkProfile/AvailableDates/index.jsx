import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'Components/shared/Modal';
import CalendarDay from './CalendarDay';
import styles from './availableDates.module.css';
import { createSession, updateSession, getAvailableDates } from 'redux/candidate/sessions/thunks';
import Preloader from 'Components/shared/Preloader';

function AvailableDates({ match }) {
  const dispatch = useDispatch();
  const sessions = useSelector((store) => store.candidateProfileessions);
  const dates = useSelector((store) => store.candidateProfileessions.list);
  const currentWeek = useSelector((store) => store.candidateProfileessions.currentWeek);
  const selectedSession = useSelector((store) => store.candidateProfileessions.selectedSession);
  const modal = useSelector((store) => store.modal.show);

  const sessionId = match.params.id;

  useEffect(() => {
    dispatch(getAvailableDates());
  }, [dispatch]);

  const createSessionFn = () => {
    if (sessionId) dispatch(updateSession(sessionId, selectedSession));
    else dispatch(createSession(selectedSession));
  };

  const getAvailableHours = (currentDay) => {
    const availableHours = {};
    dates.map((psychologist) => {
      const hours = psychologist.availability.find((day) => day.number === currentDay.number).hours;
      hours.forEach((hour) => {
        if (!availableHours[hour]) availableHours[hour] = { hour, psychologists: [] };
        availableHours[hour].psychologists.push({
          id: psychologist.id,
          name: psychologist.name
        });
      });
    });
    return <CalendarDay day={currentDay} availableHours={availableHours} />;
  };

  return (
    <>
      {modal && <Modal acceptModalFn={createSessionFn} />}
      <section className={styles.container}>
        <h2 className={styles.title}>Available Dates</h2>
        {sessions.isFetching ? (
          <Preloader />
        ) : (
          <>{currentWeek.map((day) => getAvailableHours(day))}</>
        )}
        <div className={styles.btnContainer}>
          {sessionId ? (
            <Link to="/candidate/profile" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>GO BACK</span>
            </Link>
          ) : (
            <Link to="/candidate/curriculumvitae/work-profile" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>GO BACK</span>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}

export default AvailableDates;
