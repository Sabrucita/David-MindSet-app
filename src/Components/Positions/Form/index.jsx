import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';

function Form({ match, history }) {
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState();

  const url = process.env.REACT_APP_API;
  const id = match.params.id;

  const resource = 'open-positions';

  useEffect(() => {
    if (id) {
      fetch(`${url}/${resource}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const currentData = {
            idCompany: data.idCompany._id,
            startDate: data.startDate?.substr(0, 10),
            endDate: data.endDate?.substr(0, 10),
            jobDescription: data.jobDescription
          };
          setFormData(currentData);
        });
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    /*if (formData.jobDescription.length < 10 || formData.jobDescription.length > 500) {
      setShowModal(true);
      setModalType('error');
      setModalContent({ msg: 'Job description must be between 10 and 500 characters' });
      return;
    }*/
    if (!id) {
      fetch(`${url}/${resource}`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (res) => {
          const data = await res.json();
          setShowModal(true);
          setModalType('create');
          setModalTitle('Application Created');
          setModalContent(data.data);
        })
        .catch(() => {
          setShowModal(true);
          setModalType('error');
        });
    } else {
      fetch(`${url}/${resource}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (res) => {
          const data = await res.json();
          setShowModal(true);
          setModalType('create');
          setModalTitle('Application Updated');
          setModalContent(data.data);
        })
        .catch(() => {
          setShowModal(true);
          setModalType('error');
        });
    }
  };

  const updateForm = (field, value) => {
    const newState = formData;
    newState[field] = value;
    setFormData(newState);
  };

  const closeModalFn = () => {
    setShowModal(false);
    history.push('/positions');
  };

  return (
    <div>
      {!id ? <h1>Create Position</h1> : <h1>Edit Position</h1>}
      <form className={styles.form} onSubmit={submitForm}>
        <Fieldset
          update={id ? true : false}
          currentValue={formData.idCompany}
          element="select"
          resource="companies"
          name="company"
          objectProperty="idCompany"
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.startDate}
          element="input"
          name="startDate"
          objectProperty="startDate"
          inputType="date"
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.endDate}
          element="input"
          name="endDate"
          objectProperty="endDate"
          inputType="date"
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.jobDescription}
          element="input"
          name="jobDescription"
          objectProperty="jobDescription"
          inputType="text"
          required
          updateData={updateForm}
        />
        <button type="submit">Submit</button>
      </form>
      <Modal
        showModal={showModal}
        type={modalType}
        titleModal={modalTitle}
        content={modalContent}
        closeModalFn={closeModalFn}
      />
    </div>
  );
}

export default Form;
