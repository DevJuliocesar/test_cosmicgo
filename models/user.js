class Users {
  constructor() {}

  addUser(id, name, email, phone, birthday, status) {
    let user = { id, name, email, phone, birthday, status };
    this.users.push(user);
    return user;
  }

  async getUserList() {
    const client = await this.pool.connect();
    const result = await client.query('SELECT * FROM users');
    const results = { results: result ? result.rows : null };
    client.release();
    return results;
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  removeUser(id) {
    let user = this.getUser(id);

    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return user;
  }
}

module.exports = { Users };
