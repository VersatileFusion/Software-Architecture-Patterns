const BaseEvent = require('./baseEvent');

class UserUpdated extends BaseEvent {
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

module.exports = UserUpdated; 