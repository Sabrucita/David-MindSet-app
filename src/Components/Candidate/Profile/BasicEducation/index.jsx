import styles from 'Components/Candidate/Profile/BasicEducation/basicEducation.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader/index';
import Modal from 'Components/shared/Modal';
import { showModal } from 'redux/modal/actions';
import { deleteEducation, getCandidateById } from 'redux/candidate/profile/thunks';
import { formatDate } from 'helpers';

function BasicEducation({ match }) {
  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();
  const selectedCandidate = useSelector((store) => store.candidates.selectedElement);
  const candidates = useSelector((store) => store.candidates);
  const modal = useSelector((state) => state.modal.show);
  const { url } = useRouteMatch();
  let basicEducation = [];
  const id = '61bfc7ea55715dcf9f552e15';

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
    basicEducation = selectedCandidate.education.filter(
      (element) =>
        element.type === 'Elementary' || element.type === 'Middle' || element.type === 'High'
    );
  }

  return (
    <>
      <section className={styles.container}>
        {modal && <Modal acceptModalFn={acceptModal} />}
        <h1 className={styles.h1}>BASIC EDUCATION</h1>
        {candidates.isFetching ? (
          <Preloader />
        ) : (
          <>
            {basicEducation.length !== 0 ? (
              basicEducation.map((element) => {
                return (
                  <div key={element._id} className={styles.boxContainer}>
                    <div className={styles.box}>
                      <div className={styles.boxItem}>
                        <h2>Title</h2>
                        <span>{element.description}</span>
                      </div>
                      <div className={styles.boxItem}>
                        <h2>Type</h2>
                        <span>{element.type}</span>
                      </div>
                      <div className={styles.boxItem}>
                        <h3>Institution</h3>
                        <span>{element.institution}</span>
                      </div>
                      <div className={styles.boxItem}>
                        <h3>City</h3>
                        <span>{element.city}</span>
                      </div>
                      <div className={styles.boxItem}>
                        <h3>State</h3>
                        <span>{element.state}</span>
                      </div>
                      <div className={styles.boxItem}>
                        <h3>Graduation Date</h3>
                        {element.graduationYear ? (
                          <span>{formatDate(element.graduationYear, false)}</span>
                        ) : (
                          <span>On going</span>
                        )}
                      </div>
                    </div>
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
              <p>There is no Basic Education yet.</p>
            )}
          </>
        )}
        <Link to={`${url}/form`} className={styles.addMore}>
          <span>add more +</span>
        </Link>
        <Link to="/profile/personal-information" className={styles.buttonAdd}>
          <span className={styles.buttonGreen}>GO BACK</span>
        </Link>
        <Link to="/profile/college-education" className={styles.buttonAdd}>
          <span className={styles.buttonGreen}>CONTINUE</span>
        </Link>
      </section>
    </>
  );
}

export default BasicEducation;
