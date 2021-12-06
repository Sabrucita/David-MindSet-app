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
          <p className={styles.loading}>There are no Profiles</p>
        ) : (
          <tbody>
            {data.map((element) => {
              return (
                <ListItem
                  key={element._id}
                  id={element._id}
                  dataTable={{
                    nameProfile: element.name
                  }}
                  dataElement={{
                    id: element._id,
                    name: element.name
                  }}
                  openModal={openModal}
                  resource="profiles"
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
