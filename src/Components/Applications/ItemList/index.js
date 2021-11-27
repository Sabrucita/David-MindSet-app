// import styles from './itemList.module.css';

function ItemList(props) {
  let status = 'Close';
  if (props.status) status = 'Active';

  const dataDelete = {
    id: props.id,
    name: props.name,
    position: props.position,
    status: status
  };

  return (
    <tr id={props.id}>
      <td>{props.name}</td>
      <td>{props.position}</td>
      <td>{status}</td>
      <td>
        <button onClick={() => props.openModal(dataDelete)}>
          <span>DELETE</span>
        </button>
        <a href="/applications/form">
          <button
            id={props.id}
            onClick={() => {
              props.getIdSelected(props.id);
              props.selectTypeForm('update');
            }}
          >
            <span>EDIT</span>
          </button>
        </a>
      </td>
    </tr>
  );
}

export default ItemList;
