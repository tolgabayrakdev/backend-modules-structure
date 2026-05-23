export const createCategorySchema = {
  name: { required: true, type: 'string', minLength: 2 },
  parentId: { type: 'string' },
};

export const updateCategorySchema = {
  name: { type: 'string', minLength: 2 },
  parentId: { type: 'string' },
};
