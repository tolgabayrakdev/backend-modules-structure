export class AuthRepository {
  constructor(db) {
    this.db = db;
  }

  async findUserByEmail(email) {
    const { rows } = await this.db.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0] ?? null;
  }

  async findUserById(id) {
    const { rows } = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0] ?? null;
  }

  async createUser({ name, email, password, role }) {
    const { rows } = await this.db.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, password, role],
    );
    return rows[0];
  }

  async saveRefreshToken(userId, token) {
    const { rows } = await this.db.query(
      'INSERT INTO tokens (user_id, token) VALUES ($1, $2) RETURNING *',
      [userId, token],
    );
    return rows[0];
  }

  async findRefreshToken(token) {
    const { rows } = await this.db.query('SELECT * FROM tokens WHERE token = $1', [token]);
    return rows[0] ?? null;
  }

  async deleteRefreshToken(token) {
    await this.db.query('DELETE FROM tokens WHERE token = $1', [token]);
  }
}
