import { describe, it, expect } from 'vitest';
import verifyPassword from './verifyPassword';
//test passed
describe('verifyPassword', () => {
  // Checks for a fully valid password
  it('validates a correct password', () => {
    const password = "Saranya1!";
    const isValid = verifyPassword(password);
    expect(isValid).toEqual({
      length: true,
      lowercase: true,
      uppercase: true,
      digit: true,
      symbol: true,
      noInvalid: true,
      pass: true
    });
  });

  // Tests individual conditions for failure
  it('fails if password is shorter than 8 characters', () => {
    const password = "Sara17!";
    const isValid = verifyPassword(password);
    expect(isValid.length).toBe(false);
    expect(isValid.pass).toBe(false);
  });

  it('fails if password has no lowercase letters', () => {
    const password = "SARANYA1!";
    const isValid = verifyPassword(password);
    expect(isValid.lowercase).toBe(false);
    expect(isValid.pass).toBe(false);
  });

  it('fails if password has no uppercase letters', () => {
    const password = "saranya1!";
    const isValid = verifyPassword(password);
    expect(isValid.uppercase).toBe(false);
    expect(isValid.pass).toBe(false);
  });

  it('fails if password has no digits', () => {
    const password = "Saranya!";
    const isValid = verifyPassword(password);
    expect(isValid.digit).toBe(false);
    expect(isValid.pass).toBe(false);
  });

  it('fails if password has no symbols', () => {
    const password = "Saranya1";
    const isValid = verifyPassword(password);
    expect(isValid.symbol).toBe(false);
    expect(isValid.pass).toBe(false);
  });

  it('fails if password includes spaces', () => {
    const password = "Saranya1 !";
    const isValid = verifyPassword(password);
    expect(isValid.noInvalid).toBe(false);
    expect(isValid.pass).toBe(false);
  });

  it('fails if password contains invalid symbols', () => {
    const password = "Saranya1!_";
    const isValid = verifyPassword(password);
    expect(isValid.noInvalid).toBe(false);
    expect(isValid.pass).toBe(false);
  });

  // Test for completely invalid input
  it('fails all checks with a completely invalid password', () => {
    const password = "    ";
    const isValid = verifyPassword(password);
    expect(isValid.length).toBe(false);
    expect(isValid.lowercase).toBe(false);
    expect(isValid.uppercase).toBe(false);
    expect(isValid.digit).toBe(false);
    expect(isValid.symbol).toBe(false);
    expect(isValid.noInvalid).toBe(false);
    expect(isValid.pass).toBe(false);
  });

  // Test unusual input types
  it('fails when input is a numeric value', () => {
    const password = 12345678;
    const isValid = verifyPassword(password);
    expect(isValid.pass).toBe(false);
  });

  it('fails when input is an empty string', () => {
    const password = "";
    const isValid = verifyPassword(password);
    expect(isValid.pass).toBe(false);
  });
});