import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { showModal } from 'redux/modal/actions';
import Modal from 'Components/shared/Modal';
import CalendarDay from './CalendarDay';
import styles from './availableDates.module.css';
import { getAvailableDates } from 'redux/candidate/sessions/thunks';

function AvailableDates({ history }) {
  const dispatch = useDispatch();
  const dates = useSelector((store) => store.candidateSessions.list);
  const currentWeek = useSelector((store) => store.candidateSessions.currentWeek);
  const modal = useSelector((store) => store.modal.show);

  useEffect(() => {
    dispatch(getAvailableDates());
  }, [dispatch]);

  const openModal = () => {
    dispatch(showModal('experiences', 'delete'));
  };

  const goToProfile = () => {
    history.push('/candidate/home');
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
      {modal && <Modal acceptModalFn={goToProfile} />}
      <section className={styles.container}>
        <h2 className={styles.title}>Available Dates</h2>
        {console.log(dates)}
        {currentWeek.map((day) => getAvailableHours(day))}
        <div className={styles.btnContainer}>
          <Link to="/candidate/curriculumvitae/work-profile" className={styles.buttonAdd}>
            <span className={styles.buttonGreen}>GO BACK</span>
          </Link>
          <button className={styles.buttonAdd} onClick={openModal}>
            <span className={styles.buttonGreen}>SAVE</span>
          </button>
        </div>
      </section>
    </>
  );
}

export default AvailableDates;
