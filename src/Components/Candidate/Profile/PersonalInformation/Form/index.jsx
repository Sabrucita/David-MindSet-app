import { useEffect } from 'react';
import Fieldset from 'Components/shared/Fieldset';
import styles from './form.module.css';
import Modal from 'Components/shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { updateCandidates, getCandidateById } from 'redux/admin/candidates/thunks';
import { candidatesCleanUp } from 'redux/admin/candidates/actions';
import { Form, Field } from 'react-final-form';
import { validateText, validatePhone, birthdayValidation } from 'validations';
import { Link } from 'react-router-dom';

function PersonalInformationForm() {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  const id = '619188555b9988bf252a4d5a';
  //const id = match.params.id;

  useEffect(() => {
    dispatch(candidatesCleanUp());
    dispatch(getCandidateById(id));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(candidatesCleanUp());
    };
  }, []);

  const submitForm = (formValues) => {
    dispatch(updateCandidates(id, formValues));
  };

  const validate = (formValues) => {
    const errors = {};
    errors.firstName = validateText(formValues.firstName, 'First Name', 2, 40);
    errors.lastName = validateText(formValues.lastName, 'Last Name', 2, 40);
    errors.phone = validatePhone(formValues.phone, 'Phone Number');
    errors.city = validateText(formValues.city, 'City', 2, 40);
    errors.province = validateText(formValues.province, 'Province', 2, 40);
    errors.country = validateText(formValues.country, 'Country', 2, 40);
    errors.birthday = birthdayValidation(formValues.birthday);
    errors.address = {
      street: validateText(formValues.address?.street, 'Street', 2),
      number: validateText(formValues.address?.number, 'Number', 0, 4)
    };

    return errors;
  };

  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.mainTitle}>Personal Information</h1>
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
              <Field
                name="phone"
                label="Phone Number"
                element="input"
                type="number"
                component={Fieldset}
              />
              <Field name="city" label="City" element="input" component={Fieldset} />
              <Field name="province" label="Province" element="input" component={Fieldset} />
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
              />
              <Field
                element="input"
                type="text"
                name="pictureUrl"
                label="Picture Url"
                component={Fieldset}
              />
              <Field element="image" type="image" name="pictureUrl" component={Fieldset} />
              <div className={styles.btnContainer}>
                <Link to="../personal-information" className={styles.buttonAdd}>
                  <span className={styles.buttonGreen}>GO BACK</span>
                </Link>
                <button
                  className={`${styles.buttonGreen} ${(submitting || pristine) && styles.disabled}`}
                  type="submit"
                  disabled={submitting || pristine}
                >
                  SAVE
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

export default PersonalInformationForm;
