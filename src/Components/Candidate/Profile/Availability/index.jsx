import styles from './availability.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader/index';
import Modal from 'Components/shared/Modal';
import { getCandidateById, updateOpenToWork } from 'redux/candidate/profile/thunks';
import ListDayItem from './ListDayItem';

function Availability() {
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

  const switchOpenToWork = () => {
    selectedCandidate.isOpenToWork = !selectedCandidate.isOpenToWork;
    dispatch(updateOpenToWork(selectedCandidate));
  };

  return (
    <>
      {modal && <Modal />}
      <section className={styles.container}>
        <h1 className={styles.title}>Availability</h1>
        {candidates.isFetching ? (
          <Preloader />
        ) : (
          <div className={styles.tableContainer}>
            <div className={styles.openToWork}>
              <span>Are you looking for a job?</span>
              <button
                type="button"
                className={
                  selectedCandidate?.isOpenToWork ? styles.btnAvailable : styles.btnNotAvailable
                }
                onClick={() => switchOpenToWork()}
              ></button>
            </div>
            {selectedCandidate?.isOpenToWork ? (
              <>
                <div className={styles.textIntro}>
                  <p>This is your available time ranges for job interviews.</p>
                  <p>
                    If you are looking for a job, companies will set interviews with you in these
                    time ranges.
                  </p>
                </div>
                <table>
                  <thead>
                    <tr>
                      <td>DAY</td>
                      <td>SINCE</td>
                      <td>UNTIL</td>
                    </tr>
                  </thead>
                  <tbody>
                    <ListDayItem
                      title={'MONDAY'}
                      startTime={selectedCandidate.timeRange?.mon?.startTime}
                      endTime={selectedCandidate.timeRange?.mon?.endTime}
                    />
                    <ListDayItem
                      title={'TUESDAY'}
                      startTime={selectedCandidate.timeRange?.tue?.startTime}
                      endTime={selectedCandidate.timeRange?.tue?.endTime}
                    />
                    <ListDayItem
                      title={'WEDNESDAY'}
                      startTime={selectedCandidate.timeRange?.wed?.startTime}
                      endTime={selectedCandidate.timeRange?.wed?.endTime}
                    />
                    <ListDayItem
                      title={'THURSDAY'}
                      startTime={selectedCandidate.timeRange?.thu?.startTime}
                      endTime={selectedCandidate.timeRange?.thu?.endTime}
                    />
                    <ListDayItem
                      title={'FRIDAY'}
                      startTime={selectedCandidate.timeRange?.fri?.startTime}
                      endTime={selectedCandidate.timeRange?.fri?.endTime}
                    />
                  </tbody>
                </table>
                <Link to={`${url}/form`} className={styles.addMore}>
                  <span>Update Availability Time Ranges</span>
                </Link>
              </>
            ) : (
              ''
            )}
          </div>
        )}
        <div className={styles.btnContainer}>
          <Link to="/candidate/profile/job-interviews" className={styles.buttonAdd}>
            <span className={styles.buttonGreen}>GO BACK</span>
          </Link>
          <Link to="/candidate/profile/job-oportunities" className={styles.buttonAdd}>
            <span className={styles.buttonGreen}>CONTINUE</span>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Availability;
