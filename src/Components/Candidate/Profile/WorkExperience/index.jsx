import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { getCandidateById, updateCandidates } from 'redux/candidate/profile/thunks';
import { showModal } from 'redux/modal/actions';
import Modal from 'Components/shared/Modal';
import Preloader from 'Components/shared/Preloader';
import styles from './workExperience.module.css';

function WorkExperience() {
  const dispatch = useDispatch();
  const candidate = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);
  const [selectedExperience, setSelectedExperience] = useState({});
  const { url } = useRouteMatch();

  const candidateId = '619188555b9988bf252a4d5a'; //Hardcoded until we decide how to store which user is logged in.

  useEffect(() => {
    dispatch(getCandidateById(candidateId));
  }, [dispatch]);

  const openModal = (experience) => {
    dispatch(showModal('experiences', 'delete', experience));
    setSelectedExperience(experience);
  };

  const deleteItem = () => {
    candidate.experiences = candidate.experiences.filter(
      (experience) => experience._id !== selectedExperience._id
    );
    dispatch(updateCandidates(candidateId, candidate));
  };

  return (
    <>
      {modal && <Modal acceptModalFn={deleteItem} />}
      <section className={styles.container}>
        <h2 className={styles.title}>Work Experience</h2>
        {candidate.isFetching ? (
          <Preloader />
        ) : (
          <>
            {candidate.experiences ? (
              candidate.experiences.map((experience) => {
                return (
                  <div key={experience._id} className={styles.experienceContainer}>
                    <ul>
                      <li>Position: {experience.position}</li>
                      <li>Company: {experience.company}</li>
                      <li>Since: {experience.since}</li>
                      <li>Until: {experience.until}</li>
                      <li>Job Description: {experience.jobDescription}</li>
                    </ul>
                    <Link to={`${url}/form/${experience._id}`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => openModal(experience)}>Delete</button>
                  </div>
                );
              })
            ) : (
              <p>There is no work experience yet.</p>
            )}
            <Link to={`${url}/form`} className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD EXPERIENCE</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default WorkExperience;
