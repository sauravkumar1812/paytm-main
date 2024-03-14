const mongoose = require("mongoose");


//  Data Base created
mongoose.connect("mongodb://localhost:27017/paytm")
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

const accountSchema = new mongoose.Schema({
  userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true
  },
  balance: {
    type: Number,
    required: true
  }
});
const Account = mongoose.model('Account',accountSchema)
const user = mongoose.model('user',userSchema);

module.exports = {
    user,
    Account,
};
router.use(express.json())