import { useEffect, useState } from 'react';
import styles from './candidates.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from '../shared/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidates, deleteCandidates } from '../../redux/candidates/thunks';
import { hideModal, showModal } from '../../redux/modal/actions';
import { candidatesCleanUp } from '../../redux/candidates/actions';

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
  }, []);

  //MODAL DELETE
  const acceptModal = () => {
    dispatch(deleteCandidates(selectedItem.id));
  };

  //MODAL
  const closeModal = () => {
    dispatch(hideModal());
  };

  const openModal = (item, type) => {
    setSelectedItem(item);
    dispatch(showModal('candidates', type, item));
  };

  const tableHeader = [
    'First Name',
    'Last Name',
    'Phone',
    'Email',
    'Country',
    'Province',
    'City',
    'Postal Code',
    'Address',
    'Birthday',
    'Actions'
  ];

  return (
    <>
      {modal && <Modal closeModalFn={closeModal} acceptModalFn={acceptModal} />}
      <section className={styles.container}>
        <h1 className={styles.mainTitle}>Candidates</h1>
        {candidates.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={candidates.list} header={tableHeader} openModal={openModal} />
            <Link to="/candidates/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}> ADD CANDIDATE</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}
export default Candidates;
