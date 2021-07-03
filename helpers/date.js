const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

function getMonth(date){
  const month = date.getUTCMonth(); //months from 1-12

  return months[month]
}

function getYear(date){
  return date.getUTCFullYear();
}

function getDay(date){
  return date.getUTCDate();
}

module.exports.getMonth = getMonth
module.exports.getYear = getYear
module.exports.getDay = getDay