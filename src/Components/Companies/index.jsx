import { useEffect, useState } from 'react';
import styles from './companies.module.css';
import List from './List';
import Modal from '../shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from '../shared/Preloader/index';
import { getCompanies } from '../../redux/companies/thunks';
import { useSelector, useDispatch } from 'react-redux';

function Companies() {
  const dispatch = useDispatch();
  const companies = useSelector((store) => store.companies);

  /* const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [typeModal, setTypeModal] = useState();
  const [titleModal, setTitleModal] = useState();*/
  //const [isFetching, setIsFetching] = useState(true);

  //const url = process.env.REACT_APP_API;
  //Get info from DB
  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  /*//MODAL
  const closeModal = () => {
    setShowModal(false);
  };*/

  /*const openModal = (item, type, title) => {
    setSelectedItem(item);
    setTypeModal(type);
    setTitleModal(title);
    setShowModal(true);
  };*/

  /*//MODAL CONFIRM DELETE
  const acceptModal = () => {
    fetch(`${url}/companies/${selectedItem.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        setCompanies(
          companies.filter((company) => {
            return company._id !== selectedItem.id;
          })
        );
      })
      .catch((err) => console.log(err));
  };*/

  const tableHeader = ['Name', 'Address', 'City', 'Phone', 'Email', 'Actions'];

  return (
    <>
      <section className={styles.container}>
        <Modal
        /*showModal={showModal}
          closeModalFn={closeModal}
          acceptModalFn={acceptModal}
          content={selectedItem}
          type={typeModal}
          titleModal={titleModal}
        */
        />
        <h1 className={styles.h1}>Companies</h1>
        {companies.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={companies.list} header={tableHeader} /*openModal={openModal}*/ />
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
