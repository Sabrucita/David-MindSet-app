import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { getCandidateById } from 'redux/candidate/profile/thunks';
import Modal from 'Components/shared/Modal';
import Preloader from 'Components/shared/Preloader';
import styles from './personal-information-list.module.css';

function PersonalInformationList() {
  const dispatch = useDispatch();
  const candidate = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);
  const candidates = useSelector((store) => store.candidates);
  const { url } = useRouteMatch();

  const userAuth = useSelector((store) => store.auth.user);
  const id = userAuth._id;

  useEffect(() => {
    dispatch(getCandidateById(id));
  }, [dispatch]);

  return (
    <>
      {modal && <Modal />}
      <section className={styles.container}>
        <h1 className={styles.title}>Personal Information</h1>
        {candidates.isFetching ? (
          <Preloader />
        ) : (
          <>
            {candidate ? (
              <div key={candidate._id} className={styles.infoContainer}>
                <ul>
                  <li>
                    <p className={styles.inputTitle}>First Name</p>
                    <p className={styles.inputValue}>{candidate.firstName}</p>
                  </li>
                  <li>
                    <p className={styles.inputTitle}>Last Name</p>
                    <p className={styles.inputValue}>{candidate.lastName}</p>
                  </li>
                  <li>
                    <p className={styles.inputTitle}>Phone Number</p>
                    <p className={styles.inputValue}>{candidate.phone}</p>
                  </li>
                  <li>
                    <p className={styles.inputTitle}>City</p>
                    <p className={styles.inputValue}>{candidate.city}</p>
                  </li>
                  <li>
                    <p className={styles.inputTitle}>Province</p>
                    <p className={styles.inputValue}>{candidate.province}</p>
                  </li>
                  <li>
                    <p className={styles.inputTitle}>Country</p>
                    <p className={styles.inputValue}>{candidate.country}</p>
                  </li>
                  <li>
                    <p className={styles.inputTitle}>Birthday</p>
                    <p className={styles.inputValue}>{candidate.birthday}</p>
                  </li>
                  <li>
                    <p className={styles.inputTitle}>Address Street</p>
                    <p className={styles.inputValue}>{candidate.address?.street}</p>
                  </li>
                  <li>
                    <p className={styles.inputTitle}>Address Number</p>
                    <p className={styles.inputValue}>{candidate.address?.number}</p>
                  </li>
                  <li>
                    <img className={styles.profilePicture} src={candidate.pictureUrl} />
                  </li>
                </ul>
              </div>
            ) : (
              <p>There is no personal information yet.</p>
            )}
            <div className={styles.btnContainer}>
              <Link to={`${url}/form`} className={styles.buttonAdd}>
                <span className={styles.buttonGreen}>EDIT INFORMATION</span>
              </Link>
              <Link to="basic-education" className={styles.buttonAdd}>
                <span className={styles.buttonGreen}>CONTINUE</span>
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default PersonalInformationList;
