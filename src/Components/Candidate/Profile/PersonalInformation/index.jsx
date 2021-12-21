import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { getCandidateById } from 'redux/admin/candidates/thunks';
import Modal from 'Components/shared/Modal';
import Preloader from 'Components/shared/Preloader';
import styles from './personal-information-list.module.css';

function PersonalInformationList() {
  const dispatch = useDispatch();
  const candidate = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);
  const { url } = useRouteMatch();

  const id = '619188555b9988bf252a4d5a';

  useEffect(() => {
    dispatch(getCandidateById(id));
  }, [dispatch]);

  return (
    <>
      {modal && <Modal />}
      <section className={styles.container}>
        <h2 className={styles.title}>Personal Information</h2>
        {candidate.isFetching ? (
          <Preloader />
        ) : (
          <>
            {candidate ? (
              <div key={candidate._id} className={styles.infoContainer}>
                <ul>
                  <li>First Name: {candidate.firstName}</li>
                  <li>Last Name: {candidate.lastName}</li>
                  <li>Phone Number: {candidate.phone}</li>
                  <li>City: {candidate.city}</li>
                  <li>Province: {candidate.province}</li>
                  <li>Country: {candidate.country}</li>
                  <li>Birthday: {candidate.birthday}</li>
                  <li>Address Street: {candidate.address?.street}</li>
                  <li>Address Number: {candidate.address?.number}</li>
                  <li>Picture URL: {candidate.pictureUrl}</li>
                  <img src={candidate.pictureUrl} />
                </ul>
              </div>
            ) : (
              <p>There is no personal information yet.</p>
            )}
            <Link to={`${url}/form`} className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>EDIT INFORMATION</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default PersonalInformationList;
