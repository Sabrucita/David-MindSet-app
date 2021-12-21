import { useEffect } from 'react';
import Fieldset from 'Components/shared/Fieldset';
import styles from './signup.module.css';
import Modal from 'Components/shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createCandidates } from 'redux/admin/candidates/thunks';
import { candidatesCleanUp } from 'redux/admin/candidates/actions';
import { Form, Field } from 'react-final-form';
import {
  validateText,
  validatePhone,
  birthdayValidation,
  validateZipCode,
  validateEmail
} from 'validations';

function SignUp2() {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);
  useEffect(() => {
    return () => {
      dispatch(candidatesCleanUp());
    };
  }, []);

  const submitForm = (formValues) => {
    return dispatch(createCandidates(formValues));
  };

  const validate = (formValues) => {
    const errors = {};
    errors.firstName = validateText(formValues.firstName, 'First Name', 2, 40);
    errors.lastName = validateText(formValues.lastName, 'Last Name', 2, 40);
    errors.email = validateEmail(formValues.email);
    errors.password = validateText(formValues.password, 'Password', 8, 16);
    errors.phone = validatePhone(formValues.phone, 'Phone Number');
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
              <Field
                name="isOpenToWork"
                label="Open to Work?"
                element="input"
                type="checkbox"
                component={Fieldset}
              />
              <button
                className={`${styles.buttonGreen} ${(submitting || pristine) && styles.disabled}`}
                type="submit"
                disabled={submitting || pristine}
              >
                SUBMIT CANDIDATE
              </button>
            </form>
          )}
        />
      </section>
      {modal && <Modal />}
    </>
  );
}

export default SignUp2;
