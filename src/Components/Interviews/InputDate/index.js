function InputDate(props) {
  let dateValue;
  if (props.interviewToUpdate) {
    dateValue = new Date(props.interviewToUpdate.date);
    dateValue.setDate(dateValue.getDate() + 1);
    let day = dateValue.getDate();
    if (day < 10) {
      day = day.toString();
      day = `0${day}`;
    }
    let month = dateValue.getMonth() + 1;
    if (month < 10) {
      month = month.toString();
      month = `0${month}`;
    }
    let year = dateValue.getFullYear();
    dateValue = `${year}-${month}-${day}`;
  }

  return (
    <li>
      <label htmlFor={props.htmlFor}>Date</label>
      <input
        type={props.type}
        defaultValue={dateValue}
        name={props.name}
        onChange={props.onChange}
      />
      {/* <span className={styles.msgError}>*Insert a date.</span> */}
    </li>
  );
}

export default InputDate;
