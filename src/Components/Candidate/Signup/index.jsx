import { useEffect } from 'react';
import Fieldset from 'Components/shared/Fieldset';
import styles from './signup.module.css';
import Modal from 'Components/shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createCandidates } from 'redux/admin/candidates/thunks';
import { Form, Field } from 'react-final-form';
import { candidatesCleanUp } from 'redux/admin/candidates/actions';
import {
  validateText,
  validateEmail,
  validatePassword,
  validatePhone,
  validateZipCode,
  birthdayValidation
} from 'validations';
import { useState } from 'react';

function SignUp() {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);
  const submitForm = (formValues) => {
    return dispatch(createCandidates(formValues));
  };

  //const to pass from one step of the sign up to another
  const [signUpform, setSignUpForm] = useState(0);
  const signUpButton = () => {
    setSignUpForm((curr) => curr + 1);
  };

  useEffect(() => {
    return () => {
      dispatch(candidatesCleanUp());
    };
  }, []);

  //depends on what page you are render a different button
  const renderButton = (submitting, pristine) => {
    if (signUpform === 0) {
      return (
        <button
          className={`${styles.buttonGreen} ${(submitting || pristine) && styles.disabled}`}
          disabled={submitting || pristine}
          onClick={signUpButton}
          type="button"
        >
          Continue
        </button>
      );
    } else if (signUpform === 1) {
      return (
        <button
          className={`${styles.buttonGreen2} ${(submitting || pristine) && styles.disabled}`}
          disabled={submitting || pristine}
          type="submit"
        >
          Sign UP
        </button>
      );
    }
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
    (errors.address = {
      street: validateText(formValues.address?.street, 'Street', 2),
      number: validateText(formValues.address?.number, 'Number')
    }),
      (errors.confirmpassword = validatePassword(formValues.confirmpassword, formValues.password));
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
            <form className={signUpform === 0 ? styles.form1 : styles.form} onSubmit={handleSubmit}>
              {signUpform === 0 && (
                <>
                  <Field
                    name="email"
                    label="Email"
                    element="input"
                    type="email"
                    component={Fieldset}
                  />
                  <Field
                    name="password"
                    label="Password"
                    element="input"
                    type="password"
                    component={Fieldset}
                    id="pass1"
                  />
                  <Field
                    name="confirmpassword"
                    label="Confirm Password"
                    element="input"
                    type="password"
                    component={Fieldset}
                    id="pass2"
                  />
                </>
              )}
              {signUpform === 1 && (
                <>
                  <Field name="firstName" label="First Name" element="input" component={Fieldset} />
                  <Field name="lastName" label="Last Name" element="input" component={Fieldset} />
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
                  ></Field>
                </>
              )}
              {renderButton()}
            </form>
          )}
        />
      </section>
      {modal && <Modal />}
    </>
  );
}

export default SignUp;
