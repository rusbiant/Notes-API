const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, hashedPassword, fullname],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('user gagal ditambahkan');
    }
    
    return result.rows[0].id;
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if(result.rows.length > 0) {
      throw new InvariantError('gagal menambahkan user. username sudah digunakan');
    }
  }

  async getUserById(userId) {
    const query = {
      text: 'SELECT id,username,fullname FROM users WHERE id = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('user tidak ditemukan');
    }

    return result.rows[0];
  }

  async verifyUserCredential(username, password) {
    const query ={
      text: 'SELECT id,password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if(!result.rows.length) {
      throw new AuthenticationError('kredensial yang anda masukan salah');
    }

    const { id, password: hashedPassword } =result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if(!match) {
      throw new AuthenticationError('kredensial yang anda berikan salah');
    }

    return id;
  }
}

module.exports = UsersService;
