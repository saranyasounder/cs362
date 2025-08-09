/**
 * Verifies whether a password satisfies the following criteria:
 *   * Contains at least 8 characters
 *   * Contains at least one lowercase letter
 *   * Contains at least one uppercase letter
 *   * Contains at least one numerical digit
 *   * Contains at least one of the following symbols: !@#$%^&*
 *   * Does not contain invalid characters (spaces and other symbols not listed above)
 *
 * @param {string} password - The password to be validated
 * @returns {Object} Returns an object with the following fields, all boolean valued:
 *     pass - true if the password passes overall verification
 *     length - true if the password contains at least 8 characters
 *     lowercase - true if the password contains at least one lowercase letter
 *     uppercase - true if the password contains at least one uppercase letter
 *     digit - true if the password contains at least one digit
 *     symbol - true if the password contains at least one valid symbol
 *     noInvalid - true if the password doesn't contain invalid symbols/spaces
 */
const verifyPassword = (password) => {
  if (!password || typeof password !== "string") {
    return { pass: false };
  }

  const checks = {
    length: containsAtLeast8Chars(password),
    lowercase: containsOneLowercase(password),
    uppercase: containsOneUppercase(password),
    digit: containsOneDigit(password),
    symbol: containsOneSymbol(password),
    noInvalid: containsNoInvalidChars(password),
  };

  const pass = Object.values(checks).every((check) => check);

  return { ...checks, pass };
};

const containsAtLeast8Chars = (password) => password.length >= 8;

const containsOneLowercase = (password) => /[a-z]/.test(password);

const containsOneUppercase = (password) => /[A-Z]/.test(password);

const containsOneDigit = (password) => /[0-9]/.test(password);

const containsOneSymbol = (password) => /[!@#$%^&*]/.test(password);

const containsNoInvalidChars = (password) =>
  !/[^a-zA-Z0-9!@#$%^&*]/.test(password);

export default verifyPassword;
