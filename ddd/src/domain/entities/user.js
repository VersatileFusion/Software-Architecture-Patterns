const BaseEntity = require('./baseEntity');
const Email = require('../value-objects/email');

class User extends BaseEntity {
    constructor(id, name, email) {
        super(id);
        this.name = name;
        this.email = new Email(email);
        this.validate();
    }

    validate() {
        if (!this.name || this.name.trim().length === 0) {
            throw new Error('Name is required');
        }
    }

    updateName(name) {
        if (!name || name.trim().length === 0) {
            throw new Error('Name is required');
        }
        this.name = name;
        this.update();
    }

    updateEmail(email) {
        this.email = new Email(email);
        this.update();
    }

    equals(other) {
        if (!(other instanceof User)) {
            return false;
        }
        return this.id === other.id;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            email: this.email.toJSON()
        };
    }
}

module.exports = User; 