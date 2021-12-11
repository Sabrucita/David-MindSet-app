import { useEffect, useState } from 'react';
import styles from './companies.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from '../shared/Preloader/index';
import { deleteCompany, getCompanies } from '../../redux/companies/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal, showModal } from '../../redux/modal/actions';
import { cleanSelectedElement } from '../../redux/companies/actions';

function Companies() {
  const dispatch = useDispatch();
  const companies = useSelector((store) => store.companies);
  const [selectedItem, setSelectedItem] = useState();

  //Get info from DB
  useEffect(() => {
    dispatch(cleanSelectedElement());
    dispatch(getCompanies());
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
    dispatch(deleteCompany(selectedItem.id));
  };

  const tableHeader = ['Name', 'Address', 'City', 'Phone', 'Email', 'Actions'];

  return (
    <>
      <section className={styles.container}>
        <Modal closeModalFn={closeModal} acceptModalFn={acceptModal} />
        <h1 className={styles.h1}>Companies</h1>
        {companies.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={companies.list} header={tableHeader} openModal={openModal} />
            <Link to="/companies/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD COMPANY</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Companies;
