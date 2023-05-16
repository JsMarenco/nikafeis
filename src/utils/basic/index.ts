// Third-party dependencies
import { v4 as uuid } from "uuid"

// Current project dependencies

/**
 * Validates a simple email format.
 * @param {string} email - The email to be validated.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 *
 * @example
 * // Example usage with correct email format
 * const validEmail = 'john.doe@example.com';
 * console.log(validateSimpleEmail(validEmail)); // Output: true
 *
 * // Example usage with incorrect email format
 * const invalidEmail = 'invalid.email.com';
 * console.log(validateSimpleEmail(invalidEmail)); // Output: false
 */
export const validateSimpleEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return re.test(email)
}

/**
 * Generates a username by combining a prefix with a unique identifier.
 * @returns {string} - The generated username.
 *
 * @example
 * const generatedUsername = generateUsername();
 * console.log(generatedUsername); // Output: "user-123e4567-e89b"
 */
export const generateUsername = (): string => {
  const username = `user-${uuid()}`

  return username.substring(0, 15)
}
