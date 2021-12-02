import styles from './itemList.module.css';

function ItemList(props) {
  let id = props.data._id;
  let names = props.data.name;
  let isActive = props.data.isActive;

  //to show in modal type delete
  const dataDelete = {
    id: id,
    name: names
  };
  //to show in modal type view more
  const dataViewMore = {
    id: id,
    name: names,
    isActive: isActive
  };

  return (
    <tr id={id}>
      <td>{names}</td>
      <td className={styles.keypad}>
        <button onClick={() => props.openModal(dataDelete, 'delete')}>
          <span>DELETE</span>
        </button>
        <a href={`/profiles/form?${id}`}>
          <button>
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
