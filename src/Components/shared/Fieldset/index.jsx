import Options from '../Options';
import styles from './fieldset.module.css';

function Fieldset(props) {
  let field;
  switch (props.element) {
    case 'select':
      field = (
        <select {...props.input}>
          <Options options={props.options} />
        </select>
      );
      break;
    case 'input':
      field = <input {...props.input}></input>;
      break;
    default:
      break;
  }

  return (
    <fieldset className={styles.fieldset}>
      <label>{props.label}</label>
      {field}
    </fieldset>
  );
}

export default Fieldset;
