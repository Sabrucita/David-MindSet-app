import { useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import styles from './form.module.css';
import Modal from '../../shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createProfiles, updateProfiles, getProfile } from '../../../redux/profiles/thunks';
import { profilesCleanup } from '../../../redux/profiles/actions';
import { Form, Field } from 'react-final-form';

function ProfilesFormForm({ match }) {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.profiles.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    if (operation === 'update') {
      dispatch(getProfile(id));
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(profilesCleanup());
    };
  }, []);

  const submitForm = (formValues) => {
    if (operation === 'create') {
      return dispatch(createProfiles(formValues));
    }
    dispatch(updateProfiles(id, formValues));
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.name) {
      errors.name = 'Profile Type Name is required.';
    } else if (formValues.name.length < 3) {
      errors.name = 'Profile Type Name must be longer than 3 characters.';
    }
    return errors;
  };
  return (
    <>
      <section className={styles.container}>
        {operation === 'create' ? (
          <h1 className={styles.mainTitle}>Create Profile Type</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit Profile Type</h1>
        )}
        <Form
          onSubmit={submitForm}
          initialValues={formData}
          validate={validate}
          subscription={{
            submitting: true
          }}
          render={(formProps) => (
            <form className={styles.form} onSubmit={formProps.handleSubmit}>
              <Field
                name="name"
                label="Profile Type Name"
                element="input"
                component={Fieldset}
                update={id ? true : false}
              />
              <div className={styles.btnContainer}>
                <button
                  className={styles.buttonGreen}
                  disabled={formProps.submitting}
                  type="submit"
                >
                  SUBMIT PROFILE-TYPE
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

export default ProfilesFormForm;
