import styles from './listitem.module.css';
import { capitalize } from '../../helpers';

function ListItem({ session, updateItem, deleteItem, viewItem }) {
  const deleteThis = () => {
    deleteItem(session._id);
  };

  const updateThis = () => {
    updateItem(session._id);
  };

  const viewThis = () => {
    viewItem(session._id);
  };

  return (
    <tr>
      <td>{`${capitalize(session.idCandidate.firstName)} ${capitalize(
        session.idCandidate.lastName
      )}`}</td>
      <td>{`${capitalize(session.idPsychologists.firstName)} ${capitalize(
        session.idPsychologists.lastName
      )}`}</td>
      <td>{`${session.date}`}</td>
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
