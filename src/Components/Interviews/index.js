import { useEffect, useState } from 'react';
import styles from './interviews.module.css';
import List from './List';
import Modal from './Modal';

function Interviews(props) {
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
  console.log(interviews);
  //MODAL
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = (item, type) => {
    setSelectedItem(item);
    setTypeModal(type);
    setShowModal(true);
  };

  // Refresh when delete  it works but it isnt the correct way! look lines 50-55 but do not refresh!
  const refreshDelete = () => {
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInterviews(response.data);
      });
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
        // setInterviews(
        //   interviews.filter((app) => {
        //     app._id !== selectedItem.id;
        //   })
        // );
        refreshDelete();
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
          getIdSelected={props.getIdSelected}
          selectTypeForm={props.selectTypeForm}
        />
        <a
          href="/interviews/form"
          className={styles.buttonAdd}
          onClick={() => props.selectTypeForm('create')}
        >
          <span className={styles.buttonGreen}>Add</span>
        </a>
      </section>
    </div>
  );
}

export default Interviews;
