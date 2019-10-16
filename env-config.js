
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BASE_URL': prod ? 'https://yuriidonev.herokuapp.com' : 'http://localhost:3000',
  'process.env.NAMESPACE': 'https://yuriidonev.herokuapp.com',
  'process.env.CLIENT_ID': 'fsEcjiFlMrxDEd7amFtfAtH2rH4k6bw0'
}
