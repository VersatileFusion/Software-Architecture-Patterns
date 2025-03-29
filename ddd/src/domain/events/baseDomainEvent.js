class BaseDomainEvent {
    constructor(aggregateId, version = 1) {
        this.id = Date.now().toString();
        this.aggregateId = aggregateId;
        this.version = version;
        this.timestamp = new Date();
    }

    toJSON() {
        return {
            id: this.id,
            aggregateId: this.aggregateId,
            version: this.version,
            timestamp: this.timestamp,
            type: this.constructor.name
        };
    }
}

module.exports = BaseDomainEvent; 