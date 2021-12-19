import styles from './listItem.module.css';
import { Link, useRouteMatch } from 'react-router-dom';

function ListItem({ id, dataElement, dataTable, openModal, missingData }) {
  const { url } = useRouteMatch();

  const getDataContent = (data) => {
    let content = [];
    for (let property in data) {
      content.push(<td key={property}>{data[property]}</td>);
    }
    return content;
  };

  const deleteElement = () => {
    openModal(dataElement, 'delete');
  };

  const viewElement = () => {
    openModal(dataElement, 'viewMore');
  };

  return (
    <tr id={id}>
      {getDataContent(dataTable)}
      <td className={styles.actionBtn}>
        <button onClick={deleteElement}>
          <span className="material-icons-outlined">clear</span>
        </button>
        {!missingData && (
          <Link to={`${url}/form/${id}`}>
            <button className="edit-btn">
              <span className="material-icons-outlined">edit</span>
            </button>
          </Link>
        )}
        <button className="view-btn" onClick={viewElement}>
          <span className="material-icons-outlined">search</span>
        </button>
      </td>
    </tr>
  );
}

export default ListItem;
