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
          <p className={styles.loading}>There are no applications</p>
        ) : (
          <tbody>
            {data.map((element) => {
              return (
                <ListItem
                  key={element._id}
                  id={element._id}
                  dataTable={{
                    name: element.idCandidate
                      ? `${element.idCandidate.firstName} ${element.idCandidate.lastName}`
                      : 'This candidate was deleted',
                    position: element.idOpenPosition
                      ? element.idOpenPosition.jobDescription
                      : 'This position was deleted',
                    status: element.status ? 'Active' : 'Close'
                  }}
                  dataElement={{
                    id: element._id,
                    idCandidate: element.idCandidate ? element.idCandidate._id : 'Deleted',
                    name: element.idCandidate
                      ? `${element.idCandidate.firstName} ${element.idCandidate.lastName}`
                      : 'Deleted',
                    idPosition: element.idOpenPosition ? element.idOpenPosition._id : 'Deleted',
                    position: element.idOpenPosition
                      ? element.idOpenPosition.jobDescription
                      : 'Deleted',
                    status: element.status
                  }}
                  openModal={openModal}
                  missingData={element.idCandidate === null || element.idOpenPosition === null}
                  resource="applications"
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
