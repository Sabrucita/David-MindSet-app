import styles from 'Components/Candidate/CurriculumVitae/CollegeEducation/collegeEducation.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader/index';
import Modal from 'Components/shared/Modal';
import { showModal } from 'redux/modal/actions';
import { deleteEducation, getCandidateById } from 'redux/candidate/profile/thunks';
import { formatDate } from 'helpers';

function CollegeEducation() {
  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();
  const selectedCandidate = useSelector((store) => store.candidateProfile.selectedElement);
  const candidates = useSelector((store) => store.candidateProfile);
  const modal = useSelector((state) => state.modal.show);
  const { url } = useRouteMatch();
  let collegeEducation = [];

  const userAuth = useSelector((store) => store.auth.user);
  const id = userAuth._id;

  useEffect(() => {
    dispatch(getCandidateById(id));
  }, [dispatch]);

  // MODAL
  const openModal = (item, type) => {
    setSelectedItem(item);
    dispatch(showModal('Educations', type, item));
  };

  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    dispatch(deleteEducation(id, selectedCandidate, selectedItem._id));
  };

  if (selectedCandidate.education) {
    collegeEducation = selectedCandidate.education.filter((element) => element.type === 'college');
  }

  return (
    <>
      <section className={styles.container}>
        {modal && <Modal acceptModalFn={acceptModal} />}
        <h1 className={styles.title}>College Education & Post Graduate</h1>
        {candidates.isFetching ? (
          <Preloader />
        ) : (
          <>
            <div className={styles.boxesContainer}>
              {collegeEducation.length !== 0 ? (
                collegeEducation.map((element) => {
                  return (
                    <div key={element._id} className={styles.boxContainer}>
                      <ul>
                        <li className={styles.boxItem}>
                          <span>Title:</span>
                          <span>{element.description}</span>
                        </li>
                        <li className={styles.boxItem}>
                          <span>Institution:</span>
                          <span>{element.institution}</span>
                        </li>
                        <li className={styles.boxItem}>
                          <span>City:</span>
                          <span>{element.city}</span>
                        </li>
                        <li className={styles.boxItem}>
                          <span>State:</span>
                          <span>{element.state}</span>
                        </li>
                        <li className={styles.boxItem}>
                          <span>Graduation Date:</span>
                          {element.graduationYear ? (
                            <span>{formatDate(element.graduationYear, false)}</span>
                          ) : (
                            <span>On going</span>
                          )}
                        </li>
                      </ul>
                      <div className={styles.actions}>
                        <Link to={`${url}/form/${element._id}`}>
                          <button className="edit-btn">
                            <span className="material-icons-outlined">edit</span>
                          </button>
                        </Link>
                        <button onClick={() => openModal(element, 'delete')}>
                          <span className="material-icons-outlined">clear</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>There is no work College Education yet.</p>
              )}
            </div>
          </>
        )}
        <Link to={`${url}/form`} className={styles.addMore}>
          <span>add more +</span>
        </Link>
        <div className={styles.btnContainer}>
          <Link to="/candidate/curriculumvitae/basic-education" className={styles.buttonAdd}>
            <span className={styles.buttonGreen}>GO BACK</span>
          </Link>
          <Link to="/candidate/curriculumvitae/work-experience" className={styles.buttonAdd}>
            <span className={styles.buttonGreen}>CONTINUE</span>
          </Link>
        </div>
      </section>
    </>
  );
}

export default CollegeEducation;
