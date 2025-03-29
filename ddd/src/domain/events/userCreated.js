const BaseDomainEvent = require('./baseDomainEvent');

class UserCreated extends BaseDomainEvent {
    constructor(aggregateId, name, email) {
        super(aggregateId);
        this.name = name;
        this.email = email;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            email: this.email
        };
    }
}

module.exports = UserCreated; 