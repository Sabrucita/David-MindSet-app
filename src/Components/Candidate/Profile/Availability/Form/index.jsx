import styles from './availability.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import Modal from 'Components/shared/Modal';
import { getCandidateById, updateTimeRange } from 'redux/candidate/profile/thunks';
import { validateTime } from 'validations';
import { Link } from 'react-router-dom';

function AvailabilityForm() {
  const [monday, setMonday] = useState();
  const [tuesday, setTuesday] = useState();
  const [wednesday, setWednesday] = useState();
  const [thursday, setThursday] = useState();
  const [friday, setFriday] = useState();

  const dispatch = useDispatch();
  const selectedCandidate = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  const userAuth = useSelector((store) => store.auth.user);
  const id = userAuth._id;

  useEffect(() => {
    dispatch(getCandidateById(id));
  }, [dispatch]);

  useEffect(() => {
    let timeRange = selectedCandidate.timeRange;
    if (timeRange?.mon?.startTime && timeRange?.mon?.endTime) setMonday(true);
    if (timeRange?.tue?.startTime && timeRange?.tue?.endTime) setTuesday(true);
    if (timeRange?.wed?.startTime && timeRange?.wed?.endTime) setWednesday(true);
    if (timeRange?.thu?.startTime && timeRange?.thu?.endTime) setThursday(true);
    if (timeRange?.fri?.startTime && timeRange?.fri?.endTime) setFriday(true);
  }, [selectedCandidate]);

  const submitForm = (formValues) => {
    if (!monday || (!formValues?.mon?.startTime && !formValues?.mon?.endTime)) {
      formValues.mon = '';
    } else {
      formValues.mon.startTime = parseInt(formValues.mon.startTime);
      formValues.mon.endTime = parseInt(formValues.mon.endTime);
    }
    if (!tuesday || (!formValues?.tue?.startTime && !formValues?.tue?.endTime)) {
      formValues.tue = '';
    } else {
      formValues.tue.startTime = parseInt(formValues.tue.startTime);
      formValues.tue.endTime = parseInt(formValues.tue.endTime);
    }
    if (!wednesday || (!formValues?.wed?.startTime && !formValues?.wed?.endTime)) {
      formValues.wed = '';
    } else {
      formValues.wed.startTime = parseInt(formValues.wed.startTime);
      formValues.wed.endTime = parseInt(formValues.wed.endTime);
    }
    if (!thursday || (!formValues?.thu?.startTime && !formValues?.thu?.endTime)) {
      formValues.thu = '';
    } else {
      formValues.thu.startTime = parseInt(formValues.thu.startTime);
      formValues.thu.endTime = parseInt(formValues.thu.endTime);
    }
    if (!friday || (!formValues?.fri?.startTime && !formValues?.fri?.endTime)) {
      formValues.fri = '';
    } else {
      formValues.fri.startTime = parseInt(formValues.fri.startTime);
      formValues.fri.endTime = parseInt(formValues.fri.endTime);
    }
    selectedCandidate.timeRange = formValues;
    dispatch(updateTimeRange(selectedCandidate));
  };

  const changeAvailability = (day) => {
    switch (day) {
      case 'mon':
        setMonday(!monday);
        break;
      case 'tue':
        setTuesday(!tuesday);
        break;
      case 'wed':
        setWednesday(!wednesday);
        break;
      case 'thu':
        setThursday(!thursday);
        break;
      case 'fri':
        setFriday(!friday);
        break;
      default:
        break;
    }
  };

  const validate = (formValues) => {
    const errors = {};
    errors.mon = {
      startTime: validateTime(monday, formValues?.mon?.startTime, formValues?.mon?.endTime)
    };
    errors.tue = {
      startTime: validateTime(tuesday, formValues?.tue?.startTime, formValues?.tue?.endTime)
    };
    errors.wed = {
      startTime: validateTime(wednesday, formValues?.wed?.startTime, formValues?.wed?.endTime)
    };
    errors.thu = {
      startTime: validateTime(thursday, formValues?.thu?.startTime, formValues?.thu?.endTime)
    };
    errors.fri = {
      startTime: validateTime(friday, formValues?.fri?.startTime, formValues?.fri?.endTime)
    };
    return errors;
  };

  return (
    <>
      {modal && <Modal acceptModalFn />}
      <section className={styles.container}>
        <h2 className={styles.title}>Update Available Time Ranges</h2>
        <Form
          onSubmit={submitForm}
          initialValues={selectedCandidate.timeRange}
          validate={validate}
          render={({ handleSubmit, submitting }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.tableContainer}>
                <table>
                  <thead>
                    <tr>
                      <td>DAY</td>
                      <td>SINCE HOUR</td>
                      <td>UNTIL HOUR</td>
                      <td>ACTION</td>
                    </tr>
                  </thead>
                  <tbody>
                    {/*-------------------MONDAY----------------------*/}
                    <tr>
                      <td>MONDAY</td>
                      {monday ? (
                        <>
                          <td>
                            <Field name="mon.startTime" type="number" component="input" />
                          </td>
                          <td>
                            <Field name="mon.endTime" type="number" component="input" />
                          </td>
                        </>
                      ) : (
                        <td colSpan="2">Not Available</td>
                      )}
                      <td>
                        <button
                          type="button"
                          className={monday ? styles.btnAvailable : styles.btnNotAvailable}
                          onClick={() => changeAvailability('mon')}
                        >
                          {monday ? 'Set NOT Available' : 'Set Available'}
                        </button>
                      </td>
                    </tr>
                    <Field name="mon">
                      {({ meta }) => (
                        <tr>
                          <td></td>
                          <td colSpan="2" className={styles.messageError}>
                            {meta.error && meta.error?.startTime}
                          </td>
                        </tr>
                      )}
                    </Field>
                    {/*-------------------TUESDAY----------------------*/}
                    <tr>
                      <td>TUESDAY</td>
                      {tuesday ? (
                        <>
                          <td>
                            <Field name="tue.startTime" type="number" component="input" />
                          </td>
                          <td>
                            <Field name="tue.endTime" type="number" component="input" />
                          </td>
                        </>
                      ) : (
                        <td colSpan="2">Not Available</td>
                      )}
                      <td>
                        <button
                          type="button"
                          className={tuesday ? styles.btnAvailable : styles.btnNotAvailable}
                          onClick={() => changeAvailability('tue')}
                        >
                          {tuesday ? 'Set NOT Available' : 'Set Available'}
                        </button>
                      </td>
                    </tr>
                    <Field name="tue">
                      {({ meta }) => (
                        <tr>
                          <td></td>
                          <td colSpan="2" className={styles.messageError}>
                            {meta.error && meta.error?.startTime}
                          </td>
                        </tr>
                      )}
                    </Field>
                    {/*-------------------WEDNESDAY----------------------*/}
                    <tr>
                      <td>WEDNESDAY</td>
                      {wednesday ? (
                        <>
                          <td>
                            <Field name="wed.startTime" type="number" component="input" />
                          </td>
                          <td>
                            <Field name="wed.endTime" type="number" component="input" />
                          </td>
                        </>
                      ) : (
                        <td colSpan="2">Not Available</td>
                      )}
                      <td>
                        <button
                          type="button"
                          className={wednesday ? styles.btnAvailable : styles.btnNotAvailable}
                          onClick={() => changeAvailability('wed')}
                        >
                          {wednesday ? 'Set NOT Available' : 'Set Available'}
                        </button>
                      </td>
                    </tr>
                    <Field name="wed">
                      {({ meta }) => (
                        <tr>
                          <td></td>
                          <td colSpan="2" className={styles.messageError}>
                            {meta.error && meta.error?.startTime}
                          </td>
                        </tr>
                      )}
                    </Field>
                    {/*-------------------THURSDAY----------------------*/}
                    <tr>
                      <td>THURSDAY</td>
                      {thursday ? (
                        <>
                          <td>
                            <Field name="thu.startTime" type="number" component="input" />
                          </td>
                          <td>
                            <Field name="thu.endTime" type="number" component="input" />
                          </td>
                        </>
                      ) : (
                        <td colSpan="2">Not Available</td>
                      )}
                      <td>
                        <button
                          type="button"
                          className={thursday ? styles.btnAvailable : styles.btnNotAvailable}
                          onClick={() => changeAvailability('thu')}
                        >
                          {thursday ? 'Set NOT Available' : 'Set Available'}
                        </button>
                      </td>
                    </tr>
                    <Field name="thu">
                      {({ meta }) => (
                        <tr>
                          <td></td>
                          <td colSpan="2" className={styles.messageError}>
                            {meta.error && meta.error?.startTime}
                          </td>
                        </tr>
                      )}
                    </Field>
                    {/*-------------------FRIDAY----------------------*/}
                    <tr>
                      <td>FRIDAY</td>
                      {friday ? (
                        <>
                          <td>
                            <Field name="fri.startTime" type="number" component="input" />
                          </td>
                          <td>
                            <Field name="fri.endTime" type="number" component="input" />
                          </td>
                        </>
                      ) : (
                        <td colSpan="2">Not Available</td>
                      )}
                      <td>
                        <button
                          type="button"
                          className={friday ? styles.btnAvailable : styles.btnNotAvailable}
                          onClick={() => changeAvailability('fri')}
                        >
                          {friday ? 'Set NOT Available' : 'Set Available'}
                        </button>
                      </td>
                    </tr>
                    <Field name="fri">
                      {({ meta }) => (
                        <tr>
                          <td></td>
                          <td colSpan="2" className={styles.messageError}>
                            {meta.error && meta.error?.startTime}
                          </td>
                        </tr>
                      )}
                    </Field>
                    {/*-------------------END----------------------*/}
                  </tbody>
                </table>
              </div>
              <div className={styles.btnContainer}>
                <Link to="/candidate/profile/availability" className={styles.buttonAdd}>
                  <span className={styles.buttonGreen}>GO BACK</span>
                </Link>
                <button
                  className={`${styles.buttonGreen} ${submitting && styles.disabled}`}
                  type="submit"
                  disabled={submitting}
                >
                  SUBMIT
                </button>
              </div>
            </form>
          )}
        />
      </section>
    </>
  );
}

export default AvailabilityForm;
