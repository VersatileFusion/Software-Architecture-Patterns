class BaseEntity {
    constructor(id) {
        this.id = id;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    update() {
        this.updatedAt = new Date();
    }

    equals(other) {
        if (!(other instanceof BaseEntity)) {
            return false;
        }
        return this.id === other.id;
    }

    toJSON() {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = BaseEntity; 