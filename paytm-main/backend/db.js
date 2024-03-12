const mongoose = require("mongoose");


//  Data Base created
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    minLength: 50,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minLength: 50,
  },
});

const user = mongoose.model('user',userSchema);

module.exports = {
    user
};
