export class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const { rows } = await this.db.query('SELECT * FROM users ORDER BY created_at DESC');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0] ?? null;
  }

  async findByEmail(email) {
    const { rows } = await this.db.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0] ?? null;
  }

  async create({ name, email, password, role }) {
    const { rows } = await this.db.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, password, role],
    );
    return rows[0];
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const { rows } = await this.db.query(
      `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = $${keys.length + 1} RETURNING *`,
      [...Object.values(data), id],
    );
    return rows[0] ?? null;
  }

  async delete(id) {
    const { rowCount } = await this.db.query('DELETE FROM users WHERE id = $1', [id]);
    return rowCount > 0;
  }
}
