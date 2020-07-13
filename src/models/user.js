import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

UserSchema.methods.setPassword = async function (password) {
  // 인스턴스 메서드를 작성할때에는 화살표 함수가 아닌 function키워드를 사용해야한다.
  // 이유는 this 로 문서 인스턴스에 접근해야하는데 화살표 함수를 사용하면 해당 문서인스턴스를 가리키지 못하기 때문이다.
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

// 스태틱함수에서의 this는 모델을 가르킵니다. (User)
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

const User = mongoose.model('User', UserSchema);

export default User;
