// import {bcrypt} from "bc"
import bcrypt from "bcrypt";

const genPwd = async (pwd) => {
  const hashed =  bcrypt.hash(pwd, 10);
  console.log(pwd, hashed)
  return hashed;
};

const isValidPwd = async (pwd, userPwd) => {
  return bcrypt.compare(pwd , userPwd);
};

export { genPwd, isValidPwd };
