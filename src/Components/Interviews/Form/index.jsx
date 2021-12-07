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
      fetch(`${url}/interviews/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const currentData = {
            idCandidate: data.idCandidate._id,
            idCompany: data.idCompany._id,
            date: data.date,
            status: data.status
          };
          setFormData(currentData);
        });
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (operation === 'create') {
      let currentData = formData;
      currentData.status = true;
      setFormData(currentData);
      fetch(`${url}/interviews`, {
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
            setTitleModal('Interview Created');
            return setModalContent(data.data);
          }
          msgError(data);
        })
        .catch((err) => {
          msgError(err);
          setShowModal(true);
        });
    } else {
      fetch(`${url}/interviews/${id}`, {
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
            let formatData = data.data;
            formatData.idCompany = formatData.idCompany._id;
            formatData.idCandidate = formatData.idCandidate._id;
            setModalType('update');
            setTitleModal('Interview Updated');
            return setModalContent(formatData);
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
    newState[field] = value;
    setFormData(newState);
  };

  const closeModalFn = () => {
    setShowModal(false);
    if (disableProperty) {
      history.push('/interviews');
    }
  };

  return (
    <>
      <Modal
        showModal={showModal}
        type={modalType}
        content={modalContent}
        closeModalFn={closeModalFn}
        titleModal={titleModal}
      />
      <section className={styles.container}>
        {operation === 'create' ? (
          <h1 className={styles.mainTitle}>Create Interview</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit Interview</h1>
        )}
        <form className={styles.form} onSubmit={submitForm}>
          <Fieldset
            update={id ? true : false}
            currentValue={formData.idCandidate}
            element="select"
            resource="candidates"
            name="candidate"
            objectProperty="idCandidate"
            required
            updateData={updateForm}
          />
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
            currentValue={formData.date ? formData.date.substr(0, 16) : ''}
            element="input"
            inputType="datetime-local"
            name="date"
            objectProperty="date"
            required
            updateData={updateForm}
          />
          {id && (
            <Fieldset
              update={id ? true : false}
              currentValue={formData.status ? true : false}
              element="input"
              inputType="checkbox"
              name="status"
              objectProperty="status"
              updateData={updateForm}
            />
          )}
          <div className={styles.btnContainer}>
            <button className={styles.buttonGreen} disabled={disableProperty} Addtype="submit">
              SUBMIT INTERVIEW
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Form;
