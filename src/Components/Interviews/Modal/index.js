import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  let dataContent = [];
  let i = 0;
  for (const property in props.content) {
    dataContent[i] = `${property} : ${props.content[property]} `;
    i++;
  }

  let title;
  if (props.type === 'delete') title = '¿Are you sure that you want to delete this data?';
  else if (props.type === 'dataCreate') title = 'Data Created';
  else if (props.type === 'dataUpdate') title = 'Data Updated';
  else if (props.type === 'viewMore') title = 'Data Selected';
  else if (props.type === 'dataRequired') title = 'Data Required!';

  return (
    <div className={styles.modal}>
      <div className={styles.centerModal}>
        <div className={styles.modalMessage}>
          <h2>{title}</h2>
          <ul>
            {props.type !== 'dataRequired' &&
              dataContent.map((element) => {
                return <li key={element}>{element}</li>;
              })}
            {props.type === 'dataRequired' && <li key="dataModal">{props.textDescription}</li>}
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
            {(props.type === 'dataCreate' ||
              props.type === 'dataUpdate' ||
              props.type === 'viewMore' ||
              props.type === 'dataRequired') && (
              <button className={styles.modalOkConfirm} onClick={props.closeModal}>
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
