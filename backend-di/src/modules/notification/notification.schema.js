export const sendNotificationSchema = {
  userId: { required: true, type: 'string' },
  title: { required: true, type: 'string' },
  message: { required: true, type: 'string' },
  type: { type: 'string' },
};
