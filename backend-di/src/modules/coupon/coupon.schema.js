export const createCouponSchema = {
  code: { required: true, type: 'string', minLength: 3 },
  type: { required: true, type: 'string' },
  value: { required: true, type: 'number', min: 0 },
};

export const updateCouponSchema = {
  type: { type: 'string' },
  value: { type: 'number', min: 0 },
  active: { type: 'boolean' },
};

export const applyCouponSchema = {
  code: { required: true, type: 'string' },
  amount: { required: true, type: 'number', min: 0 },
};
