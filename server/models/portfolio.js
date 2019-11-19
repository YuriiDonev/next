const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  title: { type: String, required: true, maxLength: 256 },
  description: { type: String, required: true, maxLength: 2048 },
  appGoal: { type: String, maxLength: 2048 },
  codeUrl: { type: String, maxLength: 256 },
  deployedAppLink: { type: String, maxLength: 256 },
  imgUrl: { type: String, maxLength: 256 },
  company: { type: String, maxLength: 128},
  language: { type: String, maxLength: 256 },
  startDate: Date,
  endDate: Date,
});

 module.exports = mongoose.model('Portfolio', portfolioSchema);
