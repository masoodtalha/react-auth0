import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  search: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const search = mongoose.model('Search', schema);
export default search;