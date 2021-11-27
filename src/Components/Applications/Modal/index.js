import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className={styles.modal} id="modal-delete">
      <div className={styles.centerModal}>
        <div className={styles.modalMessage}>
          <h2>{props.title}</h2>
          <ul>
            <li>name: {props.content.name}</li>
            <li>position: {props.content.position}</li>
            <li>status: {props.content.status}</li>
            {/* { for (const property in props.content) {
                return (
                  <li>
                  `${property}: ${props.content[property]}`
                  </li>
                );
              }
            }*/}
          </ul>
          <div className={styles.buttonModal}>
            <button
              className={styles.modalOk}
              id="modal-delete-confirm"
              onClick={props.acceptModal}
            >
              ACCEPT
            </button>
            <button className={styles.modalCancel} id="cancel-button" onClick={props.closeModal}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
