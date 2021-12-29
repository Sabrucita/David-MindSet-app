import Fieldset from 'Components/shared/Fieldset';
import styles from './signup.module.css';
import Modal from 'Components/shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from 'redux/auth/thunks';
import { Form, Field } from 'react-final-form';

import {
  validateText,
  validateEmail,
  validatePassword,
  validatePhone,
  validateZipCode,
  birthdayValidation,
  validateAddressNumber
} from 'validations';

function SignUp() {
  const dispatch = useDispatch();
  const modal = useSelector((store) => store.modal.show);

  const submitForm = (formValues) => {
    dispatch(signUp(formValues));
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
      number: validateAddressNumber(formValues.address?.number)
    };
    errors.confirmpassword = validatePassword(formValues.confirmpassword, formValues.password);
    return errors;
  };

  return (
    <>
      {modal && <Modal />}
      <section className={styles.container}>
        <Form
          onSubmit={submitForm}
          validate={validate}
          render={({ handleSubmit, submitting, pristine }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <h2 className={styles.mainTitle}>Sign Up</h2>
              <Field name="email" label="Email" element="input" type="email" component={Fieldset} />
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
              <div className={styles.btnContainer}>
                <button
                  className={`${styles.buttonGreen} ${(submitting || pristine) && styles.disabled}`}
                  type="submit"
                  disabled={submitting || pristine}
                >
                  SIGN UP
                </button>
              </div>
            </form>
          )}
        />
      </section>
    </>
  );
}

export default SignUp;
