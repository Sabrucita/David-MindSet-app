import Options from '../Options';
import styles from './fieldset.module.css';

function Fieldset({ meta, input, element, label, options }) {
  const hasError = meta.touched && meta.error;
  let field;

  switch (element) {
    case 'select':
      field = (
        <select {...input} id={input.name} className={hasError && styles.inputError}>
          <Options label={label} options={options} />
        </select>
      );
      break;
    case 'input':
      field = <input {...input} id={input.name} className={hasError && styles.inputError}></input>;
      break;
    default:
      break;
  }

  return (
    <fieldset className={styles.fieldset}>
      <label htmlFor={input.name}>{label}</label>
      {field}
      <div className={styles.messageError}>{meta.touched && meta.error}</div>
    </fieldset>
  );
}

export default Fieldset;
