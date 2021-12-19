import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import List from './List';
import Modal from 'Components/shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader/index';
import { deleteAdmin, getAdmins } from 'redux/admin/admins/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { showModal } from 'redux/modal/actions';
import { adminsCleanUp } from 'redux/admin/admins/actions';

function Admins() {
  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();
  const admins = useSelector((store) => store.admins);
  const modal = useSelector((state) => state.modal.show);

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(adminsCleanUp());
    };
  }, [dispatch]);

  //MODAL

  const openModal = (item, type) => {
    setSelectedItem(item);
    dispatch(showModal('admins', type, item));
  };

  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    dispatch(deleteAdmin(selectedItem.id));
  };

  const tableHeader = ['First Name', 'Last Name', 'Email', 'Password', 'Actions'];

  return (
    <>
      <section className={styles.container}>
        {modal && <Modal acceptModalFn={acceptModal} />}
        <h1 className={styles.h1}>Administrators</h1>
        {admins.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={admins.list} header={tableHeader} openModal={openModal} />
            <Link to="/admin/administrators/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD ADMINISTRATOR</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Admins;
