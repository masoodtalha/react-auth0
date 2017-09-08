// Click "EXAMPLE EVENT" to see whats in `event`
module.exports = function (event) {
  console.log(event.data)
  return {data: event.data}
}
