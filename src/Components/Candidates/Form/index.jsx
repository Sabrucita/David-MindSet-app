import React from 'react';
import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import styles from './form.module.css';
import Modal from '../../shared/Modal';
const url = process.env.REACT_APP_API;

function Form({ match, history }) {
  const [formData, setFormData] = useState({});
  const [modalContent, setModalContent] = useState();
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState();
  const [disableProperty, setDisableProperty] = useState(false);

  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    if (operation === 'update') {
      fetch(`${url}/candidates/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const currentData = {
            idCandidate: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            phone: data.phone,
            city: data.city,
            province: data.province,
            country: data.country,
            postalCode: data.postalCode,
            birthday: data.birthday,
            hobbies: data.hobbies,
            mainSkills: data.mainSkills,
            profileTypes: data.profileTypes,
            isOpenToWork: data.isOpenToWork,
            education: data.education,
            experiences: data.experiences,
            courses: data.courses,
            address: { street: data.address.street, number: data.address.number }
          };
          setFormData(currentData);
        });
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (operation === 'create') {
      fetch(`${url}/candidates`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (res) => {
          const data = await res.json();
          setShowModal(true);
          if (data.data) {
            setModalType('create');
            setTitleModal('Candidate Created');
            return setModalContent(data.data);
          }
          msgError(data);
        })
        .catch((err) => {
          msgError(err);
          setShowModal(true);
        });
    } else {
      fetch(`${url}/candidates/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (res) => {
          const data = await res.json();
          setShowModal(true);
          if (data.data) {
            setModalType('update');
            setTitleModal('Candidate Updated');
            return setModalContent(data.data);
          }
          msgError(data);
        })
        .catch((err) => {
          msgError(err);
          setShowModal(true);
        });
    }
  };
  const msgError = (data) => {
    setModalType('error');
    setTitleModal('Upsss an error has happened');
    setModalContent(data);
    setDisableProperty(false);
  };

  const updateForm = (field, value) => {
    const newState = formData;
    if (field === 'number' || field === 'street') {
      if (!newState.address) newState.address = {};
      newState.address[field] = value;
      return setFormData(newState);
    }
    newState[field] = value;
    setFormData(newState);
  };

  const closeModalFn = () => {
    setShowModal(false);
    if (disableProperty) {
      history.push('/candidates');
    }
  };

  return (
    <>
      <section className={styles.container}>
        {operation === 'create' ? (
          <h1 className={styles.h1}>Create Candidate</h1>
        ) : (
          <h1 className={styles.h1}>Edit Candidate</h1>
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
          <div className={styles.containerButton}>
            <button className={styles.buttonGreen} disabled={disableProperty} Addtype="submit">
              SUBMIT CANDIDATE
            </button>
          </div>
        </form>
      </section>
      <Modal
        showModal={showModal}
        type={modalType}
        content={modalContent}
        closeModalFn={closeModalFn}
        titleModal={titleModal}
      />
    </>
  );
}

export default Form;
