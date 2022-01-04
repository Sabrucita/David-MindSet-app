import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'Components/shared/Modal';
import CalendarDay from './CalendarDay';
import styles from './availableDates.module.css';
import { createSession, getAvailableDates } from 'redux/candidate/sessions/thunks';

function AvailableDates() {
  const dispatch = useDispatch();
  const dates = useSelector((store) => store.candidateSessions.list);
  const currentWeek = useSelector((store) => store.candidateSessions.currentWeek);
  const selectedSession = useSelector((store) => store.candidateSessions.selectedSession);
  const modal = useSelector((store) => store.modal.show);

  useEffect(() => {
    dispatch(getAvailableDates());
  }, [dispatch]);

  const createSessionFn = () => {
    dispatch(createSession(selectedSession));
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
        {currentWeek.map((day) => getAvailableHours(day))}
        <div className={styles.btnContainer}>
          <Link to="/candidate/curriculumvitae/work-profile" className={styles.buttonAdd}>
            <span className={styles.buttonGreen}>GO BACK</span>
          </Link>
        </div>
      </section>
    </>
  );
}

export default AvailableDates;
