import styles from './listitem.module.css';
import { capitalize } from '../helpers';

function ListItem({ position }) {
  return (
    <tr>
      <td>{`${capitalize(position.idCompany.name)}
      )}`}</td>
      <td>{`${position.startDate}`}</td>
      <td>{`${position.endDate}`}</td>
      <td>{`${position.jobDescription}`}</td>
      <td className={styles.actionBtn}>
        <button className="edit-btn">
          <span className="material-icons-outlined">edit</span>
        </button>
        <button className="delete-btn">
          <span className="material-icons-outlined">clear</span>
        </button>
      </td>
    </tr>
  );
}

export default ListItem;
