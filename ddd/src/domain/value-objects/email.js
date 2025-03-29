class Email {
    constructor(value) {
        if (!this.isValidEmail(value)) {
            throw new Error('Invalid email format');
        }
        this.value = value.toLowerCase();
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    equals(other) {
        if (!(other instanceof Email)) {
            return false;
        }
        return this.value === other.value;
    }

    toString() {
        return this.value;
    }

    toJSON() {
        return this.value;
    }
}

module.exports = Email; 