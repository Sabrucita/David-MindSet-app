import styles from './modal.module.css';
import React from 'react';
import ListItem from '../ListItem';

export const Modal = (props) => {
  if (!props.show) {
    return null;
    //MODAL FOR DELETE CONFIRMATION
  } else if (props.action == 'delete') {
    const onConfirmDeleteModal = () => {
      props.onCloseModal();
      props.closeModal();
    };
    const onReturnModal = () => {
      props.closeModal();
    };

    return (
      <div className={styles.modal}>
        <div className={styles.centerModal}>
          <h3 className={styles.modalMessage}>Are you sure you want to delete this company?</h3>
          <div className={styles.buttonModal}>
            <button className={styles.modalOk} onClick={onConfirmDeleteModal}>
              DELETE
            </button>
            <button className={styles.modalCancel} onClick={onReturnModal}>
              RETURN
            </button>
          </div>
        </div>
      </div>
    );
    //MODAL FOR VIEWING AN ITEM LIST
  } else if (props.action == 'view') {
    const onViewItemModal = () => {
      props.closeModal();
    };
    return (
      <div className={styles.modal}>
        <div className={styles.centerModal}>
          <div className={styles.modalMessage}>
            <ListItem className={styles.modalMessage} itemListInfo={props.itemListInfo} />;
          </div>
          <div className={styles.buttonModal}>
            <button className={styles.modalCancel} onClick={onViewItemModal}>
              RETURN
            </button>
          </div>
        </div>
      </div>
    );
  } else if (props.action == 'update') {
    const onUpdModal = () => {
      window.location.href = '/companies';
    };
    return (
      <div className={styles.modal}>
        <div className={styles.centerModal}>
          <div className={styles.modalMessage}>
            <h3 className={styles.modalMessage}>Your company has been updated succesfully</h3>
          </div>
          <div className={styles.buttonModal}>
            <button className={styles.modalCancel} onClick={onUpdModal}>
              RETURN TO HOMEPAGE
            </button>
          </div>
        </div>
      </div>
    );
  }
};
