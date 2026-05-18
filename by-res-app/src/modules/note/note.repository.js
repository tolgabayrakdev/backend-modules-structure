import { db } from '../../config/db.js';

const TABLE = 'notes';

export const noteRepository = {
  findAllByUser: (userId) => db(TABLE).where({ user_id: userId }),

  findById: (id) => db(TABLE).where({ id }).first(),

  create: (data) => db(TABLE).insert(data).returning('*').then((r) => r[0]),

  update: (id, data) =>
    db(TABLE).where({ id }).update(data).returning('*').then((r) => r[0]),

  remove: (id) => db(TABLE).where({ id }).del(),
};
