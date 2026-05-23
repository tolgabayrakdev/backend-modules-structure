export const registerSchema = {
  name: { required: true, type: 'string', minLength: 2 },
  email: { required: true, type: 'string' },
  password: { required: true, type: 'string', minLength: 6 },
};

export const loginSchema = {
  email: { required: true, type: 'string' },
  password: { required: true, type: 'string' },
};

export const refreshTokenSchema = {
  refreshToken: { required: true, type: 'string' },
};
