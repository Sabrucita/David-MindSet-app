import { useEffect, useState } from 'react';
import styles from './psychologists.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from '../shared/Preloader/index';
import { deletePsychologist, getPsychologists } from '../../redux/psychologists/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal, showModal } from '../../redux/modal/actions';
import { cleanSelectedElement } from '../../redux/psychologists/actions';

function Psychologists() {
  const dispatch = useDispatch();
  const psychologists = useSelector((store) => store.psychologists);
  const [selectedItem, setSelectedItem] = useState();

  //Get info from DB
  useEffect(() => {
    dispatch(cleanSelectedElement());
    dispatch(getPsychologists());
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
    dispatch(deletePsychologist(selectedItem.id));
  };

  const tableHeader = ['First Name', 'Last Name', 'Email', 'Password', 'Actions'];

  return (
    <>
      <section className={styles.container}>
        <Modal closeModalFn={closeModal} acceptModalFn={acceptModal} />
        <h1 className={styles.h1}>Psychologists</h1>
        {psychologists.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={psychologists.list} header={tableHeader} openModal={openModal} />
            <Link to="/psychologists/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD PSYCHOLOGIST</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Psychologists;
