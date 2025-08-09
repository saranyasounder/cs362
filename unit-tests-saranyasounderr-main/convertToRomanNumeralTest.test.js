import { describe, it, expect } from 'vitest';
import convertToRomanNumeral from './convertToRomanNumeral.js';

describe('convertToRomanNumeral', () => {
  it('should convert 1 to I', () => {
    expect(convertToRomanNumeral(1)).toBe('I');
  });

  it('should convert 2 to II', () => {
    expect(convertToRomanNumeral(2)).toBe('II');
  });

  it('should convert 3 to III', () => {
    expect(convertToRomanNumeral(3)).toBe('III');
  });

  it('should convert 4 to IIII', () => {
    expect(convertToRomanNumeral(4)).toBe('IIII'); 
  });

  it('should convert 5 to V', () => {
    expect(convertToRomanNumeral(5)).toBe('V');
  });

  it('should convert 8 to VIII', () => {
    expect(convertToRomanNumeral(8)).toBe('VIII');
  });

  it('should convert 9 to VIIII', () => {
    expect(convertToRomanNumeral(9)).toBe('VIIII'); 
  });

  it('should convert 10 to X', () => {
    expect(convertToRomanNumeral(10)).toBe('X');
  });

  it('should convert 30 to XXX', () => {
    expect(convertToRomanNumeral(30)).toBe('XXX');
  });

  it('should convert 50 to L', () => {
    expect(convertToRomanNumeral(50)).toBe('L');
  });

  it('should convert 73 to LXXIII', () => {
    expect(convertToRomanNumeral(73)).toBe('LXXIII'); // 50 + 10 + 4 (IIII)
  });

  it('should convert 100 to C', () => {
    expect(convertToRomanNumeral(100)).toBe('C');
  });

  it('should convert 232 to CCXXXII', () => {
    expect(convertToRomanNumeral(232)).toBe('CCXXXII'); // C + C + V + II
  });

  it('should convert 1000 to M', () => {
    expect(convertToRomanNumeral(1000)).toBe('M');
  });

  it('should convert 2025 to MMXXV', () => {
    expect(convertToRomanNumeral(2025)).toBe('MMXXV'); // M + M + X + X + III
  });

  // Error cases
  it('should throw error if number is less than 1', () => {
    expect(() => convertToRomanNumeral(0)).toThrow();
  });

  it('should throw error if number is greater than 3999', () => {
    expect(() => convertToRomanNumeral(5000)).toThrow();
  });

  it('should throw error if input is not a number', () => {
    expect(() => convertToRomanNumeral('saranya')).toThrow();
  });

});
