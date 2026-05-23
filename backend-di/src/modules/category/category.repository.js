export class CategoryRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const { rows } = await this.db.query('SELECT * FROM categories ORDER BY name');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.db.query('SELECT * FROM categories WHERE id = $1', [id]);
    return rows[0] ?? null;
  }

  async create({ name, parent_id = null }) {
    const { rows } = await this.db.query(
      'INSERT INTO categories (name, parent_id) VALUES ($1, $2) RETURNING *',
      [name, parent_id],
    );
    return rows[0];
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const { rows } = await this.db.query(
      `UPDATE categories SET ${setClause}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(data), id],
    );
    return rows[0] ?? null;
  }

  async delete(id) {
    const { rowCount } = await this.db.query('DELETE FROM categories WHERE id = $1', [id]);
    return rowCount > 0;
  }
}
