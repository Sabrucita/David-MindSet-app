import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createCompany, updateCompany, getCompany } from '../../../redux/companies/thunks';
import { updateSelectedCompany, companiesCleanup } from '../../../redux/companies/actions';

function Form({ match }) {
  const [disableProperty, setDisableProperty] = useState(false);

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

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (operation === 'create') {
      dispatch(createCompany(formData));
    } else {
      dispatch(updateCompany(id, formData));
    }
    setDisableProperty(false);
  };

  const updateForm = (field, value) => {
    dispatch(updateSelectedCompany(field, value));
  };

  return (
    <>
      <section className={styles.container}>
        {operation === 'create' ? (
          <h1 className={styles.mainTitle}>Create Company</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit Company</h1>
        )}
        <form className={styles.form} onSubmit={submitForm}>
          <Fieldset
            update={id ? true : false}
            currentValue={formData.name}
            element="input"
            resource="companies"
            name="fullname"
            objectProperty="name"
            displayedName="Full name"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.address}
            element="input"
            resource="companies"
            name="address"
            objectProperty="address"
            displayedName="Address"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.city}
            element="input"
            resource="companies"
            name="city"
            objectProperty="city"
            displayedName="City"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.province}
            element="input"
            resource="companies"
            name="province"
            objectProperty="province"
            displayedName="Province"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.country}
            element="input"
            resource="companies"
            name="country"
            objectProperty="country"
            displayedName="Country"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.zipCode}
            element="input"
            resource="companies"
            name="zipCode"
            inputType="number"
            objectProperty="zipCode"
            displayedName="Zip Code"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.phone}
            element="input"
            resource="companies"
            name="phone"
            inputType="number"
            objectProperty="phone"
            displayedName="Phone Number"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.email}
            element="input"
            resource="companies"
            name="email"
            inputType="email"
            objectProperty="email"
            displayedName="Email"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.pictureUrl}
            element="input"
            resource="companies"
            name="pictureUrl"
            objectProperty="pictureUrl"
            displayedName="Picture URL"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.contactFullName}
            element="input"
            resource="companies"
            name="contactFullName"
            objectProperty="contactFullName"
            displayedName="Contact Full Name"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.contactPhone}
            element="input"
            resource="companies"
            name="contactPhone"
            inputType="number"
            objectProperty="contactPhone"
            displayedName="Contact Phone"
            required
            updateData={updateForm}
          />
          <div className={styles.btnContainer}>
            <button
              className={(styles.buttonAdd, styles.buttonGreen)}
              disabled={disableProperty}
              Addtype="submit"
            >
              SUBMIT COMPANY
            </button>
          </div>
        </form>
      </section>
      {modal && <Modal />}
    </>
  );
}

export default Form;
