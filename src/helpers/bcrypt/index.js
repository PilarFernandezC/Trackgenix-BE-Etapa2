import bcrypt from 'bcrypt';

const saltRounds = 8;

const hashPassword = (password) => bcrypt.hashSync(password, saltRounds);
const compareHashPassword = (password) => bcrypt.compareSync(password, hashPassword);

export {
  hashPassword,
  compareHashPassword,
};
