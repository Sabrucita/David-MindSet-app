import { useDispatch } from 'react-redux';
import ListItem from '../../shared/ListItem';
import { capitalize, formatDate } from '../../helpers';
import { showModal } from '../../../redux/modal/actions';
import styles from './list.module.css';
import { getSelectedSession } from '../../../redux/sessions/actions';

function List({ data }) {
  const dispatch = useDispatch();

  const header = ['Candidate', 'Psychologist', 'Date', 'Action'];

  const fillDataTable = (element) => {
    const dataTable = {
      candidate: element.idCandidate
        ? `${capitalize(element.idCandidate?.firstName)} ${capitalize(
            element.idCandidate?.lastName
          )}`
        : 'This candidate was deleted',
      psychologist: element.idPsychologist
        ? `${capitalize(element.idPsychologist?.firstName)} ${capitalize(
            element.idPsychologist?.lastName
          )}`
        : 'This psychologist was deleted',
      date: formatDate(element.date)
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

  const openModal = (item, type) => {
    dispatch(getSelectedSession(item));
    dispatch(showModal('sessions', type, item));
  };

  return (
    <>
      <table className={styles.list}>
        <thead>
          <tr>
            {header.map((element) => {
              return <th key={element}>{element}</th>;
            })}
          </tr>
        </thead>
        {data.length !== 0 && (
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
        )}
      </table>
      {data.length === 0 && <p className={styles.loading}>There are no sessions.</p>}
    </>
  );
}

export default List;
