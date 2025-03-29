class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  update(name, email) {
    this.name = name;
    this.email = email;
    this.updatedAt = new Date();
  }

  validate() {
    if (!this.name || !this.email) {
      throw new Error('Name and email are required');
    }
    if (!this.isValidEmail(this.email)) {
      throw new Error('Invalid email format');
    }
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = User; 