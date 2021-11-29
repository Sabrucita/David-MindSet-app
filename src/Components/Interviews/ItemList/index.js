import styles from './itemList.module.css';

function ItemList(props) {
  let idCandidate;
  let names;
  let firstName;
  let lastName;
  let idCompany;
  let nameCompany;
  let missingData = false;

  let id = props.data._id;
  let statusD = props.data.status;
  let dateLong = new Date(props.data.date);
  dateLong.setDate(dateLong.getDate() + 1);
  if (props.data.idCandidate) {
    idCandidate = props.data.idCandidate._id;
    firstName = props.data.idCandidate.firstName;
    lastName = props.data.idCandidate.lastName;
    names = `${firstName} ${lastName}`;
  } else {
    names = 'This candidate was deleted';
    missingData = true;
  }
  if (props.data.idCompany) {
    idCompany = props.data.idCompany._id;
    nameCompany = props.data.idCompany.name;
  } else {
    nameCompany = 'This company was deleted';
    missingData = true;
  }
  let status = statusD === true ? 'Active' : 'Close';
  let dateShort = `${dateLong.getDate()} / ${dateLong.getMonth() + 1} / ${dateLong.getFullYear()}`;

  //to show in modal type delete
  const dataDelete = {
    id: id,
    nameCandidate: names,
    nameCompany: nameCompany,
    status: status,
    date: dateShort
  };
  //to show in modal type view more
  const dataViewMore = {
    id: props.id,
    idCandidate: idCandidate,
    nameCandidate: names,
    idCompany: idCompany,
    nameCompany: nameCompany,
    status: status,
    date: dateShort
  };

  //to show in the table list
  const dataTable = {
    company: nameCompany,
    candidate: names,
    date: dateShort,
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
        {!missingData && (
          <a href="/interviews/form">
            <button
              onClick={() => {
                props.getIdSelected(id);
                props.selectTypeForm('update');
              }}
            >
              <span>EDIT</span>
            </button>
          </a>
        )}
        <button onClick={() => props.openModal(dataViewMore, 'viewMore')}>
          <span>VIEW MORE</span>
        </button>
      </td>
    </tr>
  );
}

export default ItemList;
