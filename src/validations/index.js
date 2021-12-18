// SOLAMENTE VALIDACIONES COMPARTIDAS
// AVISAR POR WP / SLACK CUANDO SE AGREGUE ALGUNA!!!! O HAY TABLA

export const pastDatesValidation = (date) => {
  if (!date) return `Date is required`;
  const today = new Date();
  date = new Date(date);
  if (date < today) return `Date must be later than today's date`;
};

export const validateText = (value, field, min, max) => {
  if (!value) return `${field} is required`;
  if (min && value.length < min) return `${field} must be more than ${min} characters`;
  if (max && value.length > max) return `${field} must be less than ${max} characters`;
};
