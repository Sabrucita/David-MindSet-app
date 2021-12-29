export const pastDatesValidation = (date) => {
  if (!date) return 'Date is required';
  const today = new Date();
  date = new Date(date);
  if (date < today) return `Date must be later than today's date`;
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
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  if (!value) return 'Email is required';
  if (value.search(emailRegex) != 0) return 'Please enter a valid email address';
}

export const laterDateValidation = (startDate, endDate) => {
  if (!startDate) return pastDatesValidation(endDate);
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  if (endDate < startDate) return `End date must be later than start date`;
};

export const birthdayValidation = (date) => {
  if (!date) return 'Birthday is required';
  const today = new Date();
  let yy18 = today.getFullYear() - 18;
  let mm18 = today.getMonth();
  let dd18 = today.getDate();
  let refDate = new Date(yy18, mm18, dd18);
  date = new Date(date);
  if (date > refDate) return 'Only over 18s can sign up';
};

export function validateZipCode(value) {
  if (!value) return `Zip Code is required`;
  if (value >= 10000) {
    return `Zip Code must be less than 10000`;
  }
}

export function validatePassword(pass2, pass1) {
  if (pass2 !== pass1) return `Passwords do not match`;
}

export function validateAddressNumber(value) {
  if (!value) return `Address Number is required`;
  if (value >= 10000) {
    return `Address Number must be less than 10000`;
  }
}
