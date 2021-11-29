function InputDate(props) {
  let dateValue;
  if (props.interviewToUpdate) {
    dateValue = dateValue = new Date(props.interviewToUpdate.date);
    dateValue = `${dateValue.getFullYear()}-${dateValue.getMonth() + 1}-${dateValue.getDate() + 1}`;
  }

  return (
    <li>
      <label htmlFor={props.htmlFor}>Date</label>
      <input type={props.type} value={dateValue} name={props.name} onChange={props.onChange} />
      {/* <span className={styles.msgError}>*Insert a date.</span> */}
    </li>
  );
}

export default InputDate;
