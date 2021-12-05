import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
const url = process.env.REACT_APP_API;

function Form({ match }) {
  const [formData, setFormData] = useState({});
  const [modalContent, setModalContent] = useState();
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState();

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
          console.log(data);
          setTitleModal('Company created');
          setModalType('create');
          setModalContent(data.Company);
        })
        .catch(() => {
          setShowModal(true);
          setModalType('error');
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
          setModalType('update');
          setTitleModal('Company updated');
          setModalContent(data.Company);
        })
        .catch(() => {
          setShowModal(true);
          setModalType('error');
        });
    }
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
    //window.location.href = '/companies';
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
          currentValue={formData.isActive}
          element="input"
          resource="companies"
          name="isActive"
          inputType="checkbox"
          objectProperty="isActive"
          updateData={updateForm}
        />
        <button type="submit">Submit</button>
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
