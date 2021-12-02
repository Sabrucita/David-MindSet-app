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
          <li>First Name: {props.itemListInfo.firstName}</li>
          <li>Last Name: {props.itemListInfo.lastName}</li>
          <li>Email: {props.itemListInfo.email}</li>
          <li>Password: {props.itemListInfo.password}</li>
          <li>Picture URL: {props.itemListInfo.pictureUrl}</li>
          <li>Turns: {props.itemListInfo.turns}</li>
        </ul>
      </div>
    </section>
  );
}

export default ListItem;
