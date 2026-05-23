import { withTransaction } from '../../config/db.js';

export class AddressRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const { rows } = await this.db.query('SELECT * FROM addresses ORDER BY created_at DESC');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.db.query('SELECT * FROM addresses WHERE id = $1', [id]);
    return rows[0] ?? null;
  }

  async findByUser(userId) {
    const { rows } = await this.db.query('SELECT * FROM addresses WHERE user_id = $1', [userId]);
    return rows;
  }

  async create({ user_id, street, city, country, postal_code }) {
    const { rows } = await this.db.query(
      `INSERT INTO addresses (user_id, street, city, country, postal_code)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, street, city, country, postal_code],
    );
    return rows[0];
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const { rows } = await this.db.query(
      `UPDATE addresses SET ${setClause}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(data), id],
    );
    return rows[0] ?? null;
  }

  async setDefault(userId, id) {
    return withTransaction(async (client) => {
      await client.query(
        'UPDATE addresses SET is_default = false WHERE user_id = $1',
        [userId],
      );
      const { rows } = await client.query(
        'UPDATE addresses SET is_default = true, updated_at = NOW() WHERE id = $1 RETURNING *',
        [id],
      );
      return rows[0] ?? null;
    });
  }

  async delete(id) {
    const { rowCount } = await this.db.query('DELETE FROM addresses WHERE id = $1', [id]);
    return rowCount > 0;
  }
}
