import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
import { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { createCompany, updateCompany, getCompany } from '../../../redux/companies/thunks';
import { companiesCleanup } from '../../../redux/companies/actions';
import { validateText } from '../../../validations';

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
    const fieldList = ['name', 'address', 'city', 'province', 'country', 'contactFullName'];
    //crear obj nombre y el displayedName para que no quede re croto en ese array
    fieldList.forEach((field) => {
      const error = validateText(formValues, field);
      if (error != undefined) {
        errors[field] = error;
      }
    });
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
