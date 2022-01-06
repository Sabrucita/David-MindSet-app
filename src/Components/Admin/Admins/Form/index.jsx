import Fieldset from 'Components/shared/Fieldset';
import Modal from 'Components/shared/Modal';
import styles from './form.module.css';
import { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdmin, getAdmin } from 'redux/admin/admins/thunks';
import { adminsCleanUp } from 'redux/admin/admins/actions';
import { validateText, validateEmail } from 'validations';
import { Link } from 'react-router-dom';

function AdminsForm({ match }) {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.admins.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  const id = match.params.id;

  useEffect(() => {
    dispatch(getAdmin(id));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(adminsCleanUp());
    };
  }, []);

  const submitForm = (formValues) => {
    dispatch(updateAdmin(id, formValues));
  };

  const validate = (formValues) => {
    const errors = {};
    errors.firstName = validateText(formValues.firstName, 'First Name', 2, 40);
    errors.lastName = validateText(formValues.lastName, 'Last Name', 2, 40);
    errors.email = validateEmail(formValues.email);
    return errors;
  };
  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.mainTitle}>Edit administrator</h1>
        <Form
          onSubmit={submitForm}
          initialValues={formData}
          validate={validate}
          render={({ handleSubmit, submitting, pristine }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field
                name="firstName"
                label="First Name"
                element="input"
                type="text"
                component={Fieldset}
              />
              <Field
                name="lastName"
                label="Last Name"
                element="input"
                type="text"
                component={Fieldset}
              />
              <div className={styles.btnContainer}>
                <Link to="/admin/admins" className={styles.buttonAdd}>
                  <span className={styles.buttonGreen}>GO BACK</span>
                </Link>
                <button
                  className={`${styles.buttonGreen} ${(submitting || pristine) && styles.disabled}`}
                  type="submit"
                  disabled={submitting || pristine}
                >
                  SUBMIT ADMINISTRATOR
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

export default AdminsForm;
