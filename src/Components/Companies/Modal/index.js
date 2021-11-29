import styles from './modal.module.css';
import React from 'react';

export const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  const onConfirmDeleteModal = () => {
    props.onCloseModal();
    props.closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Are you sure you want to delete this company?</h3>
        <button onClick={onConfirmDeleteModal}>DELETE</button>
      </div>
    </div>
  );
};
