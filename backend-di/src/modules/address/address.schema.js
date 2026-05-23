export const createAddressSchema = {
  userId: { required: true, type: 'string' },
  street: { required: true, type: 'string' },
  city: { required: true, type: 'string' },
  country: { required: true, type: 'string' },
  postalCode: { required: true, type: 'string' },
};

export const updateAddressSchema = {
  street: { type: 'string' },
  city: { type: 'string' },
  country: { type: 'string' },
  postalCode: { type: 'string' },
};
