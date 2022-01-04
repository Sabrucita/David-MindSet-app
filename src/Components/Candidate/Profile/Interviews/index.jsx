import styles from 'Components/Candidate/Profile/Interviews/interviews.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader/index';
import Modal from 'Components/shared/Modal';
import { showModal } from 'redux/modal/actions';
import { deleteInterview, getInterview } from 'redux/candidate/profile/thunks';
import List from 'Components/Candidate/Profile/Interviews//List';
import { interviewsCleanUp } from 'redux/admin/interviews/actions';
import { formatDate } from 'helpers';

function Interviews() {
  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();
  const selectedInterview = useSelector((store) => store.interviews.selectedElement);
  const modal = useSelector((state) => state.modal.show);
  const { url } = useRouteMatch();
  const interviews = useSelector((store) => store.interviews.list);
  const userAuth = useSelector((store) => store.auth.user);
  const id = userAuth._id;
  const [candidateInterview, setCandidateInterview] = useState([]);

  useEffect(() => {
    if (!interviews.lenght) {
      dispatch(getInterview(id));
    }
  }, []);

  useEffect(() => {
    setCandidateInterview(
      interviews.filter(
        (interview) => interview.candidate._id === process.env.REACT_APP_CANDIDATES_ID
      )
    );
  }, [interviews]);

  useEffect(() => {
    return () => {
      dispatch(interviewsCleanUp());
    };
  }, []);

  // MODAL
  const openModal = (item, type) => {
    setSelectedItem(item);
    dispatch(showModal('Interviews', type, item));
  };

  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    dispatch(deleteInterview(id, selectedInterview, selectedItem._id));
  };
  /*
  return (
    <>
      <section className={styles.container}>
        {modal && <Modal acceptModalFn={acceptModal} />}
        <h1 className={styles.h1}>Interviews</h1>
        {interviews.isFetching ? (
          <Preloader />
        ) : (
          <>
            {interviews.length !== 0 ? (
              interviews.map((element) => {
                return (
                  <div key={element._id} className={styles.boxContainer}>
                    <div className={styles.box}>
                      <div className={styles.boxItem}>
                        <h2>There are no interviews</h2>
                      </div>
                      <div className={styles.boxItem}>
                        <h2>Date</h2>
                        <span>{element.date}</span>
                      </div>
                      <div className={styles.boxItem}>
                        <h2>Time</h2>
                        <span>{element.time}</span>
                      </div>
                      <div className={styles.boxItem}>
                        <h3>Company</h3>
                        <span>{element.company}</span>
                      </div>
                      <div className={styles.boxItem}>
                        <h3>Position</h3>
                        <span>{element.jobDescription}</span>
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
              <p>There are no Interviews.</p>
            )}
          </>
        )}
        <Link to={`${url}/form`} className={styles.addMore}>
          <span>add more +</span>
        </Link>
        <div className={styles.btnContainer}>
          <Link to="/candidate/profile/personal-information" className={styles.buttonAdd}>
            <span className={styles.buttonGreen}>GO BACK</span>
          </Link>
          <Link to="/candidate/profile/college-education" className={styles.buttonAdd}>
            <span className={styles.buttonGreen}>CONTINUE</span>
          </Link>
        </div>
      </section>
    </>
  );
}
*/
  const tableHeader = [
    'Company',
    'Candidate',
    'Job Description',
    'Date',
    'Time',
    'Status',
    'Action'
  ];

  return (
    <>
      {modal && <Modal acceptModalFn={acceptModal} />}
      <section className={styles.container}>
        <h1>Interviews</h1>
        {interviews.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={interviews.list} header={tableHeader} openModal={openModal} />
            {/*
            <Link to={`${url}/form`} className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD INTERVIEW</span>
            </Link>
            */}
          </>
        )}
      </section>
    </>
  );
}
export default Interviews;
