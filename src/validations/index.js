// SOLAMENTE VALIDACIONES COMPARTIDAS
// AVISAR POR WP / SLACK CUANDO SE AGREGUE ALGUNA!!!! O HAY TABLA

export const pastDatesValidation = (date) => {
  if (!date) return 'Date is required';
  const today = new Date();
  date = new Date(date);
  if (date < today) return `Date must be later than today's date`;
};

export const laterDateValidation = (startDate, endDate) => {
  if (!startDate) return pastDatesValidation(endDate);
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  if (endDate < startDate) return `End date must be later than start date`;
};

export function validateText(value, field, min, max) {
  if (!value) return `${field} is required`;
  if (max && value.length > max) return `${field} must be less than ${max} characters`;
  if (min && value.length < min) return `${field} must be more than ${min} characters`;
}

export function validatePhone(value, field) {
  if (!value) return `${field} is required, write your number without 0 and 15`;
  if (value.length > 10)
    return `${field} can't be more than 10 numbers, write your number without 0 and 15`;
}

export function validateEmail(value) {
  const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,})+$/;
  if (!value) return 'Email is required';
  if (value.search(emailRegex) != 0) return 'Please enter a valid email address';
}
