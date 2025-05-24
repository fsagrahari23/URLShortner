import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: function () {
      const emailHash = crypto.createHash('md5').update(this.email.trim().toLowerCase()).digest('hex');
      return `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
    }
  }
});

const User = mongoose.model("User", userSchema);

export default User;
