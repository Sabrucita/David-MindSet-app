import styles from 'Components/Candidate/Profile/JobOpportunites/jobOpportunities.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import Preloader from 'Components/shared/Preloader/index';
import { getPositions } from 'redux/candidate/profile/thunks';

function jobOpportunities() {
  const dispatch = useDispatch();
  const openPositions = useSelector((store) => store.openPositions);
  const { url } = useRouteMatch();
  let jobOpportunities = [];

  const userAuth = useSelector((store) => store.auth.user);
  const id = userAuth._id;

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.h1}>Job Opportunities</h1>
        {openPositions.isFetching ? (
          <Preloader />
        ) : (
          <>
            {jobOpportunities.length !== 0 ? (
              jobOpportunities.map((element) => {
                return (
                  <div key={element._id} className={styles.boxContainer}>
                    <div className={styles.box}>
                      <div className={styles.boxItem}>
                        <h2>Job Opportunity</h2>
                        <span>{element.jobDescription}</span>
                      </div>
                      <div className={styles.boxItem}>
                        <h3>Company</h3>
                        <span>{element.idCompany.name}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>There are no job opportunities.</p>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default jobOpportunities;
