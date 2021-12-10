import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from '../shared/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { deleteApplication, getApplications } from '../../redux/applications/thunks';
import { hideModal, showModal } from '../../redux/modal/actions';

function Applications() {
  const [selectedItem, setSelectedItem] = useState();

  const dispatch = useDispatch();
  const applications = useSelector((store) => store.applications);
  const showModalS = useSelector((store) => store.modal.show);
  const modalType = useSelector((store) => store.modal.type);
  const modalTitle = useSelector((store) => store.modal.title);
  // const modalContent = useSelector((store) => store.modal.content);

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  //MODAL
  const closeModal = () => {
    dispatch(hideModal());
  };

  const openModal = (item, type, title) => {
    setSelectedItem(item);
    dispatch(showModal(type, title, item));
  };

  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    dispatch(deleteApplication(selectedItem.id));
    // closeModal();
  };

  const tableHeader = ['Candidate', 'Open Position', 'Status', 'Action'];

  return (
    <>
      <Modal
        showModal={showModalS}
        closeModalFn={closeModal}
        acceptModalFn={acceptModal}
        content={selectedItem}
        type={modalType}
        titleModal={modalTitle}
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
