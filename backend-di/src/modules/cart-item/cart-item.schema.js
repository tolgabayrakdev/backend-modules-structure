export const createCartItemSchema = {
  cartId: { required: true, type: 'string' },
  productId: { required: true, type: 'string' },
  quantity: { required: true, type: 'number', min: 1 },
  price: { required: true, type: 'number', min: 0 },
};

export const updateCartItemSchema = {
  quantity: { type: 'number', min: 1 },
  price: { type: 'number', min: 0 },
};
