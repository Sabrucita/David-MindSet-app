import styles from './itemList.module.css';

function ItemList(props) {
  let id = props.dataApp._id;
  let isActive = props.dataApp.isActive;
  let idCandidate = props.dataApp.idCandidate.firstName;
  let firstName = props.dataApp.idCandidate.firstName;
  let lastName = props.dataApp.idCandidate.lastName;
  let idOpenPosition = props.dataApp.idOpenPosition._id;
  let jobDescription = props.dataApp.idOpenPosition.jobDescription;

  let status = isActive === true ? 'Active' : 'Close';
  let names = `${firstName} ${lastName}`;

  const dataDelete = {
    id: id,
    name: names,
    position: jobDescription,
    status: status
  };
  const dataViewMore = {
    id: props.id,
    idCandidate: idCandidate,
    name: props.name,
    idOpenPosition: idOpenPosition,
    jobDescription: jobDescription,
    status: status
  };

  return (
    <tr id={id}>
      <td>{names}</td>
      <td>{jobDescription}</td>
      <td>{status}</td>
      <td className={styles.keypad}>
        <button onClick={() => props.openModal(dataDelete, 'delete')}>
          <span>DELETE</span>
        </button>
        <a href="/applications/form">
          <button
            onClick={() => {
              props.getIdSelected(id);
              props.selectTypeForm('update');
            }}
          >
            <span>EDIT</span>
          </button>
        </a>
        <button onClick={() => props.openModal(dataViewMore, 'viewMore')}>
          <span>VIEW MORE</span>
        </button>
      </td>
    </tr>
  );
}

export default ItemList;
