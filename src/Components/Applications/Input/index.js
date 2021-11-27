function Input(props) {
  let optionData = [];
  if (props.type === 'position') {
    optionData = props.data.map((position) => {
      return `${position._id} / ${position.idCompany} / ${position.jobDescription}`;
    });
  } else if (props.type === 'candidate') {
    optionData = props.data.map((candidate) => {
      return `${candidate._id} / ${candidate.firstName}  ${candidate.lastName}`;
    });
  }

  return (
    <li>
      <label htmlFor={props.htmlFor}>{props.labelTitle}</label>
      <select
        name={props.nameSelect}
        id={props.idSelect}
        value={props.value}
        onChange={props.onchangeSelect}
      >
        <option disabled selected value>
          -- select an option --
        </option>
        {optionData.map((data) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <option>{data}</option>
          );
        })}
      </select>
    </li>
  );
}

export default Input;
