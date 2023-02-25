export const authConfig = () => ({
  JWT_SECRET: process.env.JWT_SECRET_KEY,
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH_KEY,
  TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME: process.env.TOKEN_REFRESH_EXPIRE_TIME,
  CRYPT_SALT: process.env.CRYPT_SALT,
});
