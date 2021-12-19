import { useEffect, useState } from 'react';
import styles from './profiles.module.css';
import List from './List';
import Modal from 'Components/shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader';
import { deleteProfiles, getProfiles } from 'redux/admin/profiles/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { showModal } from 'redux/modal/actions';
import { profilesCleanup } from 'redux/admin/profiles/actions';

function Profiles() {
  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();
  const profiles = useSelector((store) => store.profiles);
  const modal = useSelector((state) => state.modal.show);

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(profilesCleanup());
    };
  }, [dispatch]);

  //MODAL
  const openModal = (item, type) => {
    setSelectedItem(item);
    dispatch(showModal('profiles', type, item));
  };

  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    dispatch(deleteProfiles(selectedItem.id));
  };

  const tableHeader = ['Name Profile', 'Action'];

  return (
    <>
      <section className={styles.container}>
        {modal && <Modal acceptModalFn={acceptModal} />}
        <h1 className={styles.h1}>Profile Types</h1>
        {profiles.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={profiles.list} header={tableHeader} openModal={openModal} />
            <Link to="/admin/profiles/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD PROFILE</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Profiles;
