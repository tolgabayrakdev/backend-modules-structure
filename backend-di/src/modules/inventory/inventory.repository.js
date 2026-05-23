export class InventoryRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const { rows } = await this.db.query('SELECT * FROM inventory ORDER BY created_at DESC');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.db.query('SELECT * FROM inventory WHERE id = $1', [id]);
    return rows[0] ?? null;
  }

  async findByProduct(productId, db = this.db) {
    const { rows } = await db.query('SELECT * FROM inventory WHERE product_id = $1', [productId]);
    return rows[0] ?? null;
  }

  async upsert(productId, quantity, db = this.db) {
    const { rows } = await db.query(
      `INSERT INTO inventory (product_id, quantity)
       VALUES ($1, $2)
       ON CONFLICT (product_id)
       DO UPDATE SET quantity = $2, updated_at = NOW()
       RETURNING *`,
      [productId, quantity],
    );
    return rows[0];
  }

  async addHistory(productId, change, reason, db = this.db) {
    const { rows } = await db.query(
      `INSERT INTO inventory_history (product_id, change, reason)
       VALUES ($1, $2, $3) RETURNING *`,
      [productId, change, reason],
    );
    return rows[0];
  }

  async getHistory(productId) {
    const { rows } = await this.db.query(
      'SELECT * FROM inventory_history WHERE product_id = $1 ORDER BY created_at DESC',
      [productId],
    );
    return rows;
  }

  async findLowStock(threshold = 10) {
    const { rows } = await this.db.query(
      'SELECT * FROM inventory WHERE quantity <= $1 ORDER BY quantity',
      [threshold],
    );
    return rows;
  }
}
