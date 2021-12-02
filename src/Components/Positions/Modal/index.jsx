import styles from './modal.module.css';

function Modal({ showModal, type, content, acceptModalFn, closeModalFn }) {
  let title;
  let dataContent = [];

  switch (type) {
    case 'delete':
      title = '¿Are you sure that you want to delete this Position?';
      break;
    case 'create':
      title = 'Position Created';
      break;
    case 'update':
      title = 'Position Updated';
      break;
    case 'viewMore':
      title = 'Position Selected';
      break;
    case 'error':
      title = 'Ups... there was an error';
      break;
    default:
      break;
  }

  if (type === 'create' || type === 'update' || type === 'viewMore' || type === 'error') {
    for (const property in content) {
      dataContent.push(`${property} : ${content[property]} `);
    }
  }

  const acceptModal = () => {
    if (type === 'delete') acceptModalFn(content);
  };

  return (
    <div className={`${styles.container} ${!showModal ? styles.hidden : ''}`}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <ul>
          {dataContent.map((element) => {
            return <li key={element.id}>{element}</li>;
          })}
        </ul>
        <div className={styles.buttonModal}>
          {type === 'delete' && (
            <button className={styles.modalOk} onClick={acceptModal}>
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
