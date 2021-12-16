import Options from '../Options';
import styles from './fieldset.module.css';

function Fieldset(props) {
  const hasError = props.meta.touched && props.meta.error;
  let field;
  switch (props.element) {
    case 'select':
      field = (
        <select {...props.input} className={hasError && styles.inputError}>
          <Options label={props.label} options={props.options} update={props.update} />
        </select>
      );
      break;
    case 'input':
      field = <input {...props.input} className={hasError && styles.inputError}></input>;
      break;
    default:
      break;
  }

  return (
    <fieldset className={styles.fieldset}>
      <label>{props.label}</label>
      {field}
      <div className={styles.messageError}>{props.meta.touched && props.meta.error}</div>
    </fieldset>
  );
}

export default Fieldset;
