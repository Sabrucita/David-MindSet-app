// SOLAMENTE VALIDACIONES COMPARTIDAS
// AVISAR POR WP / SLACK CUANDO SE AGREGUE ALGUNA!!!! O HAY TABLA

export const pastDatesValidation = (date) => {
  const today = new Date();
  date = new Date(date);
  if (date < today) {
    return `Date must be later than today's date`;
  }
  return undefined;
};

export function validateText(formValues, field) {
  let error = {};
  if (!formValues[field]) {
    error = `${field} is required`;
  } else if (formValues[field].length > 40) {
    error = `${field} must be less than 40 characters`;
  } else if (formValues[field].length < 2) {
    error = `${field} must be more than 2 characters`;
  } else {
    return undefined;
  }
  return error;
}
