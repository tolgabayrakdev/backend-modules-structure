export class CouponRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const { rows } = await this.db.query('SELECT * FROM coupons ORDER BY created_at DESC');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.db.query('SELECT * FROM coupons WHERE id = $1', [id]);
    return rows[0] ?? null;
  }

  async findByCode(code) {
    const { rows } = await this.db.query(
      'SELECT * FROM coupons WHERE code = $1',
      [code.toUpperCase()],
    );
    return rows[0] ?? null;
  }

  async create({ code, type, value, max_uses, expires_at }) {
    const { rows } = await this.db.query(
      `INSERT INTO coupons (code, type, value, max_uses, expires_at)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [code.toUpperCase(), type, value, max_uses ?? null, expires_at ?? null],
    );
    return rows[0];
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const { rows } = await this.db.query(
      `UPDATE coupons SET ${setClause}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(data), id],
    );
    return rows[0] ?? null;
  }

  async incrementUsage(id) {
    const { rows } = await this.db.query(
      'UPDATE coupons SET used_count = used_count + 1 WHERE id = $1 RETURNING *',
      [id],
    );
    return rows[0] ?? null;
  }

  async delete(id) {
    const { rowCount } = await this.db.query('DELETE FROM coupons WHERE id = $1', [id]);
    return rowCount > 0;
  }
}
