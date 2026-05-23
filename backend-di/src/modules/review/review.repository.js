export class ReviewRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const { rows } = await this.db.query('SELECT * FROM reviews ORDER BY created_at DESC');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.db.query('SELECT * FROM reviews WHERE id = $1', [id]);
    return rows[0] ?? null;
  }

  async findByProduct(productId) {
    const { rows } = await this.db.query(
      'SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC',
      [productId],
    );
    return rows;
  }

  async findByUser(userId) {
    const { rows } = await this.db.query(
      'SELECT * FROM reviews WHERE user_id = $1 ORDER BY created_at DESC',
      [userId],
    );
    return rows;
  }

  async create({ product_id, user_id, rating, comment }) {
    const { rows } = await this.db.query(
      `INSERT INTO reviews (product_id, user_id, rating, comment)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [product_id, user_id, rating, comment],
    );
    return rows[0];
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const { rows } = await this.db.query(
      `UPDATE reviews SET ${setClause}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(data), id],
    );
    return rows[0] ?? null;
  }

  async delete(id) {
    const { rowCount } = await this.db.query('DELETE FROM reviews WHERE id = $1', [id]);
    return rowCount > 0;
  }
}
