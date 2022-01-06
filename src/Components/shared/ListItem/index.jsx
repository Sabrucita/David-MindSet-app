import styles from './listItem.module.css';
import { Link, useRouteMatch } from 'react-router-dom';

function ListItem({
  id,
  dataElement,
  dataTable,
  openModal,
  missingData,
  switchActive,
  remove,
  edit,
  viewMore
}) {
  const { url } = useRouteMatch();

  const getDataContent = (data) => {
    let content = [];
    for (let property in data) {
      content.push(
        <td className={dataElement.isActive ? '' : styles.notActivate} key={property}>
          {data[property]}
        </td>
      );
    }
    return content;
  };

  const deleteElement = () => {
    openModal(dataElement, 'delete');
  };

  const changeIsNotActive = () => {
    openModal(dataElement, 'changeIsNotActive');
  };

  const changeIsActive = () => {
    openModal(dataElement, 'changeIsActive');
  };

  const viewElement = () => {
    openModal(dataElement, 'viewMore');
  };

  return (
    <tr id={id}>
      {getDataContent(dataTable)}
      <td className={dataElement.isActive ? styles.actionBtn : styles.actionBtnNotActivate}>
        {switchActive ? (
          <>
            {dataElement.isActive ? (
              <button onClick={changeIsNotActive}>
                <span className="material-icons-outlined">visibility_off</span>
              </button>
            ) : (
              <button onClick={changeIsActive}>
                <span className="material-icons-outlined">visibility</span>
              </button>
            )}
          </>
        ) : (
          ''
        )}
        {edit && !missingData ? (
          <Link to={`${url}/form/${id}`}>
            <button className="edit-btn">
              <span className="material-icons-outlined">edit</span>
            </button>
          </Link>
        ) : (
          ''
        )}
        {viewMore ? (
          <Link to={`${url}/form/${id}`}>
            <button className="view-btn" onClick={viewElement}>
              <span className="material-icons-outlined">search</span>
            </button>
          </Link>
        ) : (
          ''
        )}
        {remove ? (
          <button onClick={deleteElement}>
            <span className="material-icons-outlined">clear</span>
          </button>
        ) : (
          ''
        )}
      </td>
    </tr>
  );
}

export default ListItem;
