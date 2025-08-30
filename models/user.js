import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  email_id: String,
  sch_id: String,
  password: String
});

const User = model('User', userSchema);
export default User;