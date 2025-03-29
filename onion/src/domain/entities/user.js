class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    validate() {
        if (!this.name) {
            throw new Error('Name is required');
        }
        if (!this.email) {
            throw new Error('Email is required');
        }
        if (!this.isValidEmail(this.email)) {
            throw new Error('Invalid email format');
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    update(name, email) {
        if (name) this.name = name;
        if (email) {
            if (!this.isValidEmail(email)) {
                throw new Error('Invalid email format');
            }
            this.email = email;
        }
        this.updatedAt = new Date();
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