export const DateSort = (array) => array.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0 ))

export default DateSort;