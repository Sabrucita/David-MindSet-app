import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  createInterview,
  updateInterview,
  getInterview,
  getInterviewsOptions
} from '../../../redux/interviews/thunks';
import { updateSelectedInterview, interviewsCleanUp } from '../../../redux/interviews/actions';

function Form({ match }) {
  const [disableProperty, setDisableProperty] = useState(false);

  const dispatch = useDispatch();
  const formData = useSelector((store) => store.interviews.selectedElement);
  const options = useSelector((store) => store.interviews.options);
  const modal = useSelector((store) => store.modal.show);

  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    dispatch(getInterviewsOptions('candidates'));
    dispatch(getInterviewsOptions('companies'));
    if (operation === 'update') {
      dispatch(getInterview(id));
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(interviewsCleanUp());
    };
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (operation === 'create') {
      dispatch(createInterview(formData));
    } else {
      dispatch(updateInterview(id, formData));
    }
    setDisableProperty(false);
  };

  const updateForm = (field, value) => {
    dispatch(updateSelectedInterview(field, value));
  };

  return (
    <>
      {modal && <Modal />}
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
            name="candidate"
            objectProperty="idCandidate"
            required
            updateData={updateForm}
            options={options.candidates}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.idCompany}
            element="select"
            name="company"
            objectProperty="idCompany"
            required
            updateData={updateForm}
            options={options.companies}
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
