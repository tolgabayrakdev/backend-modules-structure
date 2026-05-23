export const createOrderItemSchema = {
  orderId: { required: true, type: 'string' },
  productId: { required: true, type: 'string' },
  quantity: { required: true, type: 'number', min: 1 },
  price: { required: true, type: 'number', min: 0 },
};

export const updateOrderItemSchema = {
  quantity: { type: 'number', min: 1 },
  price: { type: 'number', min: 0 },
};
