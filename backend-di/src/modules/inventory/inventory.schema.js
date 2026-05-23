export const updateStockSchema = {
  quantity: { required: true, type: 'number', min: 0 },
  reason: { type: 'string' },
};
