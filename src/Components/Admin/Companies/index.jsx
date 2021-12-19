import { useEffect, useState } from 'react';
import styles from './companies.module.css';
import List from './List';
import Modal from 'Components/shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader/index';
import { deleteCompany, getCompanies } from 'redux/admin/companies/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { showModal } from 'redux/modal/actions';
import { companiesCleanup } from 'redux/admin/companies/actions';

function Companies() {
  const [selectedItem, setSelectedItem] = useState();

  const dispatch = useDispatch();
  const companies = useSelector((store) => store.companies);
  const modal = useSelector((state) => state.modal.show);

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(companiesCleanup());
    };
  }, [dispatch]);

  //MODAL

  const openModal = (item, type) => {
    setSelectedItem(item);
    dispatch(showModal('companies', type, item));
  };

  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    dispatch(deleteCompany(selectedItem.id));
  };

  const tableHeader = ['Name', 'Address', 'City', 'Phone', 'Email', 'Actions'];

  return (
    <>
      <section className={styles.container}>
        {modal && <Modal acceptModalFn={acceptModal} />}
        <h1 className={styles.h1}>Companies</h1>
        {companies.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={companies.list} header={tableHeader} openModal={openModal} />
            <Link to="/admin/companies/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD COMPANY</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Companies;
