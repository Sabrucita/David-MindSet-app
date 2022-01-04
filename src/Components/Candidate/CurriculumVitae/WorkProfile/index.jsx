import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { showModal } from 'redux/modal/actions';
import Modal from 'Components/shared/Modal';
import styles from './workProfile.module.css';

function WorkProfile({ history }) {
  const dispatch = useDispatch();
  const modal = useSelector((store) => store.modal.show);
  const { url } = useRouteMatch();

  const openModal = () => {
    dispatch(showModal('session', 'skip'));
  };

  const goToProfile = () => {
    history.push('/candidate/profile');
  };

  return (
    <>
      {modal && <Modal acceptModalFn={goToProfile} />}
      <section className={styles.container}>
        <h2 className={styles.title}>Work Profile</h2>
        <p>
          Now you need to do a psychological analysis with ours professionals. This will let us know
          what is you work profile.
        </p>
        <Link to={`${url}/available-dates`} className={styles.addMore}>
          <span>select a date</span>
        </Link>
        <div className={styles.btnContainer}>
          <Link to={`time-range`} className={styles.buttonAdd}>
            <span className={styles.buttonGreen}>GO BACK</span>
          </Link>
          <button className={styles.buttonAdd} onClick={openModal}>
            <span className={styles.buttonGreen}>SKIP</span>
          </button>
        </div>
      </section>
    </>
  );
}

export default WorkProfile;
