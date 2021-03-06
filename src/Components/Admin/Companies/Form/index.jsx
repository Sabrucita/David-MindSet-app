import Fieldset from 'Components/shared/Fieldset';
import Modal from 'Components/shared/Modal';
import styles from './form.module.css';
import { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { createCompany, updateCompany, getCompany } from 'redux/admin/companies/thunks';
import { companiesCleanup } from 'redux/admin/companies/actions';
import { validateText, validateEmail, validatePhone, validateZipCode } from 'validations';

function CompaniesForm({ match }) {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.companies.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    if (operation === 'update') {
      dispatch(getCompany(id));
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(companiesCleanup());
    };
  }, []);

  const submitForm = (formValues) => {
    if (operation === 'create') {
      dispatch(createCompany(formValues));
    } else {
      dispatch(updateCompany(id, formValues));
    }
  };

  const validate = (formValues) => {
    const errors = {};
    errors.name = validateText(formValues.name, 'Name', 2, 40);
    errors.address = validateText(formValues.address, 'Address', 2, 40);
    errors.city = validateText(formValues.city, 'City', 2, 40);
    errors.province = validateText(formValues.province, 'Province', 2, 40);
    errors.country = validateText(formValues.country, 'Country', 2, 40);
    errors.contactFullName = validateText(formValues.contactFullName, 'Contact Full Name', 2, 40);
    errors.email = validateEmail(formValues.email);
    errors.phone = validatePhone(formValues.phone, 'Phone');
    errors.contactPhone = validatePhone(formValues.contactPhone, 'Contact Phone');
    errors.zipCode = validateZipCode(formValues.zipCode);
    return errors;
  };

  return (
    <>
      <section className={styles.container}>
        {operation === 'create' ? (
          <h1 className={styles.mainTitle}>Create Company</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit Company</h1>
        )}
        <Form
          onSubmit={submitForm}
          initialValues={formData}
          validate={validate}
          render={({ handleSubmit, submitting, pristine }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field
                element="input"
                type="text"
                name="name"
                label="Full Name"
                component={Fieldset}
              />
              <Field
                element="input"
                type="text"
                name="address"
                label="Address"
                component={Fieldset}
              />
              <Field element="input" type="text" name="city" label="City" component={Fieldset} />
              <Field
                element="input"
                type="text"
                name="province"
                label="Province"
                component={Fieldset}
              />
              <Field
                element="input"
                type="text"
                name="country"
                label="Country"
                component={Fieldset}
              />
              <Field
                element="input"
                type="number"
                name="zipCode"
                label="Zip Code"
                component={Fieldset}
              />
              <Field
                element="input"
                type="number"
                name="phone"
                label="Phone Number"
                component={Fieldset}
              />
              <Field element="input" type="email" name="email" label="Email" component={Fieldset} />
              <Field
                element="input"
                type="text"
                name="pictureUrl"
                label="Picture Url"
                component={Fieldset}
              />
              <Field
                element="input"
                type="text"
                name="contactFullName"
                label="Contact Full Name"
                component={Fieldset}
              />
              <Field
                element="input"
                type="number"
                name="contactPhone"
                label="Contact Phone"
                component={Fieldset}
              />
              <div className={styles.btnContainer}>
                <button
                  className={`${styles.buttonGreen} ${(submitting || pristine) && styles.disabled}`}
                  type="submit"
                  disabled={submitting || pristine}
                >
                  SUBMIT COMPANY
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

export default CompaniesForm;
