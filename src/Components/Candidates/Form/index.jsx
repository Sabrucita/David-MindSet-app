import React from 'react';
import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import styles from './form.module.css';
import Modal from '../../shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCandidate,
  updateCandidate,
  getCandidateById
} from '../../../redux/candidates/thunks';
import { updateSelectedCandidate, candidatesCleanUp } from '../../../redux/candidates/actions';

function Form({ match }) {
  const [disableProperty, setDisableProperty] = useState(false);
  const dispatch = useDispatch();
  const modal = useSelector((store) => store.modal.show);
  const formData = useSelector((store) => store.candidates.selectedElement);
  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    if (operation === 'update') {
      dispatch(getCandidateById(id));
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(candidatesCleanUp());
    };
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (operation === 'create') {
      dispatch(createCandidate(formData));
    } else {
      dispatch(updateCandidate(id, formData));
    }
    setDisableProperty(false);
  };

  const updateForm = (field, value) => {
    dispatch(updateSelectedCandidate(field, value));
  };

  return (
    <>
      {modal && <Modal />}
      <section className={styles.container}>
        {operation === 'create' ? (
          <h1 className={styles.mainTitle}>Create Candidate</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit Candidate</h1>
        )}
        <form className={styles.form} onSubmit={submitForm}>
          <Fieldset
            update={id ? true : false}
            currentValue={formData.firstName}
            element="input"
            name="firstName"
            displayedName="First Name"
            objectProperty="firstName"
            required
            updateData={updateForm}
            inputType="text"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.lastName}
            element="input"
            name="lastName"
            displayedName="Last Name"
            objectProperty="lastName"
            required
            updateData={updateForm}
            inputType="text"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.email}
            element="input"
            name="email"
            displayedName="E-Mail"
            objectProperty="email"
            required
            updateData={updateForm}
            inputType="email"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.password}
            element="input"
            name="password"
            displayedName="PassWord"
            objectProperty="password"
            required
            updateData={updateForm}
            inputType="password"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.phone}
            element="input"
            name="phone"
            displayedName="Phone Number"
            objectProperty="phone"
            required
            updateData={updateForm}
            inputType="number"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.city}
            element="input"
            name="city"
            displayedName="City"
            objectProperty="city"
            required
            updateData={updateForm}
            inputType="text"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.province}
            element="input"
            name="province"
            displayedName="Province"
            objectProperty="province"
            required
            updateData={updateForm}
            inputType="text"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.country}
            element="input"
            name="country"
            displayedName="Country"
            objectProperty="country"
            required
            updateData={updateForm}
            inputType="text"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.postalCode}
            element="input"
            name="postalCode"
            displayedName="Postal Code"
            objectProperty="postalCode"
            required
            updateData={updateForm}
            inputType="number"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.birthday}
            element="input"
            name="birthday"
            displayedName="Birthday"
            objectProperty="birthday"
            required
            updateData={updateForm}
            inputType="date"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.hobbies}
            element="input"
            name="hobbies"
            displayedName="Hobbies"
            objectProperty="hobbies"
            updateData={updateForm}
            inputType="text"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.mainSkills}
            element="input"
            name="mainSkills"
            displayedName="Main Skills"
            objectProperty="mainSkills"
            updateData={updateForm}
            inputType="text"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.profileTypes}
            element="input"
            name="profileTypes"
            displayedName="Profile Types"
            objectProperty="profileTypes"
            updateData={updateForm}
            inputType="text"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.isOpenToWork}
            element="input"
            name="isOpenToWork"
            displayedName="is Open To Work?"
            objectProperty="isOpenToWork"
            updateData={updateForm}
            inputType="text"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.education}
            element="input"
            name="education"
            displayedName="Education"
            objectProperty="education"
            updateData={updateForm}
            inputType="text"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.experiences}
            element="input"
            name="experiences"
            displayedName="Experiences"
            objectProperty="experiences"
            updateData={updateForm}
            inputType="text"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.courses}
            element="input"
            name="courses"
            displayedName="Courses"
            objectProperty="courses"
            updateData={updateForm}
            inputType="text"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.address?.street}
            element="input"
            name="addressStreet"
            displayedName="Address Street"
            objectProperty="street"
            updateData={updateForm}
            inputType="text"
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.address?.number}
            element="input"
            name="addressNumber"
            displayedName="Address number"
            objectProperty="number"
            updateData={updateForm}
            inputType="number"
          />
          <div className={styles.btnContainer}>
            <button className={styles.buttonGreen} Addtype="submit" disabled={disableProperty}>
              SUBMIT CANDIDATE
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Form;
