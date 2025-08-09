// tests/unit.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateChart } from '../../src/lib/generateChart';
import type { DataPoint } from '../../src/lib/types';


// Mock fetch and FileReader before each test
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      blob: () =>
        Promise.resolve(new Blob(['fakeImageData'], { type: 'image/png' })),
    })
  ) as unknown as typeof fetch;

  // Mock FileReader used inside blobToBase64
  vi.stubGlobal('FileReader', class {
    onloadend = null;
    result = 'data:image/png;base64,fakeBase64Image';
    readAsDataURL() {
      this.onloadend?.(); // trigger the event
    }
  });
});

describe('generateChart', () => {
  it('should return base64 image data for line chart', async () => {
    const mockData: DataPoint[] = [
      { x: 1, y: 2 },
      { x: 2, y: 4 }
    ];
    const result = await generateChart('line', mockData, 'X Axis', 'Y Axis', 'Line Title', '#FF0000');
    expect(result).toHaveProperty('imageData');
    expect(typeof result.imageData).toBe('string');
    expect(result.imageData).toMatch(/^data:image\/png;base64,/);
  });

  it('should return base64 image data for bar chart', async () => {
    const mockData: DataPoint[] = [
      { x: 'Jan', y: 10 },
      { x: 'Feb', y: 20 }
    ];
    const result = await generateChart('bar', mockData, 'Months', 'Revenue');
    expect(result).toHaveProperty('imageData');
    expect(typeof result.imageData).toBe('string');
  });

  it('should return base64 image data for scatter chart', async () => {
    const mockData: DataPoint[] = [
      { x: 0, y: 0 },
      { x: 1, y: 1 }
    ];
    const result = await generateChart('scatter', mockData, 'Time', 'Distance', 'Scatter Title', '#00FF00');
    expect(result).toHaveProperty('imageData');
    expect(typeof result.imageData).toBe('string');
  });
});
