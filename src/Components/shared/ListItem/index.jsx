import styles from './listItem.module.css';
import { Link } from 'react-router-dom';
import { capitalize } from '../../helpers';
import { removeLastChar } from '../../helpers';
import { fixCompaniesTitle } from '../../helpers';

function ListItem({ id, dataElement, dataTable, openModal, missingData, resource }) {
  const getDataContent = (data) => {
    let content = [];
    for (let property in data) {
      content.push(<td key={property}>{data[property]}</td>);
    }
    return content;
  };

  const deleteElement = () => {
    if (resource === 'companies') {
      const title = `Are you sure that you want to delete this ${fixCompaniesTitle(
        capitalize(resource)
      )}?`;
      openModal(dataElement, 'delete', title);
    } else {
      const title = `Are you sure that you want to delete this ${removeLastChar(
        capitalize(resource)
      )}?`;
      openModal(dataElement, 'delete', title);
    }
  };

  const viewElement = () => {
    if (resource === 'companies') {
      const title = `${fixCompaniesTitle(capitalize(resource))} Information: `;
      openModal(dataElement, 'viewMore', title);
    } else {
      const title = `${removeLastChar(capitalize(resource))} Information: `;
      openModal(dataElement, 'viewMore', title);
    }
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
