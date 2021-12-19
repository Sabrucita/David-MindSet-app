import { useEffect } from 'react';
import Fieldset from 'Components/shared/Fieldset';
import styles from './form.module.css';
import Modal from 'Components/shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createProfiles, updateProfiles, getProfile } from 'redux/profiles/thunks';
import { profilesCleanup } from 'redux/profiles/actions';
import { Form, Field } from 'react-final-form';
import { validateText } from 'validations';

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
    errors.name = validateText(formValues.name, 'Profile Type Name', 2);
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
          render={({ handleSubmit, submitting, pristine }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field name="name" label="Profile Type Name" element="input" component={Fieldset} />
              <div className={styles.btnContainer}>
                <button
                  className={`${styles.buttonGreen} ${(submitting || pristine) && styles.disabled}`}
                  type="submit"
                  disabled={submitting || pristine}
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
