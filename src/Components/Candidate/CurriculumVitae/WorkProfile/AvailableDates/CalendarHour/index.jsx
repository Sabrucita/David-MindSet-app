import { useState } from 'react';
import styles from './calendarHour.module.css';

function CalendarHour({ hour, fn }) {
  const [showPsychologists, setShowPsychologists] = useState(false);

  const togglePsychologists = (e) => {
    e.stopPropagation();
    setShowPsychologists(!showPsychologists);
  };

  return (
    <li className={styles.hour}>
      <h4 onClick={togglePsychologists}>{hour.hour}:00</h4>
      {showPsychologists ? (
        <ul className={styles.list}>
          {hour.psychologists.map((psychologist) => {
            return (
              <li key={psychologist.id} onClick={() => fn(psychologist.id, hour.hour)}>
                {psychologist.name}
              </li>
            );
          })}
        </ul>
      ) : (
        ''
      )}
    </li>
  );
}

export default CalendarHour;
