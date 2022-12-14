function returnDate(post) {
  let commingDate = new Date(post.date);
  let commingMonth = commingDate.getMonth();
  let months = [
    "Jun",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return ` ${months[commingMonth]}-${commingDate.getDate()}-
        ${commingDate.getFullYear()}`;
}
module.exports = returnDate;
