import crypto from 'crypto';
import { HttpException } from '../../exceptions/http.exception.js';

export class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  _hash(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  _token() {
    return crypto.randomBytes(32).toString('hex');
  }

  async register({ name, email, password }) {
    const existing = await this.authRepository.findUserByEmail(email);
    if (existing) throw new HttpException(409, 'Email already in use');

    const user = await this.authRepository.createUser({
      name,
      email,
      password: this._hash(password),
      role: 'user',
    });
    const { password: _, ...safe } = user;
    return safe;
  }

  async login({ email, password }) {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user || user.password !== this._hash(password)) {
      throw new HttpException(401, 'Invalid credentials');
    }
    const accessToken = this._token();
    const refreshToken = this._token();
    await this.authRepository.saveRefreshToken(user.id, refreshToken);
    const { password: _, ...safe } = user;
    return { user: safe, accessToken, refreshToken };
  }

  async logout(refreshToken) {
    const entry = await this.authRepository.findRefreshToken(refreshToken);
    if (!entry) throw new HttpException(400, 'Token not found');
    await this.authRepository.deleteRefreshToken(refreshToken);
  }

  async refreshToken(token) {
    const entry = await this.authRepository.findRefreshToken(token);
    if (!entry) throw new HttpException(401, 'Invalid refresh token');
    const user = await this.authRepository.findUserById(entry.userId);
    if (!user) throw new HttpException(404, 'User not found');
    await this.authRepository.deleteRefreshToken(token);
    const accessToken = this._token();
    const newRefresh = this._token();
    await this.authRepository.saveRefreshToken(user.id, newRefresh);
    return { accessToken, refreshToken: newRefresh };
  }
}
