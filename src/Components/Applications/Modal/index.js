import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }
  let dataContent = [];
  if (props.type === 'delete') {
    dataContent[0] = `name: ${props.content.name}`;
    dataContent[1] = `position: ${props.content.position}`;
    dataContent[2] = `status: ${props.content.status}`;
  } else if (props.type === 'dataCreate') {
    dataContent[0] = `idCandidate: ${props.content.idCandidate}`;
    dataContent[1] = `idOpenPosition: ${props.content.idOpenPosition}`;
  }

  return (
    <div className={styles.modal} id="modal-delete">
      <div className={styles.centerModal}>
        <div className={styles.modalMessage}>
          <h2>{props.title}</h2>
          <ul>
            {dataContent.map((element) => {
              // eslint-disable-next-line react/jsx-key
              return <li>{element}</li>;
            })}
          </ul>
          <div className={styles.buttonModal}>
            {props.type === 'delete' && (
              <button className={styles.modalOk} onClick={props.acceptModal}>
                ACCEPT
              </button>
            )}
            {props.type === 'delete' && (
              <button className={styles.modalCancel} onClick={props.closeModal}>
                CANCEL
              </button>
            )}
            {props.type === 'dataCreate' && (
              <button
                className={styles.modalOkConfirm}
                id="modal-ok-confirm"
                onClick={props.closeModal}
              >
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
{
  /* { for (const property in props.content) {
    return (
      <li>
      `${property}: ${props.content[property]}`
      </li>
    );
  }
}*/
}
