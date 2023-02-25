declare namespace Express {
  export interface Request {
    user?: import('../src/auth/auth.type').AuthUserType;
  }
}
