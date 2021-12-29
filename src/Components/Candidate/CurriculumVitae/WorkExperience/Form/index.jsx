import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { validateText } from 'validations';
import { getCandidateById, updateCandidates } from 'redux/candidate/profile/thunks';
import { Link } from 'react-router-dom';
import Fieldset from 'Components/shared/Fieldset';
import Modal from 'Components/shared/Modal';
import styles from './form.module.css';

function WorkExperienceForm({ match }) {
  const dispatch = useDispatch();
  const candidate = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);
  const [experience, setExperience] = useState({});

  const id = match.params.id;

  const userAuth = useSelector((store) => store.auth.user);
  const candidateId = userAuth._id;

  useEffect(() => {
    dispatch(getCandidateById(candidateId));
  }, [dispatch]);

  useEffect(() => {
    if (id && candidate.idCandidate) {
      const experience = candidate.experiences.find((experience) => experience._id === id);
      experience.since = experience.since.substr(0, 10);
      experience.until = experience.until.substr(0, 10);
      setExperience(experience);
    }
  }, [candidate.idCandidate]);

  const submitForm = (formData) => {
    if (id) {
      formData._id = id;
      candidate.experiences = candidate.experiences.map((experience) => {
        if (experience._id === id) return formData;
        return experience;
      });
    } else {
      candidate.experiences.push(formData);
    }
    dispatch(updateCandidates(candidateId, candidate));
  };

  const validate = (formValues) => {
    const errors = {};
    errors.position = validateText(formValues.position, 'Position', 3, 40);
    errors.company = validateText(formValues.company, 'Company', 3, 40);
    errors.jobDescription = validateText(formValues.jobDescription, 'Job Description', 3, 40);
    return errors;
  };

  return (
    <>
      {modal && <Modal />}
      <section className={styles.container}>
        {!id ? (
          <h2 className={styles.mainTitle}>Add Work Experience</h2>
        ) : (
          <h2 className={styles.mainTitle}>Edit Work Experience</h2>
        )}
        <Form
          onSubmit={submitForm}
          initialValues={experience}
          validate={validate}
          render={({ handleSubmit, submitting, pristine }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field
                name="position"
                label="Position"
                element="input"
                type="text"
                component={Fieldset}
              />
              <Field
                name="company"
                label="Company"
                element="input"
                type="text"
                component={Fieldset}
              />
              <Field name="since" label="Since" element="input" type="date" component={Fieldset} />
              <Field name="until" label="Until" element="input" type="date" component={Fieldset} />
              <Field
                name="jobDescription"
                label="Job Description"
                element="input"
                type="text"
                component={Fieldset}
              />
              <div className={styles.btnContainer}>
                <Link to="/candidate/profile/work-experience" className={styles.buttonAdd}>
                  <span className={styles.buttonGreen}>BACK</span>
                </Link>
                <button
                  className={`${styles.buttonGreen} ${(submitting || pristine) && styles.disabled}`}
                  type="submit"
                  disabled={submitting || pristine}
                >
                  SUBMIT WORK EXPERIENCE
                </button>
              </div>
            </form>
          )}
        />
      </section>
    </>
  );
}

export default WorkExperienceForm;
