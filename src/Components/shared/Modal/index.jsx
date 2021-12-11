import styles from './modal.module.css';
import { useSelector } from 'react-redux';

function Modal({ acceptModalFn, closeModalFn }) {
  let dataContent = [];
  const showModal = useSelector((store) => store.modal.show);
  const type = useSelector((store) => store.modal.type);
  const titleModal = useSelector((store) => store.modal.title);
  const content = useSelector((store) => store.modal.content);

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
