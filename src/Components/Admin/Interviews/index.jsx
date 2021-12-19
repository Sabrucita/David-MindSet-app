import { useEffect, useState } from 'react';
import styles from './interviews.module.css';
import List from './List';
import Modal from 'Components/shared/Modal';
import { Link } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInterview, getInterviews } from 'redux/interviews/thunks';
import { showModal } from 'redux/modal/actions';
import { interviewsCleanUp } from 'redux/interviews/actions';

function Interviews() {
  const [selectedItem, setSelectedItem] = useState();

  const dispatch = useDispatch();
  const interviews = useSelector((store) => store.interviews);
  const modal = useSelector((state) => state.modal.show);

  useEffect(() => {
    dispatch(getInterviews());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(interviewsCleanUp());
    };
  }, []);

  const openModal = (item, type) => {
    setSelectedItem(item);
    dispatch(showModal('interviews', type, item));
  };

  //MODAL CONFIRM DELETE
  const acceptModal = () => {
    dispatch(deleteInterview(selectedItem.id));
  };

  const tableHeader = ['Company	', 'Candidate	', 'Date', 'Status', 'Action'];

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
            <Link to="/admin/interviews/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD INTERVIEW</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Interviews;
