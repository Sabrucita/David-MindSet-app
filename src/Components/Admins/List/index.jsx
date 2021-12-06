import styles from './list.module.css';
import ListItem from '../../shared/ListItem';

function List({ header, data, openModal }) {
  return (
    <div className={styles.list}>
      <table>
        <thead>
          <tr>
            {header.map((element) => {
              return <th key={element}>{element}</th>;
            })}
          </tr>
        </thead>
        {data.length === 0 ? (
          <p className={styles.loading}>There are no admins</p>
        ) : (
          <tbody>
            {data.map((element) => {
              return (
                <ListItem
                  key={element._id}
                  id={element._id}
                  dataTable={{
                    firstName: element.firstName,
                    lastName: element.lastName,
                    email: element.email,
                    password: element.password
                  }}
                  dataElement={{
                    id: element._id,
                    firstName: element.firstName,
                    lastName: element.lastName,
                    email: element.email,
                    password: element.password,
                    isActive: element.isActive
                  }}
                  openModal={openModal}
                  missingData={element._id === null || element._id === null}
                  resource="admins"
                />
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}
export default List;
