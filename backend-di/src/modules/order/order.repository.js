export class OrderRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const { rows } = await this.db.query('SELECT * FROM orders ORDER BY created_at DESC');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.db.query('SELECT * FROM orders WHERE id = $1', [id]);
    return rows[0] ?? null;
  }

  async findByUser(userId) {
    const { rows } = await this.db.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId],
    );
    return rows;
  }

  async create({ user_id, address_id }) {
    const { rows } = await this.db.query(
      `INSERT INTO orders (user_id, address_id) VALUES ($1, $2) RETURNING *`,
      [user_id, address_id],
    );
    return rows[0];
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const { rows } = await this.db.query(
      `UPDATE orders SET ${setClause}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(data), id],
    );
    return rows[0] ?? null;
  }

  async delete(id) {
    const { rowCount } = await this.db.query('DELETE FROM orders WHERE id = $1', [id]);
    return rowCount > 0;
  }
}
