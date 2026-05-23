export const addItemSchema = {
  productId: { required: true, type: 'string' },
  quantity: { required: true, type: 'number', min: 1 },
  price: { required: true, type: 'number', min: 0 },
};
