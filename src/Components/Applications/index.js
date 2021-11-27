import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import List from './List';
// import Modal from './Modal';

function Applications() {
  // const [showModal, setShowModal] = useState(false);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response.applications);
      });
  }, []);

  // const closeModal = () => {
  //   setShowModal(false);
  // };
  // const onCloseModal = () => {
  //   console.log('se borró');
  //   //pasar fetch de delete!!!
  // };
  const tableHeader = ['Candidate', 'Open Position', 'Active Status', 'Action'];

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        {/* <Modal show={showModal} closeModal={closeModal} onCloseModal={onCloseModal} /> */}
        <h2>Applications</h2>
        {/* <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Delete
        </button> */}
        <List data={applications} header={tableHeader} />
        <a href="/applications/form" className={styles.buttonAdd}>
          <span className={styles.buttonGreen}>Add</span>
        </a>
      </section>
    </div>
  );
}

export default Applications;
