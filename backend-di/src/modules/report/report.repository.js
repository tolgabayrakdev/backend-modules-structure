export class ReportRepository {
  constructor(db) {
    this.db = db;
  }

  async getOrderStats() {
    const { rows } = await this.db.query(
      `SELECT status, COUNT(*) AS count FROM orders GROUP BY status`,
    );
    return rows.reduce((acc, r) => ({ ...acc, [r.status]: Number(r.count) }), {});
  }

  async getTotalOrders() {
    const { rows } = await this.db.query('SELECT COUNT(*) AS count FROM orders');
    return Number(rows[0].count);
  }

  async getUserStats() {
    const { rows } = await this.db.query(
      `SELECT role, COUNT(*) AS count FROM users GROUP BY role`,
    );
    return rows.reduce((acc, r) => ({ ...acc, [r.role]: Number(r.count) }), {});
  }

  async getTotalUsers() {
    const { rows } = await this.db.query('SELECT COUNT(*) AS count FROM users');
    return Number(rows[0].count);
  }

  async getProductStats() {
    const { rows } = await this.db.query(
      `SELECT category_id, COUNT(*) AS count FROM products GROUP BY category_id`,
    );
    return rows.reduce(
      (acc, r) => ({ ...acc, [r.category_id ?? 'uncategorized']: Number(r.count) }),
      {},
    );
  }

  async getTotalProducts() {
    const { rows } = await this.db.query('SELECT COUNT(*) AS count FROM products');
    return Number(rows[0].count);
  }

  async getRevenueStats() {
    const { rows } = await this.db.query(
      `SELECT COALESCE(SUM(amount), 0) AS total, COUNT(*) AS count
       FROM payments WHERE status = 'completed'`,
    );
    return { total: Number(rows[0].total), count: Number(rows[0].count) };
  }
}
