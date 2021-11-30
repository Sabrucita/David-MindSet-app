import styles from './modal.module.css';
import React from 'react';
import ListItem from '../ListItem';

export const Modal = (props) => {
  if (!props.show) {
    return null;
  } else if (props.action == 'delete') {
    const onConfirmDeleteModal = () => {
      props.onCloseModal();
      props.closeModal();
    };

    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          <h3>Are you sure you want to delete this admin?</h3>
          <button onClick={onConfirmDeleteModal}>DELETE</button>
        </div>
      </div>
    );
  } else if (props.action == 'view') {
    const onViewItemModal = () => {
      props.closeModal();
    };
    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          <ListItem itemListInfo={props.itemListInfo} />;
          <button className={styles.buttonModal} onClick={onViewItemModal}>
            RETURN
          </button>
        </div>
      </div>
    );
  }
};
