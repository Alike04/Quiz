const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ["teacher", "student"] },
})

UserSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email: email });
  return user;
};

module.exports = mongoose.model("user", UserSchema)