const BaseDomainEvent = require('./baseDomainEvent');

class UserDeleted extends BaseDomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }

    toJSON() {
        return super.toJSON();
    }
}

module.exports = UserDeleted; 