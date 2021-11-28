import styles from './itemList.module.css';

function ItemList(props) {
  let id = props.data._id;
  let statusD = props.data.status;
  let dateLong = new Date(props.data.date);
  let idCandidate = props.data.idCandidate._id;
  let firstName = props.data.idCandidate.firstName;
  let lastName = props.data.idCandidate.lastName;
  let idCompany = props.data.idCompany._id;
  let nameCompany = props.data.idCompany.name;

  let status = statusD === true ? 'Active' : 'Close';
  let names = `${firstName} ${lastName}`;
  let dateShort = `${dateLong.getDate() + 1} / ${
    dateLong.getMonth() + 1
  } / ${dateLong.getFullYear()}`;

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
      content.push(<td>{data[property]}</td>);
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
