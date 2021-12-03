import { useEffect, useState } from 'react';
import styles from './interviews.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';

function Interviews() {
  const [showModal, setShowModal] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [typeModal, setTypeModal] = useState();
  const [titleModal, setTitleModal] = useState();

  const url = process.env.REACT_APP_API;
  //Get app info from DB
  useEffect(() => {
    fetch(`${url}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInterviews(response.data);
      });
  }, []);

  //MODAL
  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = (item, type, title) => {
    setSelectedItem(item);
    setTypeModal(type);
    setTitleModal(title);
    setShowModal(true);
  };

  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    fetch(`${url}/interviews/${selectedItem.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        setInterviews(
          interviews.filter((element) => {
            return element._id !== selectedItem.id;
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
          showModal={showModal}
          closeModalFn={closeModal}
          acceptModalFn={acceptModal}
          content={selectedItem}
          type={typeModal}
          titleModal={titleModal}
        />
        <h1 className={styles.h1}>Interviews</h1>
        <List data={interviews} header={tableHeader} openModal={openModal} />
        <Link to="/interviews/form" className={styles.buttonAdd}>
          <span className={styles.buttonGreen}>ADD INTERVIEW</span>
        </Link>
      </section>
    </div>
  );
}

export default Interviews;
