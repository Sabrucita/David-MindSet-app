import { useEffect, useState } from 'react';
import styles from './candidates.module.css';
import List from './List';
import Modal from 'Components/shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidates, deleteCandidates } from 'redux/candidates/thunks';
import { hideModal, showModal } from 'redux/modal/actions';
import { candidatesCleanUp } from 'redux/candidates/actions';

function Candidates() {
  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();
  const candidates = useSelector((store) => store.candidates);
  const modal = useSelector((state) => state.modal.show);

  useEffect(() => {
    dispatch(getCandidates());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(candidatesCleanUp());
    };
  }, [dispatch]);

  //MODAL
  const closeModal = () => {
    dispatch(hideModal());
  };

  const openModal = (item, type) => {
    setSelectedItem(item);
    dispatch(showModal('candidates', type, item));
  };

  //MODAL DELETE
  const acceptModal = () => {
    dispatch(deleteCandidates(selectedItem.id));
  };

  const tableHeader = [
    'Name',
    'Phone',
    'Email',
    'Country',
    'Province',
    'City',
    'Address',
    'Birthday',
    'Open to work?',
    'Actions'
  ];

  return (
    <>
      <section className={styles.container}>
        {modal && <Modal closeModalFn={closeModal} acceptModalFn={acceptModal} />}
        <h1 className={styles.mainTitle}>Candidates</h1>
        {candidates.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={candidates.list} header={tableHeader} openModal={openModal} />
            <Link to="/admin/candidates/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}> ADD CANDIDATE</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}
export default Candidates;
