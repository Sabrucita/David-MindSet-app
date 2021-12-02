import { useState } from 'react';
import React from 'react';
import styles from './listItem.module.css';
import { Modal } from '../Modal';

function ListItem(props) {
  const [showModal, setShowModal] = useState(false);

  //MODAL
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal show={showModal} closeModal={closeModal} />
      <h2>{props.itemListInfo.name} Information</h2>
      <div>
        <ul className={styles.ulCompanies}>
          <li>Company Name: {props.itemListInfo.name}</li>
          <li>Address: {props.itemListInfo.address}</li>
          <li>City: {props.itemListInfo.city}</li>
          <li>Province: {props.itemListInfo.province}</li>
          <li>Country: {props.itemListInfo.country}</li>
          <li>Zip Code: {props.itemListInfo.zipCode}</li>
          <li>Phone: {props.itemListInfo.phone}</li>
          <li>Email: {props.itemListInfo.email}</li>
          <li>Picture URL: {props.itemListInfo.pictureUrl}</li>
          <li>Contact Full Name: {props.itemListInfo.contactFullName}</li>
          <li>Contact Phone: {props.itemListInfo.contactPhone}</li>
          <li>Is Available? {props.itemListInfo.isActive ? 'YES' : 'NO'}</li>
        </ul>
      </div>
    </section>
  );
}

export default ListItem;
