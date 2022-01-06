import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, withRouter } from 'react-router-dom';
import { hideModal } from 'redux/modal/actions';
import { capitalize, removeLastChar, getBaseUrl } from 'helpers';
import Preloader from '../Preloader';
import styles from './modal.module.css';

function Modal({ acceptModalFn, secondAcceptModalFn, history }) {
  const dispatch = useDispatch();
  const resource = useSelector((store) => store.modal.resource);
  const type = useSelector((store) => store.modal.type);
  const content = useSelector((store) => store.modal.content);
  const [title, setTitle] = useState('');
  const { url } = useRouteMatch();
  const baseUrl = getBaseUrl(url, '/form');

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
      case 'login':
        setTitle(`Login info:`);
        break;
      case 'signUp':
        setTitle(`Sign Up info:`);
        break;
      case 'session':
        setTitle(`Do you want to select this date for your ${resource}?`);
        break;
      case 'skip':
        setTitle(
          `You won't be able to schedule any interview until you have a session with a psychologist. Are you sure you want to skip it ?`
        );
        break;
      case 'availability':
        setTitle(`Are you sure?`);
        break;
      case 'changeIsNotActive':
        setTitle(
          `Are you sure that you want to disable this ${removeLastChar(capitalize(resource))}?`
        );
        break;
      case 'changeIsActive':
        setTitle(
          `Are you sure that you want to activate this ${removeLastChar(capitalize(resource))}?`
        );
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
      if (resource === 'sessions') return history.push('/candidate/profile');
      return history.push(baseUrl);
    }
    if (type === 'signUp') return history.push('/auth/login');
  };

  if (type === 'error' || type === 'login' || type === 'signUp' || type === 'availability') {
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
          {(type === 'delete' ||
            type === 'session' ||
            type === 'skip' ||
            type === 'availability') && (
            <button className={styles.modalOk} onClick={acceptModalFn}>
              ACCEPT
            </button>
          )}
          {(type === 'changeIsActive' || type === 'changeIsNotActive') && (
            <button className={styles.modalOk} onClick={secondAcceptModalFn}>
              ACCEPT
            </button>
          )}
          {(type === 'delete' ||
            type === 'session' ||
            type === 'skip' ||
            type === 'availability' ||
            type === 'changeIsActive' ||
            type === 'changeIsNotActive') && (
            <button className={styles.modalCancel} onClick={closeModalFn}>
              CANCEL
            </button>
          )}
          {type !== 'delete' &&
            type !== 'fetching' &&
            type !== 'session' &&
            type !== 'skip' &&
            type !== 'availability' &&
            type !== 'changeIsActive' &&
            type !== 'changeIsNotActive' && (
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
