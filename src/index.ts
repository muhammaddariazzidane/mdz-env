interface EnvOptions<T> {
  defaultValue?: T;
  required?: boolean;
}

function getString(key: string, options?: EnvOptions<string>): string {
  const value = process.env[key];

  if (value === undefined || value === null || value === '') {
    if (options?.required) {
      throw new Error(`Environment variable "${key}" is required but not set.`);
    }
    return options?.defaultValue !== undefined ? options.defaultValue : ''; // Default empty string if not provided
  }
  return value;
}

function getNumber(key: string, options?: EnvOptions<number>): number {
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

function getBoolean(key: string, options?: EnvOptions<boolean>): boolean {
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

export const mdzEnv = {
  string: getString,
  number: getNumber,
  boolean: getBoolean,
};
