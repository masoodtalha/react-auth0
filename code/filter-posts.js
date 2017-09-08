// Click "EXAMPLE EVENT" to see whats in `event`
module.exports = function (event) {
  console.log(event.data)
  if (event.data.createPost.description.includes('bad') {
  	return {error: 'bad is not allowed'}
  }
  return {data: event.data}
}
