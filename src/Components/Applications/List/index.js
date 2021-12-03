import styles from './list.module.css';
import ListItem from '../../shared/ListItem';

function List(props) {
  return (
    <div className={styles.list}>
      <table>
        <thead>
          <tr>
            {props.header.map((element) => {
              return <th key={element}>{element}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.map((element) => {
            return (
              <ListItem
                key={element._id}
                id={element._id}
                dataTable={{
                  name: `${element.idCandidate.firstName} ${element.idCandidate.lastName}`,
                  position: element.idOpenPosition.jobDescription,
                  status: element.isActive
                }}
                dataElement={{
                  id: element._id,
                  name: element.idCandidate.firstName,
                  position: element.idOpenPosition.jobDescription,
                  status: element.isActive
                }}
                openModal={props.openModal}
                missingData={element.idCandidate === null || element.idPosition === null}
                resource="applications"
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default List;
