export class CartRepository {
  constructor(db) {
    this.db = db;
  }

  async findByUser(userId) {
    const { rows } = await this.db.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
    return rows[0] ?? null;
  }

  async create(userId) {
    const { rows } = await this.db.query(
      'INSERT INTO carts (user_id) VALUES ($1) RETURNING *',
      [userId],
    );
    return rows[0];
  }

  async findItemsByCart(cartId) {
    const { rows } = await this.db.query('SELECT * FROM cart_items WHERE cart_id = $1', [cartId]);
    return rows;
  }

  async addItem(cartId, productId, quantity, price) {
    const { rows } = await this.db.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity, price)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (cart_id, product_id)
       DO UPDATE SET quantity = cart_items.quantity + $3, updated_at = NOW()
       RETURNING *`,
      [cartId, productId, quantity, price],
    );
    return rows[0];
  }

  async removeItem(cartId, productId) {
    const { rowCount } = await this.db.query(
      'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2',
      [cartId, productId],
    );
    return rowCount > 0;
  }

  async clearItems(cartId) {
    await this.db.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
  }
}
