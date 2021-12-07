import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';

function Form({ match, history }) {
  const [formData, setFormData] = useState({});
  const [disableProperty, setDisableProperty] = useState(true);
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
          setDisableProperty(false);
        })
        .catch((err) => {
          showErrorMsg(err);
        });
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (!id) {
      fetch(`${url}/${resource}`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (res) => {
          if (res.status === 201) {
            const data = await res.json();
            setShowModal(true);
            setModalType('create');
            setModalTitle('Application Created');
            return setModalContent(data.data);
          }
          const data = await res.json();
          showErrorMsg(data.data);
        })
        .catch((err) => {
          showErrorMsg(err);
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
          if (res.status === 200) {
            const data = await res.json();
            setShowModal(true);
            setModalType('create');
            setModalTitle('Application Updated');
            return setModalContent(data.data);
          }
          const data = await res.json();
          showErrorMsg(data.data);
        })
        .catch((err) => {
          showErrorMsg(err);
        });
    }
  };

  const updateForm = (field, value) => {
    const newState = formData;
    newState[field] = value;
    setFormData(newState);
    validateFields();
  };

  const validateFields = () => {
    if (!formData.idCompany) setDisableProperty(true);
    else if (!formData.startDate) setDisableProperty(true);
    else if (!formData.endDate) setDisableProperty(true);
    else if (
      !formData.jobDescription ||
      formData.jobDescription.length < 10 ||
      formData.jobDescription.length > 500
    )
      setDisableProperty(true);
    else setDisableProperty(false);
  };

  const closeModalFn = () => {
    setShowModal(false);
    history.push('/positions');
  };

  const showErrorMsg = (data) => {
    setModalType('error');
    setModalTitle('Upsss an error has happened');
    setModalContent(data);
    setShowModal(true);
  };

  return (
    <>
      <Modal
        showModal={showModal}
        type={modalType}
        titleModal={modalTitle}
        content={modalContent}
        closeModalFn={closeModalFn}
      />
      <section className={styles.container}>
        {!id ? (
          <h1 className={styles.mainTitle}>Create Position</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit Position</h1>
        )}
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
          <div className={styles.btnContainer}>
            <button
              className={`${styles.buttonGreen} ${disableProperty && styles.disabled}`}
              type="submit"
              disabled={disableProperty}
            >
              SUBMIT POSITION
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Form;
