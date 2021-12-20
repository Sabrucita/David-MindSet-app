import styles from 'Components/Candidate/Profile/CollegeEducation/collegeEducation.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader/index';
import { getCandidateById } from 'redux/admin/candidates/thunks';
import Modal from 'Components/shared/Modal';
import { showModal } from 'redux/modal/actions';
import { deleteEducation } from 'redux/candidate/profile/thunks';
// import { adminsCleanUp } from 'redux/admin/admins/actions';

function CollegeEducation({ match }) {
  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();
  const selectedCandidate = useSelector((store) => store.candidates.selectedElement);
  const candidates = useSelector((store) => store.candidates);
  const modal = useSelector((state) => state.modal.show);

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

  return (
    <>
      <section className={styles.container}>
        {modal && <Modal acceptModalFn={acceptModal} />}
        <h1 className={styles.h1}>COLLEGE EDUCATION & POST GRADUATE</h1>
        {candidates.isFetching ? (
          <Preloader />
        ) : (
          selectedCandidate.education.map((element) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div className={styles.boxContainer}>
                <div className={styles.box}>
                  <div className={styles.boxItem}>
                    <h2>Title</h2>
                    <span>{element.description}</span>
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
                    <span>{element.graduationYear}</span>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button className="edit-btn">
                    <span className="material-icons-outlined">edit</span>
                  </button>
                  <button onClick={() => openModal(element, 'delete')}>
                    <span className="material-icons-outlined">clear</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
        <Link to="/candidate/profile/college-education/form" className={styles.addMore}>
          <span>add more +</span>
        </Link>
        <Link to="/profile/other-education" className={styles.buttonAdd}>
          <span className={styles.buttonGreen}>CONTINUE</span>
        </Link>
      </section>
    </>
  );
}

export default CollegeEducation;

// const initialValues = [
//   {
//     id: '1',
//     description: 'acount',
//     institution: 'uca',
//     city: 'rosario',
//     state: 'santa fe',
//     graduationYear: '2021-12-06'
//   },
//   {
//     id: '2',
//     description: 'inge',
//     institution: 'utn',
//     city: 'rosario',
//     state: 'santa fe',
//     graduationYear: '2021-12-06'
//   }
// ];
