// Third-party dependencies

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
