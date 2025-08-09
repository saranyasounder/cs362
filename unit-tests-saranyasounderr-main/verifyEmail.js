/**
 * Verifies whether an email address is a valid email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} Returns true if the email address is valid, false otherwise.
 */
const verifyEmail = (email) => {
  if (typeof email !== "string") {
    return false;
  }

  const emailRegex =
    /^[\w!#$%&'*+\/=?`{|}~^-]+(?:\.[\w!#$%&'*+\/=?`{|}~^-]+)*@(?:[a-z0-9-]+\.)+[a-z]{2,6}$/i;

  return emailRegex.test(email);
};

export default verifyEmail;
