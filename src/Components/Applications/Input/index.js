function Input(props) {
  let optionData = [];
  let preloadValue;

  //load the select options list
  if (props.type === 'position') {
    optionData = props.data.map((position) => {
      return `${position._id} / ${position.idCompany} / ${position.jobDescription}`;
    });
    if (props.applicationToUpdate) {
      //if update, preload the select option
      let positionFound = props.data.find(
        (position) => position._id === props.applicationToUpdate.idOpenPosition._id
      );
      preloadValue = `${positionFound._id} / ${positionFound.idCompany} / ${positionFound.jobDescription}`;
    }
  } else if (props.type === 'candidate') {
    optionData = props.data.map((candidate) => {
      return `${candidate._id} / ${candidate.firstName}  ${candidate.lastName}`;
    });
    if (props.applicationToUpdate) {
      let candidateFound = props.data.find(
        (candidate) => candidate._id === props.applicationToUpdate.idCandidate._id
      );
      preloadValue = `${candidateFound._id} / ${candidateFound.firstName} / ${candidateFound.lastName}`;
    }
  }

  return (
    <li>
      <label htmlFor={props.htmlFor}>{props.labelTitle}</label>
      <select name={props.nameSelect} id={props.idSelect} onChange={props.onchangeSelect}>
        {props.typeForm === 'create' && (
          <option disabled selected>
            -- select an option --
          </option>
        )}
        {props.typeForm === 'update' && <option selected>{preloadValue}</option>}
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
