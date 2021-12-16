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
