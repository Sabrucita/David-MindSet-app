import styles from './list.module.css';
import ListItem from 'Components/shared/ListItem';
import { formatDate } from 'helpers';

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
          <p className={styles.loading}>There are no interviews</p>
        ) : (
          <tbody>
            {data.map((element) => {
              return (
                <ListItem
                  key={element._id}
                  id={element._id}
                  dataTable={{
                    company: element.idCompany
                      ? element.idCompany.name
                      : 'This company was deleted',
                    candidate: element.idCandidate
                      ? `${element.idCandidate.firstName} ${element.idCandidate.lastName}`
                      : 'This candidate was Deleted',
                    date: formatDate(element.date),
                    status: element.status ? 'Active' : 'Close'
                  }}
                  dataElement={{
                    id: element._id,
                    idCandidate: element.idCandidate ? element.idCandidate._id : 'Deleted',
                    nameCandidate: element.idCandidate
                      ? `${element.idCandidate.firstName} ${element.idCandidate.lastName}`
                      : 'Deleted',
                    idCompany: element.idCompany ? element.idCompany._id : 'Deleted',
                    nameCompany: element.idCompany ? element.idCompany.name : 'Deleted',
                    date: formatDate(element.date),
                    status: element.status
                  }}
                  openModal={openModal}
                  missingData={element.idCandidate === null || element.idCompany === null}
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
