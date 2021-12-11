import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from '../shared/Preloader/index';
import { deleteAdmin, getAdmins } from '../../redux/admins/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal, showModal } from '../../redux/modal/actions';
import { cleanSelectedElement } from '../../redux/admins/actions';

function Admins() {
  const dispatch = useDispatch();
  const admins = useSelector((store) => store.admins);
  const [selectedItem, setSelectedItem] = useState();

  //Get info from DB
  useEffect(() => {
    dispatch(cleanSelectedElement());
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
        <Modal closeModalFn={closeModal} acceptModalFn={acceptModal} />
        <h1 className={styles.h1}>Administrators</h1>
        {admins.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={admins.list} header={tableHeader} openModal={openModal} />
            <Link to="/administrators/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD ADMINISTRATORS</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Admins;
