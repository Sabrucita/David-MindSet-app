import ListItem from '../ListItem';
import styles from './list.module.css';

function List({ sessions, modalContent, setShowModal, setModalType }) {
  const updateItem = (id) => {
    console.log('update', id);
    localStorage.setItem('operation', 'update');
    localStorage.setItem('id', id);
    window.location.pathname = './sessions/form';
  };

  const openDeleteModal = (id) => {
    modalContent(id);
    setShowModal(true);
    setModalType('delete');
  };

  const openViewModal = (id) => {
    const session = sessions.find((session) => session._id === id);
    modalContent(session);
    setShowModal(true);
    setModalType('viewMore');
  };

  return (
    <table className={styles.list}>
      <thead>
        <tr>
          <th>Candidate</th>
          <th>Psychologist</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map((session) => {
          return (
            <ListItem
              key={session._id}
              session={session}
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
