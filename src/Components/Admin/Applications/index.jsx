import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import List from './List';
import Modal from 'Components/shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { deleteApplication, getApplications } from 'redux/applications/thunks';
import { showModal } from 'redux/modal/actions';
import { applicationsCleanUp } from 'redux/applications/actions';

function Applications() {
  const [selectedItem, setSelectedItem] = useState();

  const dispatch = useDispatch();
  const applications = useSelector((store) => store.applications);
  const modal = useSelector((state) => state.modal.show);

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(applicationsCleanUp());
    };
  }, []);

  const openModal = (item, type) => {
    setSelectedItem(item);
    dispatch(showModal('applications', type, item));
  };

  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    dispatch(deleteApplication(selectedItem.id));
  };

  const tableHeader = ['Candidate', 'Open Position', 'Status', 'Action'];

  return (
    <>
      {modal && <Modal acceptModalFn={acceptModal} />}
      <section className={styles.container}>
        <h1>Applications</h1>
        {applications.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={applications.list} header={tableHeader} openModal={openModal} />
            <Link to="/admin/applications/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD APPLICATION</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Applications;
