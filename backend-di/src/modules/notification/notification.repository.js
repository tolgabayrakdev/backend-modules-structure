export class NotificationRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const { rows } = await this.db.query('SELECT * FROM notifications ORDER BY created_at DESC');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.db.query('SELECT * FROM notifications WHERE id = $1', [id]);
    return rows[0] ?? null;
  }

  async findByUser(userId) {
    const { rows } = await this.db.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
      [userId],
    );
    return rows;
  }

  async create({ user_id, title, message, type }) {
    const { rows } = await this.db.query(
      `INSERT INTO notifications (user_id, title, message, type)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, title, message, type],
    );
    return rows[0];
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const { rows } = await this.db.query(
      `UPDATE notifications SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(data), id],
    );
    return rows[0] ?? null;
  }

  async markAllRead(userId) {
    await this.db.query(
      `UPDATE notifications SET read = true, read_at = NOW()
       WHERE user_id = $1 AND read = false`,
      [userId],
    );
  }

  async delete(id) {
    const { rowCount } = await this.db.query('DELETE FROM notifications WHERE id = $1', [id]);
    return rowCount > 0;
  }
}
