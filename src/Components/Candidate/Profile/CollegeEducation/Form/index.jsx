import styles from 'Components/Candidate/Profile/CollegeEducation/Form/collegeEducationForm.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import Modal from 'Components/shared/Modal';
import { showModal } from 'redux/modal/actions';
// import { adminsCleanUp } from 'redux/admin/admins/actions';
import Fieldset from 'Components/Candidate/shared/Fieldset';
import { getCandidateById } from 'redux/admin/candidates/thunks';
import { createEducation } from 'redux/candidate/profile/thunks';

function CollegeEducation() {
  const dispatch = useDispatch();
  const selectedCandidate = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  const id = '61bfc7ea55715dcf9f552e15';

  useEffect(() => {
    dispatch(getCandidateById(id));
  }, [dispatch]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(adminsCleanUp());
  //   };
  // }, [dispatch]);

  const submitForm = (formValues) => {
    // if (operation === 'create') {
    dispatch(createEducation(selectedCandidate, formValues));
    // } else {
    //   dispatch(updateAdmin(id, formValues));
    // }
  };

  return (
    <>
      <section className={styles.container}>
        {modal && <Modal acceptModalFn />}
        <h1 className={styles.mainTitle}> ADD COLLEGE EDUCATION & POST GRADUATE</h1>
        <div className={styles.item}>
          <Form
            onSubmit={submitForm}
            render={({ handleSubmit, submitting, pristine }) => (
              <form className={styles.form} onSubmit={handleSubmit}>
                <Field
                  name="description"
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

export default CollegeEducation;
