import styles from './list.module.css';
import ListItem from 'Components/shared/ListItem';

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
                  isActive: element.isActive === true ? 'YES' : 'NO'
                }}
                dataElement={{
                  id: element._id,
                  firstName: element.firstName,
                  lastName: element.lastName,
                  email: element.email,
                  isActive: element.isActive
                }}
                openModal={openModal}
                missingData={element._id === null || element._id === null}
                remove={true}
                edit={true}
                switchActive={true}
                viewMore={true}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default List;
