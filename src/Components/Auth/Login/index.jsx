import { Form, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import styles from './login.module.css';
import Fieldset from 'Components/shared/Fieldset';
import Modal from 'Components/shared/Modal';
// import Button from 'Components/Shared/Button';
import { login } from 'redux/auth/thunks';
// import { cleanError } from 'redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail, validateText } from 'validations';

function LoginForm() {
  // const error = useSelector((store) => store.auth.error);
  const modal = useSelector((store) => store.modal.show);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (formValues) => {
    return dispatch(login(formValues)).then((response) => {
      if (response) {
        console.log(response);
        // history.push('/home');
      }
    });
  };

  const validate = (formValues) => {
    const errors = {};
    errors.email = validateEmail(formValues.email);
    errors.password = validateText(formValues.password, 'Password', 8, 16);
    return errors;
  };

  return (
    <>
      {modal && <Modal />}
      <section className={styles.container}>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit} className={styles.container}>
              <h2 className={styles.mainTitle}>Login</h2>
              <Field
                name="email"
                label="Email"
                element="input"
                disabled={submitting}
                component={Fieldset}
              />
              <Field
                name="password"
                label="Password"
                type="password"
                element="input"
                disabled={submitting}
                component={Fieldset}
              />
              <div className={styles.buttonContainer}>
                <button
                  className={`${styles.buttonGreen} ${(submitting || pristine) && styles.disabled}`}
                  type="submit"
                  disabled={submitting || pristine}
                >
                  LOGIN
                </button>
              </div>
            </form>
          )}
        />
      </section>
    </>
  );
}

export default LoginForm;
