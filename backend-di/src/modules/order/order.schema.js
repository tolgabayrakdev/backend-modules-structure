export const createOrderSchema = {
  userId: { required: true, type: 'string' },
  addressId: { required: true, type: 'string' },
};

export const updateOrderSchema = {
  addressId: { type: 'string' },
};

export const updateStatusSchema = {
  status: { required: true, type: 'string' },
};
