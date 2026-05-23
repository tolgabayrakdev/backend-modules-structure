export const createUserSchema = {
  name: { required: true, type: 'string', minLength: 2 },
  email: { required: true, type: 'string' },
  password: { required: true, type: 'string', minLength: 6 },
};

export const updateUserSchema = {
  name: { type: 'string', minLength: 2 },
  email: { type: 'string' },
};
