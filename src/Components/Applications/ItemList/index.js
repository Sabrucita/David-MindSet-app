import styles from './itemList.module.css';

function ItemList(props) {
  let id = props.data._id;
  let isActive = props.data.isActive;
  let idCandidate;
  let names;
  let firstName;
  let lastName;
  let idOpenPosition;
  let jobDescription;

  if (props.data.idCandidate) {
    idCandidate = props.data.idCandidate._id;
    firstName = props.data.idCandidate.firstName;
    lastName = props.data.idCandidate.lastName;
    names = `${firstName} ${lastName}`;
  } else {
    names = 'This candidate was deleted';
  }
  if (props.data.idOpenPosition) {
    idOpenPosition = props.data.idOpenPosition._id;
    jobDescription = props.data.idOpenPosition.jobDescription;
  } else {
    jobDescription = 'This position was deleted';
  }

  let status = isActive === true ? 'Active' : 'Close';

  //to show in modal type delete
  const dataDelete = {
    id: id,
    name: names,
    position: jobDescription,
    status: status
  };
  //to show in modal type view more
  const dataViewMore = {
    id: id,
    idCandidate: idCandidate,
    name: names,
    idOpenPosition: idOpenPosition,
    jobDescription: jobDescription,
    status: status
  };

  //to show in the table list
  const dataTable = {
    name: names,
    position: jobDescription,
    status: status
  };

  const getDataContent = (data) => {
    let content = [];
    for (let property in data) {
      content.push(<td key={property}>{data[property]}</td>);
    }
    return content;
  };

  return (
    <tr id={id}>
      {getDataContent(dataTable)}
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
