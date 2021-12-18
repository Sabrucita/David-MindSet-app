function Options({ label, options }) {
  return (
    <>
      <option value="" disabled hidden>
        Select a {label}
      </option>
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
