export class PaymentRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const { rows } = await this.db.query('SELECT * FROM payments ORDER BY created_at DESC');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.db.query('SELECT * FROM payments WHERE id = $1', [id]);
    return rows[0] ?? null;
  }

  async findByUser(userId) {
    const { rows } = await this.db.query(
      'SELECT * FROM payments WHERE user_id = $1 ORDER BY created_at DESC',
      [userId],
    );
    return rows;
  }

  async create({ order_id, user_id, amount, method }) {
    const { rows } = await this.db.query(
      `INSERT INTO payments (order_id, user_id, amount, method)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [order_id, user_id, amount, method],
    );
    return rows[0];
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const { rows } = await this.db.query(
      `UPDATE payments SET ${setClause}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(data), id],
    );
    return rows[0] ?? null;
  }
}
