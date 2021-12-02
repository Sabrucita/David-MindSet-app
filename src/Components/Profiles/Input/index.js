function Input(props) {
  let preloadValue = '';

  if (props.profileToUpdate) {
    preloadValue = props.profileToUpdate.name;
  }

  return (
    <li>
      <label htmlFor={props.htmlFor}>{props.labelTitle}</label>
      <input
        name={props.nameSelect}
        onChange={props.onchangeValue}
        defaultValue={preloadValue}
        required
      />
    </li>
  );
}

export default Input;
