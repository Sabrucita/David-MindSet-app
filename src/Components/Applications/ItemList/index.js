import styles from './itemList.module.css';

function ItemList(props) {
  let id = props.data._id;
  let isActive = props.data.isActive;
  let idCandidate = props.data.idCandidate.firstName;
  let firstName = props.data.idCandidate.firstName;
  let lastName = props.data.idCandidate.lastName;
  let idOpenPosition = props.data.idOpenPosition._id;
  let jobDescription = props.data.idOpenPosition.jobDescription;

  let status = isActive === true ? 'Active' : 'Close';
  let names = `${firstName} ${lastName}`;

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
