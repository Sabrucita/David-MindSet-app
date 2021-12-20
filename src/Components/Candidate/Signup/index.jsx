import { useEffect, useState } from 'react';
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
  validateEmail,
  birthdayValidation,
  validateZipCode
} from 'validations';
import SignUp1 from './signup1';
import SignUp2 from './signup2';

function SignUp({ match }) {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);
  const FormTitle = ['Sign Up', 'Sign Up2'];
  const [page, setPage] = useState(0);
  const PageDisplay = () => {
    if (page === 0) {
      return <SignUp1 />;
    } else if (page === 1) {
      return <SignUp2 />;
    }
  };
  const id = match.params.id;

  useEffect(() => {
    return () => {
      dispatch(candidatesCleanUp());
    };
  }, []);

  const submitForm = (formValues) => {
    dispatch(createCandidates(formValues));
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
      <body>
        <section className={styles.container}>
          <h1 className={styles.mainTitle}>{FormTitle[page]}</h1>
          {PageDisplay()}
          <button
            className={styles.buttonGreen}
            disabled={page === 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
          <button
            className={styles.buttonGreen}
            disabled={page === FormTitle.length - 1}
            onClick={() => {
              setPage((currPage) => currPage + 1);
            }}
          >
            Continue
          </button>
        </section>
      </body>
    </>
  );
}

export default SignUp;
