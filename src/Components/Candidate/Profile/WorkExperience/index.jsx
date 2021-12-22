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
  const candidates = useSelector((store) => store.candidates);
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
        {candidates.isFetching ? (
          <Preloader />
        ) : (
          <>
            <div className={styles.experiencesContainer}>
              {candidate.experiences ? (
                candidate.experiences.map((experience) => {
                  return (
                    <div key={experience._id} className={styles.experienceContainer}>
                      <ul>
                        <li className={styles.experienceItem}>
                          <span>Position:</span>
                          <span>{experience.position}</span>
                        </li>
                        <li className={styles.experienceItem}>
                          <span>Company:</span>
                          <span>{experience.company}</span>
                        </li>
                        <li className={styles.experienceItem}>
                          <span>Since:</span>
                          <span>{experience.since?.substr(0, 10)}</span>
                        </li>
                        <li className={styles.experienceItem}>
                          <span>Until:</span>
                          <span>{experience.until?.substr(0, 10)}</span>
                        </li>
                        <li className={styles.experienceItem}>
                          <span>Job Description:</span>
                          <span>{experience.jobDescription}</span>
                        </li>
                      </ul>
                      <div className={styles.actions}>
                        <Link to={`${url}/form/${experience._id}`}>
                          <button>
                            <span className="material-icons-outlined">edit</span>
                          </button>
                        </Link>
                        <button onClick={() => openModal(experience)}>
                          <span className="material-icons-outlined">clear</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>There is no work experience yet.</p>
              )}
            </div>
            <Link to={`${url}/form`} className={styles.addMore}>
              <span>add more +</span>
            </Link>
            <div className={styles.btnContainer}>
              <Link to={`college-education`} className={styles.buttonAdd}>
                <span className={styles.buttonGreen}>GO BACK</span>
              </Link>
              <Link to={`hobbies`} className={styles.buttonAdd}>
                <span className={styles.buttonGreen}>CONTINUE</span>
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default WorkExperience;
