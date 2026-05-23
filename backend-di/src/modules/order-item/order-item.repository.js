export class OrderItemRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const { rows } = await this.db.query('SELECT * FROM order_items');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.db.query('SELECT * FROM order_items WHERE id = $1', [id]);
    return rows[0] ?? null;
  }

  async findByOrder(orderId) {
    const { rows } = await this.db.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [orderId],
    );
    return rows;
  }

  async create({ order_id, product_id, quantity, price }) {
    const { rows } = await this.db.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [order_id, product_id, quantity, price],
    );
    return rows[0];
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const { rows } = await this.db.query(
      `UPDATE order_items SET ${setClause}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(data), id],
    );
    return rows[0] ?? null;
  }

  async delete(id) {
    const { rowCount } = await this.db.query('DELETE FROM order_items WHERE id = $1', [id]);
    return rowCount > 0;
  }
}
