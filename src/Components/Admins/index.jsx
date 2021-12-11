import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import { deleteAdmin, getAdmins } from '../../redux/admins/thunks';
import { useSelector, useDispatch } from 'react-redux';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from '../shared/Preloader/index';
import { hideModal, showModal } from '../../redux/modal/actions';

function Admins() {
  const [selectedItem, setSelectedItem] = useState();
  // Make the dispatcher capable of dispatching Redux actions
  const dispatch = useDispatch();
  const admins = useSelector((store) => store.admins);
  const displayModal = useSelector((store) => store.modal.show);
  const modalType = useSelector((store) => store.modal.type);
  const modalTitle = useSelector((store) => store.modal.title);

  useEffect(() => {
    dispatch(getAdmins());
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
    dispatch(deleteAdmin(selectedItem.id));
  };

  const tableHeader = ['First Name', 'Last Name', 'Email', 'Password', 'Actions'];

  return (
    <>
      <section className={styles.container}>
        <Modal
          showModal={displayModal}
          closeModalFn={closeModal}
          acceptModalFn={acceptModal}
          content={selectedItem}
          type={modalType}
          titleModal={modalTitle}
        />
        <h1 className={styles.h1}>Admins</h1>
        {admins.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={admins} header={tableHeader} openModal={openModal} />
            <Link to="/administrators/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD ADMIN</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Admins;
