import styles from './otherEducationForm.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import Modal from 'Components/shared/Modal';
import Fieldset from 'Components/shared/Fieldset';
import {
  getCandidateById,
  createOtherEducation,
  updateOtherEducation
} from 'redux/candidate/profile/thunks';
import { validateText } from 'validations';
import { Link } from 'react-router-dom';

function OtherEducation({ match }) {
  const dispatch = useDispatch();
  const selectedCandidate = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);
  const [selectedEducation, setSelectedEducation] = useState({});

  const idEducation = match.params.id;

  const userAuth = useSelector((store) => store.auth.user);
  const id = userAuth._id;

  useEffect(() => {
    dispatch(getCandidateById(id));
  }, [dispatch]);

  useEffect(() => {
    if (idEducation && selectedCandidate.idCandidate) {
      const courses = selectedCandidate.courses.find((element) => element._id === idEducation);
      courses.year = courses.year?.substr(0, 10);
      setSelectedEducation(courses);
    }
  }, [selectedCandidate.idCandidate]);

  const submitForm = (formValues) => {
    if (idEducation) {
      formValues._id = idEducation;
      selectedCandidate.courses = selectedCandidate.courses.map((element) => {
        if (element._id === idEducation) return formValues;
        return element;
      });
      return dispatch(updateOtherEducation(selectedCandidate));
    }
    dispatch(createOtherEducation(selectedCandidate, formValues, 'courses'));
  };

  const validate = (formValues) => {
    const errors = {};
    errors.tittle = validateText(formValues.tittle, 'Title', 3);
    errors.institution = validateText(formValues.institution, 'Institution', 2);
    return errors;
  };

  return (
    <>
      {modal && <Modal acceptModalFn />}
      <section className={styles.container}>
        {!idEducation ? (
          <h2 className={styles.mainTitle}>Add Other Education</h2>
        ) : (
          <h2 className={styles.mainTitle}>Edit Other Education</h2>
        )}
        <div className={styles.item}>
          <Form
            onSubmit={submitForm}
            initialValues={selectedEducation}
            validate={validate}
            render={({ handleSubmit, submitting, pristine }) => (
              <form className={styles.form} onSubmit={handleSubmit}>
                <Field
                  name="tittle"
                  label="Title"
                  element="input"
                  type="text"
                  component={Fieldset}
                />
                <Field
                  name="institution"
                  label="Institution"
                  element="input"
                  type="text"
                  component={Fieldset}
                />
                <Field
                  name="year"
                  label="Graduation Year"
                  element="input"
                  type="date"
                  component={Fieldset}
                />
                <div className={styles.btnContainer}>
                  <Link
                    to="/candidate/curriculumvitae/other-education"
                    className={styles.buttonAdd}
                  >
                    <span className={styles.buttonGreen}>GO BACK</span>
                  </Link>
                  <button
                    className={`${styles.buttonGreen} ${
                      (submitting || pristine) && styles.disabled
                    }`}
                    type="submit"
                    disabled={submitting || pristine}
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </section>
    </>
  );
}

export default OtherEducation;
