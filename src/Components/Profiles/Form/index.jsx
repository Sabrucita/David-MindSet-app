import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import styles from './form.module.css';
import Modal from '../../shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createProfiles, updateProfiles, getProfile } from '../../../redux/profiles/thunks';
import { updateSelectedProfile, profilesCleanup } from '../../../redux/profiles/actions';

function Form({ match }) {
  const [disableProperty, setDisableProperty] = useState(false);
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

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (operation === 'create') {
      dispatch(createProfiles(formData));
    } else {
      dispatch(updateProfiles(id, formData));
    }
    setDisableProperty(false);
  };

  const updateForm = (field, value) => {
    dispatch(updateSelectedProfile(field, value));
  };

  return (
    <>
      <section className={styles.container}>
        {operation === 'create' ? (
          <h1 className={styles.mainTitle}>Create Profile Type</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit Profile Type</h1>
        )}
        <form className={styles.form} onSubmit={submitForm}>
          <Fieldset
            update={id ? true : false}
            currentValue={formData.name}
            element="input"
            name="name"
            displayedName="Profile Type Name"
            objectProperty="name"
            required
            updateData={updateForm}
            inputType="text"
          />
          <div className={styles.btnContainer}>
            <button className={styles.buttonGreen} disabled={disableProperty} Addtype="submit">
              SUBMIT PROFILE-TYPE
            </button>
          </div>
        </form>
      </section>
      {modal && <Modal />}
    </>
  );
}

export default Form;
