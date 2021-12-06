import ListItem from '../../shared/ListItem';
import { capitalize } from '../../helpers';
import styles from './list.module.css';

function List({ data, header, openModal }) {
  const fillDataTable = (element) => {
    const dataTable = {
      company: element.idCompany ? capitalize(element.idCompany.name) : 'This company was deleted',
      startDate: `${element.startDate?.substr(0, 10)} ${element.startDate?.substr(11, 5)}`,
      endDate: `${element.endDate?.substr(0, 10)} ${element.endDate?.substr(11, 5)}`,
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
        <p>There are no open positions.</p>
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
                resource="positions"
              />
            );
          })}
        </tbody>
      )}
    </table>
  );
}

export default List;
