import styles from 'Components/Candidate/CurriculumVitae/OtherEducation/otherEducation.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader/index';
import Modal from 'Components/shared/Modal';
import { showModal } from 'redux/modal/actions';
import { deleteOtherEducation, getCandidateById } from 'redux/candidate/profile/thunks';
import { formatDate } from 'helpers';

function OtherEducation() {
  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();
  const selectedCandidate = useSelector((store) => store.candidates.selectedElement);
  const candidates = useSelector((store) => store.candidates);
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
    dispatch(showModal('courses', type, item));
  };

  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    dispatch(deleteOtherEducation(id, selectedCandidate, selectedItem._id));
  };

  return (
    <>
      {modal && <Modal acceptModalFn={acceptModal} />}
      <section className={styles.container}>
        <h1 className={styles.title}>Other Education & Languages</h1>
        {candidates.isFetching ? (
          <Preloader />
        ) : (
          <>
            <div className={styles.boxesContainer}>
              {selectedCandidate.courses ? (
                selectedCandidate.courses.map((element) => {
                  return (
                    <div key={element._id} className={styles.boxContainer}>
                      <ul>
                        <li className={styles.boxItem}>
                          <span>Title:</span>
                          <span>{element.tittle}</span>
                        </li>
                        <li className={styles.boxItem}>
                          <span>Institution:</span>
                          <span>{element.institution}</span>
                        </li>
                        <li className={styles.boxItem}>
                          <span>Year:</span>
                          {element.year ? (
                            <span>{formatDate(element.year, false)}</span>
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
                <p>There is no Other Education yet.</p>
              )}
            </div>
          </>
        )}
        <Link to={`${url}/form`} className={styles.addMore}>
          <span>add more +</span>
        </Link>
        <div className={styles.btnContainer}>
          <Link to="/candidate/curriculumvitae/college-education" className={styles.buttonAdd}>
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

export default OtherEducation;
