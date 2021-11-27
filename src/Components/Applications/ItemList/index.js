// import styles from './itemList.module.css';

function ItemList(props) {
  let status = 'Close';
  if (props.status) status = 'Active';

  return (
    <tr id={props.id}>
      <td>{props.name}</td>
      <td>{props.position}</td>
      <td>{status}</td>
      <td>
        <button>
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
