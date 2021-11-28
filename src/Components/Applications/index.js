import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import List from './List';
import Modal from './Modal';

function Applications(props) {
  const [showModal, setShowModal] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [typeModal, setTypeModal] = useState();

  //Get app info from DB
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response.applications);
      });
  }, []);

  // Refresh when delete  it works but i have doubts if this is the correct way!
  const refreshDelete = () => {
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response.applications);
      });
  };

  //MODAL
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = (item, type) => {
    setSelectedItem(item);
    setTypeModal(type);
    setShowModal(true);
  };
  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    fetch(`${process.env.REACT_APP_API}/applications/${selectedItem.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        refreshDelete();
      })
      .catch((err) => console.log(err));
  };

  const tableHeader = ['Candidate', 'Open Position', 'Active Status', 'Action'];

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        <Modal
          show={showModal}
          closeModal={closeModal}
          acceptModal={acceptModal}
          content={selectedItem}
          type={typeModal}
        />
        <h1>Applications</h1>
        <List
          data={applications}
          header={tableHeader}
          openModal={openModal}
          acceptModal={acceptModal}
          getIdSelected={props.getIdSelected}
          selectTypeForm={props.selectTypeForm}
        />
        <a
          href="/applications/form"
          className={styles.buttonAdd}
          onClick={() => props.selectTypeForm('create')}
        >
          <span className={styles.buttonGreen}>Add</span>
        </a>
      </section>
    </div>
  );
}

export default Applications;
