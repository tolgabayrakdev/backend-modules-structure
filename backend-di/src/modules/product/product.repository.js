export class ProductRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const { rows } = await this.db.query('SELECT * FROM products ORDER BY created_at DESC');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.db.query('SELECT * FROM products WHERE id = $1', [id]);
    return rows[0] ?? null;
  }

  async findByCategory(categoryId) {
    const { rows } = await this.db.query(
      'SELECT * FROM products WHERE category_id = $1 ORDER BY created_at DESC',
      [categoryId],
    );
    return rows;
  }

  async findFeatured() {
    const { rows } = await this.db.query('SELECT * FROM products WHERE featured = true');
    return rows;
  }

  async search(query) {
    const { rows } = await this.db.query(
      'SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1',
      [`%${query}%`],
    );
    return rows;
  }

  async create({ name, description, price, category_id, featured = false }) {
    const { rows } = await this.db.query(
      `INSERT INTO products (name, description, price, category_id, featured)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description, price, category_id, featured],
    );
    return rows[0];
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const { rows } = await this.db.query(
      `UPDATE products SET ${setClause}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(data), id],
    );
    return rows[0] ?? null;
  }

  async delete(id) {
    const { rowCount } = await this.db.query('DELETE FROM products WHERE id = $1', [id]);
    return rowCount > 0;
  }
}
