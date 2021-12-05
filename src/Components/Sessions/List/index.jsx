import ListItem from '../../shared/ListItem';
import { capitalize } from '../../helpers';
import styles from './list.module.css';

function List({ data, header, openModal }) {
  const fillDataTable = (element) => {
    const dataTable = {
      candidate: element.idCandidate
        ? `${capitalize(element.idCandidate.firstName)} ${capitalize(element.idCandidate.lastName)}`
        : 'This candidate was deleted',
      psychologist: element.idPsychologist
        ? `${capitalize(element.idPsychologist.firstName)} ${capitalize(
            element.idPsychologist.lastName
          )}`
        : 'This psychologist was deleted',
      date: `${element.date.substr(0, 10)} ${element.date.substr(11, 5)}`
    };
    return dataTable;
  };

  const fillDataElement = (element) => {
    const dataElement = {
      id: element._id,
      idCandidate: element.idCandidate ? element.idCandidate._id : 'Deleted',
      candidate: element.idCandidate
        ? `${capitalize(element.idCandidate.firstName)} ${capitalize(element.idCandidate.lastName)}`
        : 'Deleted',
      idPsychologist: element.idPsychologist ? element.idPsychologist._id : 'Deleted',
      psychologist: element.idPsychologist
        ? `${capitalize(element.idPsychologist.firstName)} ${capitalize(
            element.idPsychologist.lastName
          )}`
        : 'Deleted',
      date: element.date
    };
    return dataElement;
  };

  const isMissingData = (element) => {
    return element.idCandidate === null || element.idOpenPosition === null;
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
              resource="sessions"
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default List;
