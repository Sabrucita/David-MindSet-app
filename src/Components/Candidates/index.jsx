import { useEffect, useState } from 'react';
import styles from './candidates.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from '../shared/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidates, deleteCandidates } from '../../redux/candidates/thunks';
import store from '../../redux/store';
import { url } from '../../constants';

function Candidates() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [typeModal, setTypeModal] = useState();
  const [titleModal, setTitleModal] = useState();

  const dispatch = useDispatch();
  const candidates = useSelector((store) => store.candidates);

  useEffect(() => {
    dispatch(getCandidates());
  }, [dispatch]);

  const acceptModal = () => {
    dispatch(deleteCandidates(selectedItem.id));
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = (item, type, title) => {
    setSelectedItem(item);
    setTypeModal(type);
    setTitleModal(title);
    setShowModal(true);
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
      <Modal
        showModal={showModal}
        closeModalFn={closeModal}
        acceptModalFn={acceptModal}
        content={selectedItem}
        type={typeModal}
        titleModal={titleModal}
      />
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
