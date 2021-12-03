import styles from './listItem.module.css';
import { Link } from 'react-router-dom';
import { capitalize } from '../../helpers';
import { removeLastChar } from '../../helpers';

function ListItem({ id, dataElement, dataTable, openModal, missingData, resource }) {
  const getDataContent = (data) => {
    let content = [];
    for (let property in data) {
      content.push(<td key={property}>{data[property]}</td>);
    }
    return content;
  };

  const deleteElement = () => {
    const title = `${removeLastChar(capitalize(resource))} Deleted`;
    openModal(dataElement, 'delete', title);
  };

  const viewElement = () => {
    const title = `${removeLastChar(capitalize(resource))} Information: `;
    openModal(dataElement, 'viewMore', title);
  };

  return (
    <tr id={id}>
      {getDataContent(dataTable)}
      <td className={styles.actionBtn}>
        <button onClick={deleteElement}>
          <span className="material-icons-outlined">clear</span>
        </button>
        {!missingData && (
          <Link to={`/${resource}/form/${id}`}>
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
