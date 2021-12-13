import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { hideModal } from '../../../redux/modal/actions';
import { capitalize, removeLastChar } from '../../helpers';
import Preloader from '../Preloader';
import styles from './modal.module.css';

function Modal({ acceptModalFn, history }) {
  const dispatch = useDispatch();
  const resource = useSelector((store) => store.modal.resource);
  const type = useSelector((store) => store.modal.type);
  const content = useSelector((store) => store.modal.content);
  const [title, setTitle] = useState('');

  let dataContent = [],
    modalContent;

  useEffect(() => {
    switch (type) {
      case 'create':
        setTitle(`${removeLastChar(capitalize(resource))} created!`);
        break;
      case 'update':
        setTitle(`${removeLastChar(capitalize(resource))} updated!`);
        break;
      case 'delete':
        setTitle(
          `Are you sure that you want to delete this ${removeLastChar(capitalize(resource))}?`
        );
        break;
      case 'fetching':
        setTitle(`Please wait...`);
        break;
      case 'deleted':
        setTitle(`${removeLastChar(capitalize(resource))} deleted!`);
        break;
      case 'viewMore':
        setTitle(`${removeLastChar(capitalize(resource))} information:`);
        break;
      case 'error':
        setTitle(`Ups an error has happened...`);
        break;
    }
  }, [type]);

  useEffect(() => {
    return () => {
      dispatch(hideModal());
    };
  }, []);

  const closeModalFn = () => {
    dispatch(hideModal());
    if (type === 'create' || type === 'update') {
      history.push(`/${resource}`);
    }
  };

  if (type === 'error') {
    modalContent = <p>{content}</p>;
    for (const property in content) {
      dataContent.push(content[property]);
    }
  } else {
    for (const property in content) {
      dataContent.push(`${property} : ${content[property]} `);
    }
    modalContent = (
      <ul>
        {dataContent.map((element) => {
          return <li key={element.id}>{element}</li>;
        })}
      </ul>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        {modalContent}
        {type === 'fetching' && (
          <div className={styles.center}>
            <Preloader />
          </div>
        )}
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
          {type !== 'delete' && type !== 'fetching' && (
            <button className={styles.modalOkConfirm} onClick={closeModalFn}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Modal);
