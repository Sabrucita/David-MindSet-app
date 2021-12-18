import { useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import styles from './form.module.css';
import Modal from '../../shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCandidates,
  updateCandidates,
  getCandidateById
} from '../../../redux/candidates/thunks';
import { candidatesCleanUp } from '../../../redux/candidates/actions';
import { Form, Field } from 'react-final-form';
import {
  validateText,
  validatePhone,
  validateEmail,
  birthdayValidation,
  validateZipCode
} from '../../../validations';

function CandidatesForm({ match }) {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    dispatch(candidatesCleanUp());
    if (operation === 'update') {
      dispatch(getCandidateById(id));
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(candidatesCleanUp());
    };
  }, []);

  const submitForm = (formValues) => {
    if (operation === 'create') {
      return dispatch(createCandidates(formValues));
    }
    dispatch(updateCandidates(id, formValues));
  };

  const validate = (formValues) => {
    const errors = {};
    errors.firstName = validateText(formValues.firstName, 'First Name', 2, 40);
    errors.lastName = validateText(formValues.lastName, 'Last Name', 2, 40);
    errors.phone = validatePhone(formValues.phone, 'Phone Number');
    errors.email = validateEmail(formValues.email);
    errors.password = validateText(formValues.password, 'Password', 8, 16);
    errors.city = validateText(formValues.city, 'City', 2, 40);
    errors.province = validateText(formValues.province, 'Province', 2, 40);
    errors.country = validateText(formValues.country, 'Country', 2, 40);
    errors.postalCode = validateZipCode(formValues.postalCode);
    errors.birthday = birthdayValidation(formValues.birthday);
    errors.address = {
      street: validateText(formValues.address?.street, 'Street', 2),
      number: validateText(formValues.address?.number, 'Number')
    };

    return errors;
  };

  return (
    <>
      <section className={styles.container}>
        {operation === 'create' ? (
          <h1 className={styles.mainTitle}>Create Candidate</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit Candidate</h1>
        )}
        <Form
          onSubmit={submitForm}
          initialValues={formData}
          validate={validate}
          subscription={{
            submitting: true
          }}
          render={({ handleSubmit, submitting, pristine }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field name="firstName" label="First Name" element="input" component={Fieldset} />
              <Field name="lastName" label="Last Name" element="input" component={Fieldset} />
              <Field name="email" label="Email" element="input" type="email" component={Fieldset} />
              <Field
                name="password"
                label="Password"
                element="input"
                type="password"
                component={Fieldset}
              />
              <Field
                name="phone"
                label="Phone Number"
                element="input"
                type="number"
                component={Fieldset}
              />
              <Field name="city" label="City" element="input" component={Fieldset} />
              <Field name="province" label="Province" element="input" component={Fieldset} />
              <Field name="country" label="Country" element="input" component={Fieldset} />
              <Field
                name="postalCode"
                label="Zip Code"
                element="input"
                type="number"
                component={Fieldset}
              />
              <Field
                name="birthday"
                label="Birthday"
                element="input"
                type="date"
                component={Fieldset}
              />
              <Field name="hobbies" label="Hobbies" element="input" component={Fieldset} />
              <Field name="mainSkills" label="Main Skilss" element="input" component={Fieldset} />
              <Field
                name="profileTypes"
                label="Profile Types"
                element="input"
                component={Fieldset}
              />
              <Field name="education" label="Education" element="input" component={Fieldset} />
              <Field name="experiences" label="Experiences" element="input" component={Fieldset} />
              <Field name="courses" label="Courses" element="input" component={Fieldset} />
              <Field
                name="address.street"
                label="Address Street"
                element="input"
                component={Fieldset}
              />
              <Field
                name="address.number"
                label="Address Number"
                element="input"
                type="number"
                component={Fieldset}
              />
              {id && (
                <Field
                  name="isOpenToWork"
                  label="Open to Work?"
                  element="input"
                  type="checkbox"
                  component={Fieldset}
                />
              )}
              <div className={styles.btnContainer}>
                <button
                  className={`${styles.buttonGreen} ${(submitting || pristine) && styles.disabled}`}
                  type="submit"
                  disabled={submitting || pristine}
                >
                  SUBMIT CANDIDATE
                </button>
              </div>
            </form>
          )}
        />
      </section>
      {modal && <Modal />}
    </>
  );
}

export default CandidatesForm;
