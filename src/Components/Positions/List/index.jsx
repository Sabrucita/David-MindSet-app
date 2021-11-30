import ListItem from '../ListItem';
import styles from './list.module.css';

function List({ positions, modalContent, setShowModal, setModalType }) {
  const updateItem = (id) => {
    console.log('update', id);
    localStorage.setItem('operation', 'update');
    localStorage.setItem('id', id);
    window.location.pathname = './positions/form';
  };

  const openDeleteModal = (id) => {
    modalContent(id);
    setShowModal(true);
    setModalType('delete');
  };

  const openViewModal = (id) => {
    const position = positions.find((position) => position._id === id);
    modalContent(position);
    setShowModal(true);
    setModalType('viewMore');
  };

  return (
    <table className={styles.list}>
      <thead>
        <tr>
          <th>Company</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Job Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((position) => {
          return (
            <ListItem
              key={position._id}
              position={position}
              updateItem={updateItem}
              deleteItem={openDeleteModal}
              viewItem={openViewModal}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default List;
