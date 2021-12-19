import { useEffect, useState } from 'react';
import styles from './psychologists.module.css';
import List from './List';
import Modal from 'Components/shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader/index';
import { deletePsychologist, getPsychologists } from 'redux/psychologists/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { showModal } from 'redux/modal/actions';
import { psychologistsCleanUp } from 'redux/psychologists/actions';

function Psychologists() {
  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();
  const psychologists = useSelector((store) => store.psychologists);
  const modal = useSelector((state) => state.modal.show);

  useEffect(() => {
    dispatch(getPsychologists());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(psychologistsCleanUp());
    };
  }, [dispatch]);

  //MODAL

  const openModal = (item, type) => {
    setSelectedItem(item);
    dispatch(showModal('psychologists', type, item));
  };

  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    dispatch(deletePsychologist(selectedItem.id));
  };

  const tableHeader = ['First Name', 'Last Name', 'Email', 'Password', 'Actions'];

  return (
    <>
      <section className={styles.container}>
        {modal && <Modal acceptModalFn={acceptModal} />}
        <h1 className={styles.h1}>Psychologists</h1>
        {psychologists.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={psychologists.list} header={tableHeader} openModal={openModal} />
            <Link to="/admin/psychologists/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD PSYCHOLOGIST</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Psychologists;
