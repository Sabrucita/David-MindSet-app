import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
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
      fetch(`${url}/companies/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const currentData = {
            name: data.name,
            address: data.address,
            city: data.city,
            province: data.province,
            country: data.country,
            zipCode: parseInt(data.zipCode),
            phone: parseInt(data.phone),
            email: data.email,
            pictureUrl: data.pictureUrl,
            contactFullName: data.contactFullName,
            contactPhone: parseInt(data.contactPhone),
            isActive: data.isActive
          };
          setFormData(currentData);
        });
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
    console.log(formData);
    if (operation === 'create') {
      fetch(`${url}/companies`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (res) => {
          const data = await res.json();
          setShowModal(true);
          if (data.Company) {
            setTitleModal('Company created');
            setModalType('create');
            return setModalContent(data.Company);
          }
          msgError(data);
        })
        .catch((err) => {
          msgError(err);
          setShowModal(true);
        });
    } else {
      fetch(`${url}/companies/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (res) => {
          const data = await res.json();
          setShowModal(true);
          if (data.Company) {
            setModalType('update');
            setTitleModal('Company updated');
            return setModalContent(data.Company);
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
    console.log(value);
    console.log(field);
    if (field === 'zipCode' || field === 'phone' || field === 'contactPhone') {
      newState[field] = parseInt(value);
    } else {
      newState[field] = value;
    }
    setFormData(newState);
  };

  const closeModalFn = () => {
    setShowModal(false);
    if (disableProperty) {
      history.push('/companies');
    }
  };

  return (
    <div>
      {operation === 'create' ? <h2>Create Company</h2> : <h2>Edit Company</h2>}
      <form className={styles.form} onSubmit={submitForm}>
        <Fieldset
          update={id ? true : false}
          currentValue={formData.name}
          element="input"
          resource="companies"
          name="fullname"
          objectProperty="name"
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
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.zipCode}
          element="input"
          resource="companies"
          name="zipCode"
          objectProperty="zipCode"
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.phone}
          element="input"
          resource="companies"
          name="phone"
          objectProperty="phone"
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.email}
          element="input"
          resource="companies"
          name="email"
          objectProperty="email"
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
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.contactPhone}
          element="input"
          resource="companies"
          name="contactPhone"
          objectProperty="contactPhone"
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.isActive ? true : false}
          element="input"
          inputType="checkbox"
          name="isActive"
          objectProperty="isActive"
          updateData={updateForm}
        />
        <button
          className={(styles.buttonAdd, styles.buttonGreen)}
          disabled={disableProperty}
          Addtype="submit"
        >
          SUBMIT COMPANY
        </button>
      </form>
      <Modal
        showModal={showModal}
        type={modalType}
        content={modalContent}
        closeModalFn={closeModalFn}
        titleModal={titleModal}
      />
    </div>
  );
}

export default Form;
