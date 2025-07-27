import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mdzEnv } from '../index';

const originalEnv = process.env;

beforeEach(() => {
  process.env = { ...originalEnv };
});


afterEach(() => {
  process.env = originalEnv;
});

describe('mdzEnv.string', () => {
  it('should return string value when environment variable is set', () => {
    process.env.TEST_STRING = 'hello';
    expect(mdzEnv.string('TEST_STRING')).toBe('hello');
  });

  it('should return an empty string when environment variable is not set and no default provided', () => {
    delete process.env.TEST_STRING;
    expect(mdzEnv.string('TEST_STRING')).toBe('');
  });

  it('should return defaultValue when environment variable is not set', () => {
    delete process.env.TEST_STRING;
    expect(mdzEnv.string('TEST_STRING', { defaultValue: 'default' })).toBe('default');
  });

  it('should return defaultValue when environment variable is an empty string', () => {
    process.env.TEST_STRING = '';
    expect(mdzEnv.string('TEST_STRING', { defaultValue: 'another default' })).toBe('another default');
  });

  it('should throw error when environment variable is required but not set', () => {
    delete process.env.TEST_STRING;
    expect(() => mdzEnv.string('TEST_STRING', { required: true }))
      .toThrow('Environment variable "TEST_STRING" is required but not set.');
  });

  it('should throw error when environment variable is required but empty string', () => {
    process.env.TEST_STRING = '';
    expect(() => mdzEnv.string('TEST_STRING', { required: true }))
      .toThrow('Environment variable "TEST_STRING" is required but not set.');
  });

  it('should return set value even if defaultValue is provided', () => {
    process.env.TEST_STRING = 'actual_value';
    expect(mdzEnv.string('TEST_STRING', { defaultValue: 'ignored_default' })).toBe('actual_value');
  });
});


describe('mdzEnv.number', () => {
  it('should return number value when environment variable is set and valid', () => {
    process.env.TEST_NUMBER = '123';
    expect(mdzEnv.number('TEST_NUMBER')).toBe(123);
  });

  it('should return number value with decimals', () => {
    process.env.TEST_NUMBER = '123.45';
    expect(mdzEnv.number('TEST_NUMBER')).toBe(123.45);
  });

  it('should return defaultValue when environment variable is not set', () => {
    delete process.env.TEST_NUMBER;
    expect(mdzEnv.number('TEST_NUMBER', { defaultValue: 999 })).toBe(999);
  });

  it('should throw error when environment variable is not set and no default provided', () => {
    delete process.env.TEST_NUMBER;
    expect(() => mdzEnv.number('TEST_NUMBER'))
      .toThrow('Environment variable "TEST_NUMBER" is not set and no default value provided.');
  });

  it('should throw error when environment variable is an empty string and no default provided', () => {
    process.env.TEST_NUMBER = '';
    expect(() => mdzEnv.number('TEST_NUMBER'))
      .toThrow('Environment variable "TEST_NUMBER" is not set and no default value provided.');
  });

  it('should throw error when environment variable is not a valid number', () => {
    process.env.TEST_NUMBER = 'abc';
    expect(() => mdzEnv.number('TEST_NUMBER'))
      .toThrow('Environment variable "TEST_NUMBER" is "abc" but expected a number.');
  });

  it('should throw error when environment variable is required but not set', () => {
    delete process.env.TEST_NUMBER;
    expect(() => mdzEnv.number('TEST_NUMBER', { required: true }))
      .toThrow('Environment variable "TEST_NUMBER" is required but not set.');
  });

  it('should return set value even if defaultValue is provided', () => {
    process.env.TEST_NUMBER = '789';
    expect(mdzEnv.number('TEST_NUMBER', { defaultValue: 100 })).toBe(789);
  });
});

describe('mdzEnv.boolean', () => {
  it('should return true for "true"', () => {
    process.env.TEST_BOOLEAN = 'true';
    expect(mdzEnv.boolean('TEST_BOOLEAN')).toBe(true);
  });

  it('should return true for "TRUE" (case-insensitive)', () => {
    process.env.TEST_BOOLEAN = 'TRUE';
    expect(mdzEnv.boolean('TEST_BOOLEAN')).toBe(true);
  });

  it('should return true for "1"', () => {
    process.env.TEST_BOOLEAN = '1';
    expect(mdzEnv.boolean('TEST_BOOLEAN')).toBe(true);
  });

  it('should return true for "on"', () => {
    process.env.TEST_BOOLEAN = 'on';
    expect(mdzEnv.boolean('TEST_BOOLEAN')).toBe(true);
  });

  it('should return false for "false"', () => {
    process.env.TEST_BOOLEAN = 'false';
    expect(mdzEnv.boolean('TEST_BOOLEAN')).toBe(false);
  });

  it('should return false for "0"', () => {
    process.env.TEST_BOOLEAN = '0';
    expect(mdzEnv.boolean('TEST_BOOLEAN')).toBe(false);
  });

  it('should return false for "off"', () => {
    process.env.TEST_BOOLEAN = 'off';
    expect(mdzEnv.boolean('TEST_BOOLEAN')).toBe(false);
  });

  it('should return false for any other string', () => {
    process.env.TEST_BOOLEAN = 'anything_else';
    expect(mdzEnv.boolean('TEST_BOOLEAN')).toBe(false);
  });

  it('should return defaultValue when environment variable is not set', () => {
    delete process.env.TEST_BOOLEAN;
    expect(mdzEnv.boolean('TEST_BOOLEAN', { defaultValue: true })).toBe(true);
  });

  it('should return defaultValue when environment variable is an empty string', () => {
    process.env.TEST_BOOLEAN = '';
    expect(mdzEnv.boolean('TEST_BOOLEAN', { defaultValue: true })).toBe(true);
  });

  it('should return false when environment variable is not set and no default provided', () => {
    delete process.env.TEST_BOOLEAN;
    expect(mdzEnv.boolean('TEST_BOOLEAN')).toBe(false);
  });

  it('should throw error when environment variable is required but not set', () => {
    delete process.env.TEST_BOOLEAN;
    expect(() => mdzEnv.boolean('TEST_BOOLEAN', { required: true }))
      .toThrow('Environment variable "TEST_BOOLEAN" is required but not set.');
  });
});
