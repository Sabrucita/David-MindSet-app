import styles from './listitem.module.css';
import { capitalize } from '../helpers';

function ListItem({ position, updateItem, deleteItem, viewItem }) {
  const deleteThis = () => {
    deleteItem(position._id);
  };

  const updateThis = () => {
    updateItem(position._id);
  };

  const viewThis = () => {
    viewItem(position._id);
  };

  return (
    <tr>
      <td>{`${capitalize(position.idCompany.name)}
      )}`}</td>
      <td>{`${position.startDate}`}</td>
      <td>{`${position.endDate}`}</td>
      <td>{`${position.jobDescription}`}</td>
      <td className={styles.actionBtn}>
        <button className="edit-btn" onClick={updateThis}>
          <span className="material-icons-outlined">edit</span>
        </button>
        <button className="delete-btn" onClick={deleteThis}>
          <span className="material-icons-outlined">clear</span>
        </button>
        <button className="view-btn" onClick={viewThis}>
          <span className="material-icons-outlined">search</span>
        </button>
      </td>
    </tr>
  );
}

export default ListItem;
