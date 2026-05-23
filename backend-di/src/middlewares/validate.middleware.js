export const validate = (schema) => (req, res, next) => {
  const errors = [];

  for (const [field, rules] of Object.entries(schema)) {
    const value = req.body?.[field];
    const isEmpty = value === undefined || value === null || value === '';

    if (rules.required && isEmpty) {
      errors.push({ field, message: `${field} is required` });
      continue;
    }

    if (!isEmpty) {
      if (rules.type && typeof value !== rules.type) {
        errors.push({ field, message: `${field} must be a ${rules.type}` });
      }
      if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        errors.push({ field, message: `${field} must be at least ${rules.minLength} characters` });
      }
      if (rules.min && typeof value === 'number' && value < rules.min) {
        errors.push({ field, message: `${field} must be at least ${rules.min}` });
      }
    }
  }

  if (errors.length > 0) {
    return res.status(422).json({ success: false, errors });
  }

  next();
};
