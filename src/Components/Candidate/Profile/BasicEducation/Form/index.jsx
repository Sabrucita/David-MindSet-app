import styles from './form.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import Modal from 'Components/shared/Modal';
import Fieldset from 'Components/Candidate/shared/Fieldset';
import { getCandidateById } from 'redux/admin/candidates/thunks';
import { createEducation, updateEducation } from 'redux/candidate/profile/thunks';
import { validateText } from 'validations';
import { Link } from 'react-router-dom';

function BasicEducation({ match }) {
  const dispatch = useDispatch();
  const selectedCandidate = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);
  const [selectedEducation, setSelectedEducation] = useState({});

  const id = '61bfc7ea55715dcf9f552e15';
  const idEducation = match.params.id;

  useEffect(() => {
    dispatch(getCandidateById(id));
  }, [dispatch]);

  useEffect(() => {
    if (idEducation && selectedCandidate.idCandidate) {
      const education = selectedCandidate.education.find((element) => element._id === idEducation);
      education.graduationYear = education.graduationYear?.substr(0, 10);
      setSelectedEducation(education);
    }
  }, [selectedCandidate.idCandidate]);

  const submitForm = (formValues) => {
    if (idEducation) {
      formValues._id = idEducation;
      selectedCandidate.education = selectedCandidate.education.map((element) => {
        if (element._id === idEducation) return formValues;
        return element;
      });
      return dispatch(updateEducation(selectedCandidate));
    }
    dispatch(createEducation(selectedCandidate, formValues));
  };

  const validate = (formValues) => {
    const errors = {};
    errors.description = validateText(formValues.description, 'Description', 2, 40);
    errors.type = validateText(formValues.type, 'Type', 2, 40);
    errors.institution = validateText(formValues.institution, 'Institution');
    errors.city = validateText(formValues.city, 'City', 2, 40);
    errors.state = validateText(formValues.state, ' State', 2, 40);
    return errors;
  };

  return (
    <>
      {modal && <Modal acceptModalFn />}
      <section className={styles.container}>
        {!idEducation ? (
          <h2 className={styles.mainTitle}>Add Basic Education</h2>
        ) : (
          <h2 className={styles.mainTitle}>Edit Basic Education</h2>
        )}
        <div className={styles.item}>
          <Form
            onSubmit={submitForm}
            initialValues={selectedEducation}
            validate={validate}
            render={({ handleSubmit, submitting, pristine }) => (
              <form className={styles.form} onSubmit={handleSubmit}>
                <Field
                  name="description"
                  label="Title"
                  element="input"
                  type="text"
                  component={Fieldset}
                />
                <div>
                  <label>Type</label>
                  <Field name="type" component="select">
                    <option />
                    <option value="Elementary">Elementary</option>
                    <option value="Middle">Middle</option>
                    <option value="High">High</option>
                  </Field>
                </div>
                <Field
                  name="institution"
                  label="Institution"
                  element="input"
                  type="text"
                  component={Fieldset}
                />
                <Field name="city" label="City" element="input" type="text" component={Fieldset} />
                <Field
                  name="state"
                  label="State"
                  element="input"
                  type="text"
                  component={Fieldset}
                />
                <Field
                  name="graduationYear"
                  label="Graduation Date"
                  element="input"
                  type="date"
                  component={Fieldset}
                />

                <div className={styles.btnContainer}>
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

export default BasicEducation;
