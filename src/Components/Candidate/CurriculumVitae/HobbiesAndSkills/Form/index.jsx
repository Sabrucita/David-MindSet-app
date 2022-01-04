import styles from './hobbiesForm.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import Modal from 'Components/shared/Modal';
import Fieldset from 'Components/shared/Fieldset';
import { getCandidateById, createHobbies, updateHobbies } from 'redux/candidate/profile/thunks';
import { validateText } from 'validations';
import { Link } from 'react-router-dom';

function Hobbies({ match }) {
  const dispatch = useDispatch();
  const selectedCandidate = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);
  const [selectedHobbie, setSelectedHobbie] = useState({});

  const idEducation = match.params.id;

  const userAuth = useSelector((store) => store.auth.user);
  const id = userAuth._id;

  useEffect(() => {
    dispatch(getCandidateById(id));
  }, [dispatch]);

  useEffect(() => {
    if (idEducation && selectedCandidate.idCandidate) {
      const hobbies = selectedCandidate.hobbies.find((element) => element._id === idEducation);
      setSelectedHobbie(hobbies);
    }
  }, [selectedCandidate.idCandidate]);

  const submitForm = (formValues) => {
    if (idEducation) {
      formValues._id = idEducation;
      selectedCandidate.hobbies = selectedCandidate.hobbies.map((element) => {
        if (element._id === idEducation) return formValues;
        return element;
      });
      return dispatch(updateHobbies(selectedCandidate));
    }
    dispatch(createHobbies(selectedCandidate, formValues, 'hobbies'));
  };

  const validate = (formValues) => {
    const errors = {};
    errors.tittle = validateText(formValues.hobbies, 'hobbies', 3);
    return errors;
  };

  return (
    <>
      {modal && <Modal acceptModalFn />}
      <section className={styles.container}>
        {!idEducation ? (
          <h2 className={styles.mainTitle}>Add Hobbie or Skill</h2>
        ) : (
          <h2 className={styles.mainTitle}>Edit Hobbie or Skill</h2>
        )}
        <div className={styles.item}>
          <Form
            onSubmit={submitForm}
            initialValues={selectedHobbie}
            validate={validate}
            render={({ handleSubmit, submitting, pristine }) => (
              <form className={styles.form} onSubmit={handleSubmit}>
                <Field
                  name="hobbies"
                  label="Hobbie or Skill"
                  element="input"
                  type="text"
                  component={Fieldset}
                />
                <div className={styles.btnContainer}>
                  <Link
                    to="/candidate/curriculumvitae/hobbies-and-skills"
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

export default Hobbies;
