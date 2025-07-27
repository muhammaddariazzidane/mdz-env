"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mdzEnv = void 0;
function getString(key, options) {
    const value = process.env[key];
    if (value === undefined || value === null || value === '') {
        if (options?.required) {
            throw new Error(`Environment variable "${key}" is required but not set.`);
        }
        return options?.defaultValue !== undefined ? options.defaultValue : ''; // Default empty string if not provided
    }
    return value;
}
function getNumber(key, options) {
    const value = process.env[key];
    if (value === undefined || value === null || value === '') {
        if (options?.required) {
            throw new Error(`Environment variable "${key}" is required but not set.`);
        }
        if (options?.defaultValue !== undefined) {
            return options.defaultValue;
        }
        throw new Error(`Environment variable "${key}" is not set and no default value provided.`); // More strict for numbers without default
    }
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
        throw new Error(`Environment variable "${key}" is "${value}" but expected a number.`);
    }
    return parsed;
}
function getBoolean(key, options) {
    const value = process.env[key];
    if (value === undefined || value === null || value === '') {
        if (options?.required) {
            throw new Error(`Environment variable "${key}" is required but not set.`);
        }
        return options?.defaultValue !== undefined ? options.defaultValue : false; // Default false if not provided
    }
    // Normalize value to lowercase for consistent checking
    const lowerCaseValue = value.toLowerCase();
    return lowerCaseValue === 'true' || lowerCaseValue === '1' || lowerCaseValue === 'on';
}
exports.mdzEnv = {
    string: getString,
    number: getNumber,
    boolean: getBoolean,
};
