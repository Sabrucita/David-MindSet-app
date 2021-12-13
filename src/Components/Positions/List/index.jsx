import { useDispatch } from 'react-redux';
import { capitalize, formatDate } from '../../helpers';
import { getSelectedPosition } from '../../../redux/positions/actions';
import { showModal } from '../../../redux/modal/actions';
import ListItem from '../../shared/ListItem';
import styles from './list.module.css';

function List({ data }) {
  const dispatch = useDispatch();

  const header = ['Company', 'Start Date', 'End Date', 'Job Description', 'Action'];

  const fillDataTable = (element) => {
    const dataTable = {
      company: element.idCompany ? capitalize(element.idCompany.name) : 'This company was deleted',
      startDate: formatDate(element.startDate, false),
      endDate: formatDate(element.endDate, false),
      jobDescription: element.jobDescription
    };
    return dataTable;
  };

  const fillDataElement = (element) => {
    const dataElement = {
      id: element._id,
      idCompany: element.idCompany ? element.idCompany._id : 'Deleted',
      company: element.idCompany ? capitalize(element.idCompany.name) : 'Deleted',
      startDate: element.startDate,
      endDate: element.endDate,
      jobDescription: element.jobDescription
    };
    return dataElement;
  };

  const isMissingData = (element) => {
    return element.idCandidate === null || element.idOpenPosition === null;
  };

  const openModal = (item, type) => {
    dispatch(getSelectedPosition(item));
    dispatch(showModal('positions', type, item));
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
                  resource="positions"
                />
              );
            })}
          </tbody>
        )}
      </table>
      {data.length === 0 && <p className={styles.loading}>There are no open positions.</p>}
    </>
  );
}

export default List;
