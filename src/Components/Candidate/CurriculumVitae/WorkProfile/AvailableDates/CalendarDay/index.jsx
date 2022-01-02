import { useState, useEffect } from 'react';

function CalendarDay({ day, availableHours }) {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const newHours = [];
    for (let i = 0; i < 24; i++) {
      if (availableHours[i]) newHours.push(availableHours[i]);
    }
    setHours(newHours);
  }, []);

  return (
    <div>
      <h3>
        {day.day} {day.number}
      </h3>
      <ul>
        {hours.map((hour) => {
          return (
            <li key={hour.hour}>
              {hour.hour}
              <ul>
                {hour.psychologists.map((psychologist) => {
                  return <li key={psychologist.id}>{psychologist.name}</li>;
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CalendarDay;
