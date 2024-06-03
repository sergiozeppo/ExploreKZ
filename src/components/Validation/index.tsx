type ValidationFunction = (value: string) => true | string;

const noWhitespace: ValidationFunction = (value) =>
    value.trim() === value || 'Must not contain leading or trailing whitespace';
const hasAtSymbol: ValidationFunction = (value) =>
    value.includes('@') || 'Must contain an "@" symbol separating local part and domain name';
const hasDomainName: ValidationFunction = (value) =>
    /^.+@.+\..+$/.test(value) || 'Must contain a domain name (e.g., example.com)';
const isEmail: ValidationFunction = (value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) || 'Must be properly formatted (e.g., user@example.com)';
const hasUpperCase: ValidationFunction = (value) => /[A-Z]/.test(value) || 'Must contain at least one uppercase letter';
const hasLowerCase: ValidationFunction = (value) => /[a-z]/.test(value) || 'Must contain at least one lowercase letter';
const hasNumber: ValidationFunction = (value) => /\d/.test(value) || 'Must contain at least one digit (0-9)';
const hasSpecialCharacter: ValidationFunction = (value) =>
    /[!@#$%^&*]/.test(value) || 'Must contain at least one special character (!@#$%^&*)';
const noSpecialCharacterNumbers: ValidationFunction = (value) =>
    /^[^\W\d_]+$/.test(value) || 'Must contain not special characters and numbers';
const noSpecialCharacter: ValidationFunction = (value) =>
    /^[a-zA-Z\s]*$/.test(value) || 'Street must contain not special characters';

const onlySixNumbers: ValidationFunction = (value) =>
    /^\d{6}$/.test(value) || 'Postal code in KZ must contain only 6 numbers';

const calculateAge = (birthday: Date) => {
    const today = new Date();
    const diff = today.getTime() - birthday.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.35));
    return age;
};

const moreThirteenYears = (value: string) => {
    const selectedDate = new Date(value);
    const age = calculateAge(selectedDate);
    return age >= 13 ? true : 'You must be at least 13 years old to proceed';
};

const validateEmail = {
    noWhitespace,
    hasAtSymbol,
    hasDomainName,
    isEmail,
};

const validatePassword = {
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialCharacter,
};

const validateFirstName = {
    noSpecialCharacterNumbers,
};

const validateLastName = {
    noSpecialCharacterNumbers,
};

const validateStreet = {
    noSpecialCharacter,
};

const validateCity = {
    noSpecialCharacterNumbers,
};

const validatePostalCode = {
    onlySixNumbers,
};

export const validate = {
    email: validateEmail,
    password: validatePassword,
    firstName: validateFirstName,
    lastName: validateLastName,
    street: validateStreet,
    city: validateCity,
    postalCode: validatePostalCode,
    dateOfBirth: moreThirteenYears,
};
