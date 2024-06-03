import { validate } from '../../components/Validation/index';

describe('Email validation', () => {
    it('should allow valid email addresses', () => {
        expect(validate.email.isEmail('user@example.com')).toBe(true);
        expect(validate.email.isEmail('another.user@domain.co.uk')).toBe(true);
    });
    it('should have no leading or trailing whitespace', () => {
        expect(validate.email.noWhitespace('user@example.com')).toBe(true);
        expect(validate.email.noWhitespace('        user@example.com  ')).toBe(
            'Must not contain leading or trailing whitespace',
        );
    });
    it('should reject invalid email addresses', () => {
        expect(validate.email.isEmail('invalid-email')).toBe('Must be properly formatted (e.g., user@example.com)');
        expect(validate.email.isEmail('user@')).toBe('Must be properly formatted (e.g., user@example.com)');
    });
    it('should have a domain name', () => {
        expect(validate.email.hasDomainName('invalid-email')).toBe('Must contain a domain name (e.g., example.com)');
        expect(validate.email.hasDomainName('user@example.com')).toBe(true);
    });
});

describe('Password validation', () => {
    it('should require at least one uppercase letter', () => {
        expect(validate.password.hasUpperCase('password')).toBe('Must contain at least one uppercase letter');
        expect(validate.password.hasUpperCase('Password1')).toBe(true);
    });
    it('should require at least one lowercase letter', () => {
        expect(validate.password.hasLowerCase('PASS')).toBe('Must contain at least one lowercase letter');
        expect(validate.password.hasLowerCase('Password1')).toBe(true);
    });
    it('should require at least one digit (0-9)', () => {
        expect(validate.password.hasNumber('PASS')).toBe('Must contain at least one digit (0-9)');
        expect(validate.password.hasNumber('Password1')).toBe(true);
    });
    it('should contain at least one special character', () => {
        expect(validate.password.hasSpecialCharacter('PASS')).toBe(
            'Must contain at least one special character (!@#$%^&*)',
        );
        expect(validate.password.hasSpecialCharacter('#$%')).toBe(true);
    });
});

describe('First name validation', () => {
    it('should not allow special characters and numbers', () => {
        expect(validate.firstName.noSpecialCharacterNumbers('John')).toBe(true);
        expect(validate.firstName.noSpecialCharacterNumbers('John123')).toBe(
            'Must contain not special characters and numbers',
        );
    });
});

describe('Last name validation', () => {
    it('should not allow special characters and numbers', () => {
        expect(validate.lastName.noSpecialCharacterNumbers('John')).toBe(true);
        expect(validate.lastName.noSpecialCharacterNumbers('John123')).toBe(
            'Must contain not special characters and numbers',
        );
    });
});

describe('Street validation', () => {
    it('should not allow special characters', () => {
        expect(validate.street.noSpecialCharacter('Main Street')).toBe(true);
        expect(validate.street.noSpecialCharacter('Main St.')).toBe('Street must contain not special characters');
    });
});

describe('City validation', () => {
    it('should not allow special characters', () => {
        expect(validate.city.noSpecialCharacterNumbers('Piter')).toBe(true);
        expect(validate.city.noSpecialCharacterNumbers('Piter123')).toBe(
            'Must contain not special characters and numbers',
        );
        expect(validate.city.noSpecialCharacterNumbers('123')).toBe('Must contain not special characters and numbers');
    });
});

describe('Postal code validation', () => {
    it('should allow only 6 numbers', () => {
        expect(validate.postalCode.onlySixNumbers('123456')).toBe(true);
        expect(validate.postalCode.onlySixNumbers('12345')).toBe('Postal code in KZ must contain only 6 numbers');
    });
});
