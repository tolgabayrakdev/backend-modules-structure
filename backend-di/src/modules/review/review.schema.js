export const createReviewSchema = {
  productId: { required: true, type: 'string' },
  userId: { required: true, type: 'string' },
  rating: { required: true, type: 'number' },
  comment: { type: 'string' },
};

export const updateReviewSchema = {
  rating: { type: 'number' },
  comment: { type: 'string' },
};
