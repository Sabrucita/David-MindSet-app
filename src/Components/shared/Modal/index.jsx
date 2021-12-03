import styles from './modal.module.css';

function Modal({ showModal, type, content, acceptModalFn, closeModalFn, titleModal }) {
  let dataContent = [];

  if (type === 'error') {
    for (const property in content) {
      dataContent.push(content[property]);
    }
  } else {
    for (const property in content) {
      dataContent.push(`${property} : ${content[property]} `);
    }
  }

  return (
    <div className={`${styles.container} ${!showModal ? styles.hidden : ''}`}>
      <div className={styles.modal}>
        <h2>{titleModal}</h2>
        <ul>
          {dataContent.map((element) => {
            return <li key={element.id}>{element}</li>;
          })}
        </ul>
        <div className={styles.buttonModal}>
          {type === 'delete' && (
            <button className={styles.modalOk} onClick={acceptModalFn}>
              ACCEPT
            </button>
          )}
          {type === 'delete' && (
            <button className={styles.modalCancel} onClick={closeModalFn}>
              CANCEL
            </button>
          )}
          {(type === 'create' || type === 'update' || type === 'viewMore' || type === 'error') && (
            <button className={styles.modalOkConfirm} onClick={closeModalFn}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
