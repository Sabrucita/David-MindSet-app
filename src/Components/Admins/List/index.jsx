import ListItem from '../../shared/ListItem';
import { capitalize } from '../../helpers';
import styles from './list.module.css';

function List({ data, header, openModal }) {
  const fillDataTable = (element) => {
    const dataTable = {
      firstName: element.firstName,
      lastName: element.lastName,
      email: element.email,
      password: element.password
    };
    return dataTable;
  };

  const fillDataElement = (element) => {
    const dataElement = {
      id: element._id,
      firstName: element.firstName,
      lastName: element.lastName,
      email: element.email,
      password: element.password
    };
    return dataElement;
  };

  const isMissingData = (element) => {
    return element.id === null || element.id === null;
  };

  return (
    <table className={styles.list}>
      <thead>
        <tr>
          {header.map((element) => {
            return <th key={element}>{element}</th>;
          })}
        </tr>
      </thead>
      {data.length === 0 ? (
        <p>There are no admins.</p>
      ) : (
        <tbody>
          {data.map((element) => {
            return (
              <ListItem
                key={element._id}
                id={element._id}
                dataTable={fillDataTable(element)}
                dataElement={fillDataElement(element)}
                missingData={isMissingData(element)}
                openModal={openModal}
                resource="administrators"
              />
            );
          })}
        </tbody>
      )}
    </table>
  );
}

export default List;
