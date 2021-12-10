import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from '../shared/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { deleteApplication, getApplications } from '../../redux/applications/thunks';

function Applications() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [typeModal, setTypeModal] = useState();
  const [titleModal, setTitleModal] = useState();

  const dispatch = useDispatch();
  const applications = useSelector((store) => store.applications);

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

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
    dispatch(deleteApplication(selectedItem.id));
    console.log(applications.isFetchingDelete);
    closeModal();
  };

  const tableHeader = ['Candidate', 'Open Position', 'Status', 'Action'];

  return (
    <>
      <Modal
        showModal={showModal}
        closeModalFn={closeModal}
        acceptModalFn={acceptModal}
        content={selectedItem}
        type={typeModal}
        titleModal={titleModal}
      />
      <section className={styles.container}>
        <h1>Applications</h1>
        {applications.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={applications.list} header={tableHeader} openModal={openModal} />
            <Link to="/applications/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD APPLICATION</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Applications;
