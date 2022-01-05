import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sessions from 'Components/Candidate/Profile/Session';
import Preloader from 'Components/shared/Preloader';
import { getCandidateById } from 'redux/candidate/profile/thunks';
import { Redirect } from 'react-router-dom';
import styles from './profile.module.css';

function Profile() {
  const dispatch = useDispatch();
  const candidates = useSelector((store) => store.candidateProfile);
  const hasPendingSession = useSelector(
    (store) => store.candidateProfile.selectedElement.hasPendingSession
  );

  const userAuth = useSelector((store) => store.auth.user);
  const candidateId = userAuth._id;

  useEffect(() => {
    dispatch(getCandidateById(candidateId));
  }, [dispatch]);

  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.title}>Profile</h1>
        {candidates.isFetching ? (
          <Preloader />
        ) : (
          <>{hasPendingSession ? <Sessions /> : <Redirect to="candidate/home" />}</>
        )}
      </section>
    </>
  );
}

export default Profile;
