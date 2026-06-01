// import {bcrypt} from "bc"
import bcrypt from "bcrypt";

const genPwd = async (pwd) => {
  return bcrypt.hash(pwd, 10);
};

const isValidPwd = async (pwd, userPwd) => {
  return bcrypt.compare(pwd === userPwd);
};

export { genPwd, isValidPwd };
