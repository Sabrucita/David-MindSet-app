import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSession } from 'redux/candidate/sessions/actions.js';
import { showModal } from 'redux/modal/actions';
import CalendarHour from '../CalendarHour';
import styles from './calendarDay.module.css';

function CalendarDay({ day, availableHours }) {
  const dispatch = useDispatch();
  const [hours, setHours] = useState([]);
  const [showHours, setShowHours] = useState(false);
  const idCandidate = useSelector((store) => store.auth.user._id);

  useEffect(() => {
    const newHours = [];
    for (let i = 0; i < 24; i++) {
      if (availableHours[i]) newHours.push(availableHours[i]);
    }
    setHours(newHours);
  }, []);

  const toggleHour = () => {
    setShowHours(!showHours);
  };

  const createSession = (idPsychologist, hour) => {
    const selectedSession = {
      day,
      data: {
        idCandidate,
        idPsychologist,
        date: `2022-01-${day.number}Z`,
        time: hour
      }
    };
    dispatch(setSelectedSession(selectedSession));
    const sessionDate = { date: selectedSession.data.date, time: selectedSession.data.time };
    dispatch(showModal('session', 'session', sessionDate));
  };

  return (
    <div className={styles.day}>
      <h3 onClick={toggleHour}>
        {day.day} {day.number}
      </h3>
      {showHours ? (
        <ul className={styles.list}>
          {hours.map((hour) => {
            return <CalendarHour key={hour.hour} hour={hour} fn={createSession} />;
          })}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
}

export default CalendarDay;
