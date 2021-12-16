function Options({ name, update, options }) {
  return (
    <>
      {!update ? (
        <option value="" disabled hidden>
          Select a {name}
        </option>
      ) : (
        <option value="" disabled hidden></option>
      )}
      {options.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.id}
          </option>
        );
      })}
    </>
  );
}
export default Options;
