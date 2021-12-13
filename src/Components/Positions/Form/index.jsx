import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { positionsCleanup, updateSelectedPosition } from '../../../redux/positions/actions';
import {
  createPosition,
  getPosition,
  getPositionsOptions,
  updatePosition
} from '../../../redux/positions/thunks';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';

function Form({ match }) {
  const dispatch = useDispatch();

  const options = useSelector((store) => store.positions.options);
  const formData = useSelector((store) => store.positions.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  const [disableProperty, setDisableProperty] = useState(true);

  const id = match.params.id;

  useEffect(() => {
    dispatch(getPositionsOptions('companies'));
    if (id) {
      dispatch(getPosition(id));
    }
  }, [dispatch]);

  useEffect(() => {
    validateFields();
  }, [formData]);

  useEffect(() => {
    return () => {
      dispatch(positionsCleanup());
    };
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (!id) {
      dispatch(createPosition(formData));
    } else {
      dispatch(updatePosition(id, formData));
    }
  };

  const updateForm = (field, value) => {
    dispatch(updateSelectedPosition(field, value));
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

  return (
    <>
      {modal && <Modal />}
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
            name="company"
            objectProperty="idCompany"
            required
            updateData={updateForm}
            options={options.companies}
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
