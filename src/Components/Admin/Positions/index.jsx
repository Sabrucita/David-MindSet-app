import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePosition, getPositions } from 'redux/admin/positions/thunks';
import { positionsCleanup } from 'redux/admin/positions/actions';
import List from './List';
import Modal from 'Components/shared/Modal';
import Preloader from 'Components/shared/Preloader';
import styles from './positions.module.css';

function Positions() {
  const dispatch = useDispatch();
  const positions = useSelector((store) => store.positions);
  const modal = useSelector((store) => store.modal.show);

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(positionsCleanup());
    };
  }, []);

  const deleteItem = () => {
    dispatch(deletePosition(positions.selectedElement.id));
  };

  return (
    <>
      {modal && <Modal acceptModalFn={deleteItem} />}
      <section className={styles.container}>
        <h1 className={styles.mainTitle}>Positions</h1>
        {positions.isFetching ? (
          <Preloader />
        ) : (
          <>
            <List data={positions.list} />
            <Link to="/admin/positions/form" className={styles.buttonAdd}>
              <span className={styles.buttonGreen}>ADD POSITION</span>
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Positions;
