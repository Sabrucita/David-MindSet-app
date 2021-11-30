import { useEffect, useState } from 'react';
import styles from './interviews.module.css';
import List from './List';
import Modal from './Modal';

function Interviews() {
  const [showModal, setShowModal] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [typeModal, setTypeModal] = useState();

  //Get app info from DB
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInterviews(response.data);
      });
  }, []);

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
    fetch(`${process.env.REACT_APP_API}/interviews/${selectedItem.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        setInterviews(
          interviews.filter((app) => {
            return app._id !== selectedItem.id;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const tableHeader = ['Company	', 'Candidate	', 'Date', 'Status', 'Action'];

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
        <h1>Interviews</h1>
        <List
          data={interviews}
          header={tableHeader}
          openModal={openModal}
          acceptModal={acceptModal}
        />
        <a href="/interviews/form" className={styles.buttonAdd}>
          <span className={styles.buttonGreen}>Add</span>
        </a>
      </section>
    </div>
  );
}

export default Interviews;
