import { db } from '../../config/db.js';

const TABLE = 'users';

export const userRepository = {
  findAll: () => db(TABLE).select('*'),

  findById: (id) => db(TABLE).where({ id }).first(),

  findByEmail: (email) => db(TABLE).where({ email }).first(),

  create: (data) => db(TABLE).insert(data).returning('*').then((r) => r[0]),

  update: (id, data) =>
    db(TABLE).where({ id }).update(data).returning('*').then((r) => r[0]),

  remove: (id) => db(TABLE).where({ id }).del(),
};
