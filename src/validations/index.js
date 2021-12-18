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

export function validateText(value, field, min, max) {
  let error = {};
  if (!value) {
    error = `${field} is required`;
  } else if (max && value.length > max) {
    error = `${field} must be less than ${max} characters`;
  } else if (min && value.length < min) {
    error = `${field} must be more than ${min} characters`;
  } else {
    return undefined;
  }
  return error;
}

export function validatePhone(formValues, field) {
  let error = {};
  if (!formValues[field]) {
    error = `${field} is required, write your number without 0 and 15`;
  } else if (formValues[field].length > 10) {
    error = `${field} can't be more than 10 numbers, write your number without 0 and 15`;
  } else {
    return undefined;
  }
  return error;
}

export function emailValidationFn(errors, formValues) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  const emailValidation = formValues.email.search(emailRegex);
  if (emailValidation != 0) {
    errors.email = 'Please enter a valid email address';
  }
}
