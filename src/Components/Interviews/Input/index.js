function Input(props) {
  let optionData = [];
  let preloadValue;

  //load the select options list
  if (props.type === 'company') {
    optionData = props.data.map((company) => {
      return `${company._id} / ${company.name} `;
    });
    if (props.interviewToUpdate) {
      //if update, preload the select option
      let companyFound = props.data.find(
        (company) => company._id === props.interviewToUpdate.idCompany._id
      );
      preloadValue = `${companyFound._id} / ${companyFound.name}`;
    }
  } else if (props.type === 'candidate') {
    optionData = props.data.map((candidate) => {
      return `${candidate._id} / ${candidate.firstName}  ${candidate.lastName}`;
    });
    if (props.interviewToUpdate) {
      let candidateFound = props.data.find(
        (candidate) => candidate._id === props.interviewToUpdate.idCandidate._id
      );
      preloadValue = `${candidateFound._id} / ${candidateFound.firstName} / ${candidateFound.lastName}`;
    }
  } else if (props.type === 'status') {
    optionData[0] = 'True';
    optionData[1] = 'False';
    if (props.interviewToUpdate) {
      preloadValue = props.interviewToUpdate.status ? 'True' : 'False';
      optionData = optionData.filter((element) => element !== preloadValue);
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
          return <option key={data._id}>{data}</option>;
        })}
      </select>
    </li>
  );
}

export default Input;
