function Options({ label, update, options }) {
  return (
    <>
      {!update ? (
        <option value="" disabled hidden>
          Select a {label}
        </option>
      ) : (
        <option value="" disabled hidden></option>
      )}
      {options.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        );
      })}
    </>
  );
}
export default Options;
