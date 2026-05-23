export const createProductSchema = {
  name: { required: true, type: 'string', minLength: 2 },
  price: { required: true, type: 'number', min: 0 },
  categoryId: { required: true, type: 'string' },
  description: { type: 'string' },
};

export const updateProductSchema = {
  name: { type: 'string', minLength: 2 },
  price: { type: 'number', min: 0 },
  categoryId: { type: 'string' },
  description: { type: 'string' },
};
