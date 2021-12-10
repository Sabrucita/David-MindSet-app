import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal, showSuccessModal } from '../../../redux/modal/actions';
import { updateSelectedSession } from '../../../redux/sessions/actions';
import {
  createSession,
  getSession,
  getSessionsOptions,
  updateSession
} from '../../../redux/sessions/thunks';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';

function Form({ match, history }) {
  const dispatch = useDispatch();
  const options = useSelector((store) => store.sessions.options);
  const formData = useSelector((store) => store.sessions.selectedElement);

  const [disableProperty, setDisableProperty] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState();

  const id = match.params.id;

  useEffect(() => {
    dispatch(getSessionsOptions('candidates'));
    dispatch(getSessionsOptions('psychologists'));
    if (id) {
      dispatch(getSession(id));
      //   .catch((err) => {
      //     showErrorMsg(err);
      //   });
    }
  }, [dispatch]);

  useEffect(() => {
    validateFields();
  }, [formData]);

  const submitForm = async (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (!id) {
      dispatch(createSession(formData));
      // setShowModal(true);
      // setModalType('create');
      // setModalTitle('Application Created');

      //   .then(async (res) => {
      //     if (res.status === 201) {
      //       const data = await res.json();
      //       setShowModal(true);
      //       setModalType('create');
      //       setModalTitle('Application Created');
      //       return setModalContent(data.data);
      //     }
      //     const data = await res.json();
      //     showErrorMsg(data.data);
      //   })
      //   .catch((err) => {
      //     showErrorMsg(err);
      //   });
    } else {
      dispatch(updateSession(id, formData));
      // setShowModal(true);
      // setModalType('update');
      // setModalTitle('Application Updated');

      // fetch(`${url}/${resource}/${id}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(formData),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      //   .then(async (res) => {
      //     if (res.status === 200) {
      //       const data = await res.json();
      //       setShowModal(true);
      //       setModalType('update');
      //       setModalTitle('Application Updated');
      //       const formatData = data.data;
      //       formatData.idCandidate = formatData.idCandidate._id;
      //       formatData.idPsychologist = formatData.idPsychologist._id;
      //       return setModalContent(formatData);
      //     }
      //     const data = await res.json();
      //     showErrorMsg(data.data);
      //   })
      //   .catch((err) => {
      //     showErrorMsg(err);
      //   });
    }
  };

  const updateForm = (field, value) => {
    dispatch(updateSelectedSession(field, value));
  };

  const validateFields = () => {
    if (!formData.idCandidate) setDisableProperty(true);
    else if (!formData.idPsychologist) setDisableProperty(true);
    else if (!formData.date) setDisableProperty(true);
    else setDisableProperty(false);
  };

  const closeModalFn = () => {
    dispatch(hideModal());
    // setShowModal(false);
    history.push('/sessions');
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
          <h1 className={styles.mainTitle}>Create Session</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit Session</h1>
        )}
        <form className={styles.form} onSubmit={submitForm}>
          <Fieldset
            update={id ? true : false}
            currentValue={formData.idCandidate}
            element="select"
            name="candidate"
            objectProperty="idCandidate"
            required
            updateData={updateForm}
            options={options.candidates}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.idPsychologist}
            element="select"
            name="psychologist"
            objectProperty="idPsychologist"
            required
            updateData={updateForm}
            options={options.psychologists}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.date ? formData.date.substr(0, 16) : ''}
            element="input"
            name="date"
            objectProperty="date"
            inputType="datetime-local"
            required
            updateData={updateForm}
          />
          <div className={styles.btnContainer}>
            <button
              className={`${styles.buttonGreen} ${disableProperty && styles.disabled}`}
              type="submit"
              disabled={disableProperty}
            >
              SUBMIT SESSION
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Form;
