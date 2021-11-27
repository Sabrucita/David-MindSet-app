// import styles from './itemList.module.css';

function ItemList(props) {
  let status = 'Close';
  if (props.status) status = 'Active';

  const dataItem = {
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
        <button id={props.id} onClick={() => props.openModal(dataItem)}>
          <span>DELETE</span>
        </button>
        <button>
          <span>EDIT</span>
        </button>
      </td>
    </tr>
  );
}

export default ItemList;
