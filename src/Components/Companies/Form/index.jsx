import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
import { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { createCompany, updateCompany, getCompany } from '../../../redux/companies/thunks';
import { companiesCleanup } from '../../../redux/companies/actions';
import { validateText, validateEmail, validatePhone } from '../../../validations';

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
    if (!formValues.name) {
      errors.name = 'Name is required.';
    }
    if (!formValues.address) {
      errors.address = 'Address is required.';
    }
    if (!formValues.city) {
      errors.city = 'City is required.';
    }
    if (!formValues.province) {
      errors.province = 'Province is required.';
    }
    if (!formValues.country) {
      errors.country = 'Country is required.';
    }
    if (!formValues.contactFullName) {
      errors.contactFullName = 'Contact Full Name is required.';
    }
    errors.name = validateText(formValues.name, 'Name', 2, 40);
    errors.address = validateText(formValues.address, 'Address', 2, 40);
    errors.city = validateText(formValues.city, 'City', 2, 40);
    errors.province = validateText(formValues.province, 'Province', 2, 40);
    errors.country = validateText(formValues.country, 'Country', 2, 40);
    errors.contactFullName = validateText(formValues.contactFullName, 'Contact Full Name', 2, 40);

    errors.email = validateEmail(formValues.email);

    if (!formValues.phone) {
      errors.phone = 'Phone is required.';
    }
    if (!formValues.contactPhone) {
      errors.contactPhone = 'Contact Phone is required.';
    }
    errors.phone = validatePhone(formValues.phone, 'Phone');
    errors.contactPhone = validatePhone(formValues.contactPhone, 'Contact Phone');

    if (!formValues.zipCode) {
      errors.zipCode = 'Zip Code is required';
    } else if (formValues.zipCode >= 10000) {
      errors.zipCode = 'Zip Code must be less than 10000';
    }
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
          render={(formProps) => (
            <form className={styles.form} onSubmit={formProps.handleSubmit}>
              <Field
                element="input"
                type="text"
                name="name"
                label="Full Name"
                component={Fieldset}
                update={id ? true : false}
              />
              <Field
                element="input"
                type="text"
                name="address"
                label="Address"
                component={Fieldset}
                update={id ? true : false}
              />
              <Field
                element="input"
                type="text"
                name="city"
                label="City"
                component={Fieldset}
                update={id ? true : false}
              />
              <Field
                element="input"
                type="text"
                name="province"
                label="Province"
                component={Fieldset}
                update={id ? true : false}
              />
              <Field
                element="input"
                type="text"
                name="country"
                label="Country"
                component={Fieldset}
                update={id ? true : false}
              />
              <Field
                element="input"
                type="number"
                name="zipCode"
                label="Zip Code"
                component={Fieldset}
                update={id ? true : false}
              />
              <Field
                element="input"
                type="number"
                name="phone"
                label="Phone Number"
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
                type="text"
                name="pictureUrl"
                label="Picture Url"
                component={Fieldset}
                update={id ? true : false}
              />
              <Field
                element="input"
                type="text"
                name="contactFullName"
                label="Contact Full Name"
                component={Fieldset}
                update={id ? true : false}
              />
              <Field
                element="input"
                type="number"
                name="contactPhone"
                label="Contact Phone"
                component={Fieldset}
                update={id ? true : false}
              />
              <div className={styles.btnContainer}>
                <button
                  className={(styles.buttonAdd, styles.buttonGreen)}
                  disabled={formProps.submitting}
                  Addtype="submit"
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
