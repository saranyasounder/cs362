import { describe, it, expect } from 'vitest';
import verifyEmail from './verifyEmail';
//test passed
describe('verifyEmail', () => {
  // Tests for valid email formats
  it('accepts standard email addresses', () => {
    const email = 'saranya@google.com';
    const isValid = verifyEmail(email);
    expect(isValid).toBe(true);
  });

  it('accepts email addresses with subdomains', () => {
    const email = 'saranya@osu.google.com';
    const isValid = verifyEmail(email);
    expect(isValid).toBe(true);
  });

  it('accepts special characters allowed in email usernames', () => {
    const email = 'saran.ya$17@osu.co.sg';
    const isValid = verifyEmail(email);
    expect(isValid).toBe(true);
  });

  // Tests for clearly invalid formats
  it('rejects email without "@"', () => {
    const email = 'saranya.com';
    const isValid = verifyEmail(email);
    expect(isValid).toBe(false);
  });

  it('rejects email without domain after "@"', () => {
    const email = 'saranya@';
    const isValid = verifyEmail(email);
    expect(isValid).toBe(false);
  });

  it('rejects domains shorter than 2 letters', () => {
    const email = 'saranya@google.c';
    const isValid = verifyEmail(email);
    expect(isValid).toBe(false);
  });

  it('rejects email addresses with spaces', () => {
    const email = 'saranya @google.com';
    const isValid = verifyEmail(email);
    expect(isValid).toBe(false);
  });

  it('rejects email with consecutive dots', () => {
    const email = 'saran..ya@google.com';
    const isValid = verifyEmail(email);
    expect(isValid).toBe(false);
  });

  it('rejects email starting with a dot', () => {
    const email = '.username@example.com';
    const isValid = verifyEmail(email);
    expect(isValid).toBe(false);
  });

  it('rejects email ending with a dot before the "@"', () => {
    const email = 'saranya.@google.com';
    const isValid = verifyEmail(email);
    expect(isValid).toBe(false);
  });

  it('rejects multiple "@" symbols', () => {
    const email = 'saranya@@google.com';
    const isValid = verifyEmail(email);
    expect(isValid).toBe(false);
  });

  it('rejects long domain endings(not within the range 2-6)', () => {
    const email = 'saranya@google.toolong';
    const isValid = verifyEmail(email);
    expect(isValid).toBe(false);
  });

  // Testing unusual or edge case inputs
  it('rejects empty strings', () => {
    const email = '';
    const isValid = verifyEmail(email);
    expect(isValid).toBe(false);
  });

  it('rejects numeric input', () => {
    const email = 12345;
    const isValid = verifyEmail(email);
    expect(isValid).toBe(false);
  });

});