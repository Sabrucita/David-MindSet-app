import styles from './listDayItem.module.css';

function ListDayItem({ title, startTime, endTime }) {
  return (
    <tr>
      <td>{title}</td>
      {startTime && endTime ? (
        <>
          <td>{startTime}:00 hs</td>
          <td>{endTime}:00 hs</td>
        </>
      ) : (
        <>
          <td colSpan={2}>Not Available</td>
        </>
      )}
    </tr>
  );
}

export default ListDayItem;
