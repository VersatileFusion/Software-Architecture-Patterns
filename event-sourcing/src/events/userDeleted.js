const BaseEvent = require('./baseEvent');

class UserDeleted extends BaseEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }

    toJSON() {
        return super.toJSON();
    }
}

module.exports = UserDeleted; 