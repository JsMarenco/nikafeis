// Third-party dependencies
import { v4 as uuid } from "uuid"
import jwt from "jsonwebtoken"

// Current project dependencies
import { IUserTokenPayload } from "@/ts/interfaces/user"

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

/**
 * Generates a JWT (JSON Web Token).
 *
 * @param {IUserTokenPayload} payload - The payload object to include in the JWT.
 * @param {string} expiresIn - The duration of the JWT (e.g., "1h", "2d", "30m").
 * @returns {Promise<string>} A promise that resolves to the generated JWT.
 */
export const generateJWT = async (
  payload: IUserTokenPayload,
  expiresIn: string
): Promise<string> => {
  try {
    const secret = process.env.JWT_SECRET || "secret"

    const options = { expiresIn }

    const token = jwt.sign(payload, secret, options)

    return token
  } catch (error) {
    console.log(error)
    throw error
  }
}

/**
 * Validates whether the given object has empty string values for any of its properties.
 *
 * @param {Record<string, string>} object - The object to validate.
 * @returns {{ success: boolean, emptyProperties: string[] }} - An object containing a boolean indicating whether any properties are empty, and an array of the names of empty properties.
 *
 * @example
 * const validation = validateEmptyProperties({
 *   firstname: "John",
 *   lastname: "",
 *   email: "john@example.com",
 *   password: "",
 *   confirmPassword: "password"
 * })
 *
 * console.log(validation)
 * // Output: { success: false, emptyProperties: ["lastname", "password"] }
 */
export const validateEmptyProperties = (
  object: Record<string, string>
): { success: boolean; emptyProperties: string[] } => {
  const emptyProperties: string[] = []

  for (const [propertyName, propertyValue] of Object.entries(object)) {
    if (typeof propertyValue === "string" && propertyValue.trim() === "") {
      emptyProperties.push(propertyName)
    }
  }

  return {
    success: emptyProperties.length === 0,
    emptyProperties: emptyProperties,
  }
}

/**
 * Decodes a JWT (JSON Web Token).
 *
 * @param {string} token - The JWT to decode.
 */
export const decodeJWT = (token: string) => {
  try {
    const secret = process.env.JWT_SECRET || "secret"

    const decoded = jwt.verify(token, secret)

    return decoded
  } catch (error) {
    console.log(error)
    throw error
  }
}
