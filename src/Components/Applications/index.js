import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import List from './List';
import Modal from './Modal';

function Applications() {
  const [showModal, setShowModal] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response.applications);
      });
  }, []);
  console.log(applications);

  //MODAL
  const closeModal = () => {
    setShowModal(false);
    // console.log(showModal);
  };
  const openModal = (item) => {
    setSelectedItem(item);
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
          title="¿Are you sure that you want to delete this data?"
          content={selectedItem}
        />
        <h1>Applications</h1>
        <List
          data={applications}
          header={tableHeader}
          openModal={openModal}
          acceptModal={acceptModal}
        />
        <a href="/applications/form" className={styles.buttonAdd}>
          <span className={styles.buttonGreen}>Add</span>
        </a>
      </section>
    </div>
  );
}

export default Applications;
