import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
import { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { createAdmin, updateAdmin, getAdmin } from '../../../redux/admins/thunks';
import { adminsCleanUp } from '../../../redux/admins/actions';
import { validateText, emailValidationFn } from '../../../validations';

function AdminsForm({ match }) {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.admins.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    if (operation === 'update') {
      dispatch(getAdmin(id));
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(adminsCleanUp());
    };
  }, []);

  const submitForm = (formValues) => {
    if (operation === 'create') {
      dispatch(createAdmin(formValues));
    } else {
      dispatch(updateAdmin(id, formValues));
    }
  };
  /*
  const validate = (formValues) => {
    const errors = {};
    const fieldList = ['firstName', 'lastName'];
    //crear obj nombre y el displayedName para que no quede re croto en ese array
    fieldList.forEach((field) => {
      const error = validateText(formValues, field);
      if (error != undefined) {
        errors[field] = error;
      }
    });
    return errors;
  };
  
  const validate = (formValues) => {
    const errors = {};
    const fieldList = ['firstName', 'lastName'];
    //crear obj nombre y el displayedName para que no quede re croto en ese array
    fieldList.forEach((field) => {
      const error = validateText(formValues, field);
      if (error != undefined) {
        errors[field] = error;
      }
    });
    if (!formValues.email) {
      errors.email = 'Email is required';
    } else {
      emailValidationFn(errors, formValues);
    }
    if (!formValues.password) {
      errors.password = 'Password is required';
    } else if (formValues.password.lenght > 16) {
      errors.password = 'Password must be less than 16';
    } else if (formValues.password.length < 8) {
      errors.password = 'Password must be more than 8 characters';
      return errors;
    }
  };
  */
  const validate = (formValues) => {
    const errors = {};
    errors.firstName = validateText(formValues.firstName, 'First Name', 2, 40);
    errors.lastName = validateText(formValues.lastName, 'Last Name', 2, 40);
    errors.password = validateText(formValues.password, 'Password', 8, 16);
    if (!formValues.email) {
      errors.email = 'Email is required';
    } else {
      emailValidationFn(errors, formValues);
    }
    return errors;
  };
  return (
    <>
      <section className={styles.container}>
        {operation === 'create' ? (
          <h1 className={styles.mainTitle}>Add new administrator</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit administrator</h1>
        )}
        <Form
          onSubmit={submitForm}
          initialValues={formData}
          validate={validate}
          //validatePass={validatePass}
          render={(formProps) => (
            <form className={styles.form} onSubmit={formProps.handleSubmit}>
              <Field
                element="input"
                type="text"
                name="firstName"
                label="First Name"
                component={Fieldset}
                update={id ? true : false}
              />
              <Field
                element="input"
                type="text"
                name="lastName"
                label="Last Name"
                component={Fieldset}
                update={id ? true : false}
              />
              <Field
                element="input"
                type="email"
                name="email"
                label="Email"
                component={Fieldset}
                update={id ? true : false}
              />
              <Field
                element="input"
                type="password"
                name="password"
                label="Password"
                component={Fieldset}
                update={id ? true : false}
              />
              <div className={styles.btnContainer}>
                <button
                  className={(styles.buttonAdd, styles.buttonGreen)}
                  disabled={formProps.submitting}
                  Addtype="submit"
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
