import styles from 'Components/Candidate/CurriculumVitae/CollegeEducation/collegeEducation.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader/index';
import Modal from 'Components/shared/Modal';
import { showModal } from 'redux/modal/actions';
import { deleteHobbies, getCandidateById } from 'redux/candidate/profile/thunks';

function Hobbies() {
  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();
  const selectedCandidate = useSelector((store) => store.candidateProfile.selectedElement);
  const candidates = useSelector((store) => store.candidateProfile);
  const modal = useSelector((state) => state.modal.show);
  const { url } = useRouteMatch();

  const userAuth = useSelector((store) => store.auth.user);
  const id = userAuth._id;

  useEffect(() => {
    dispatch(getCandidateById(id));
  }, [dispatch]);

  // MODAL
  const openModal = (item, type) => {
    setSelectedItem(item);
    dispatch(showModal('hobbies', type, item));
  };

  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    dispatch(deleteHobbies(id, selectedCandidate, selectedItem._id));
  };

  return (
    <>
      {modal && <Modal acceptModalFn={acceptModal} />}
      <section className={styles.container}>
        <h1 className={styles.title}>Hobbies & Skills</h1>
        {candidates.isFetching ? (
          <Preloader />
        ) : (
          <>
            <div className={styles.boxesContainer}>
              {selectedCandidate.hobbies ? (
                selectedCandidate.hobbies.map((element) => {
                  return (
                    <div key={element._id} className={styles.boxContainer}>
                      <ul>
                        <li className={styles.boxItem}>
                          <span>Title:</span>
                          <span>{element.hobbies}</span>
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
                <p>There is no Hobbies or Skills yet</p>
              )}
            </div>
          </>
        )}
        <Link to={`${url}/form`} className={styles.addMore}>
          <span>add more +</span>
        </Link>
        <div className={styles.btnContainer}>
          <Link to="/candidate/curriculumvitae/other-education" className={styles.buttonAdd}>
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

export default Hobbies;
