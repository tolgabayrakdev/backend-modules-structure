export const createPaymentSchema = {
  orderId: { required: true, type: 'string' },
  userId: { required: true, type: 'string' },
  amount: { required: true, type: 'number', min: 0 },
  method: { required: true, type: 'string' },
};
