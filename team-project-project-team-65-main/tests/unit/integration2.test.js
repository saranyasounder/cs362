/**
 * @vitest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/svelte';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Component from '../../src/lib/components/chartBuilder.svelte';
import * as chartUtils from '../../src/lib/generateChart';

// Mock $app/paths to prevent router issues
vi.mock('$app/paths', () => ({ base: '/mock-base' }));

// Mock generateChart to avoid real API calls
vi.mock('../../src/lib/generateChart', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    generateChart: vi.fn().mockResolvedValue({
      imageData: 'data:image/png;base64,fakeImageData'
    })
  };
});

// Mock chartStorage to control initial data
vi.mock('../../src/lib/chartStorage', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    loadSavedChart: vi.fn().mockReturnValue(actual.createEmptyChart('bar')),
    loadCurrentChartData: vi.fn().mockReturnValue(actual.createEmptyChart('bar')),
    updateCurrentChartData: vi.fn(),
    saveChart: vi.fn(),
  };
});

describe('ChartBuilder Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('clears all chart data when "Clear Chart Data" is clicked', async () => {
    render(Component, { props: { type: 'bar' } });

    const titleInput = screen.getByLabelText(/chart title/i);
    const xLabelInput = screen.getByLabelText(/x label/i);
    const yLabelInput = screen.getByLabelText(/y label/i);

    await fireEvent.input(titleInput, { target: { value: 'Test Title' } });
    await fireEvent.input(xLabelInput, { target: { value: 'Students' } });
    await fireEvent.input(yLabelInput, { target: { value: 'Scores' } });

    const xInput = screen.getAllByLabelText(/^x$/i)[0];
    const yInput = screen.getAllByLabelText(/^y$/i)[0];
    await fireEvent.input(xInput, { target: { value: 'Alice' } });
    await fireEvent.input(yInput, { target: { value: '90' } });

    const clearButton = screen.getByRole('button', { name: /clear chart data/i });
    await fireEvent.click(clearButton);

    expect(titleInput.value).toBe('');
    expect(xLabelInput.value).toBe('');
    expect(yLabelInput.value).toBe('');
    expect(screen.getAllByLabelText(/^x$/i)[0].value).toBe('');
    expect(screen.getAllByLabelText(/^y$/i)[0].value).toBe('');
  });

  it('sends correct data to generateChart when "Generate Chart" is clicked', async () => {
    const spy = vi.spyOn(chartUtils, 'generateChart');
    render(Component, { props: { type: 'bar' } });

    await fireEvent.input(screen.getByLabelText(/chart title/i), { target: { value: 'My Chart' } });
    await fireEvent.input(screen.getByLabelText(/x label/i), { target: { value: 'Month' } });
    await fireEvent.input(screen.getByLabelText(/y label/i), { target: { value: 'Sales' } });

    const xInput = screen.getAllByLabelText(/^x$/i)[0];
    const yInput = screen.getAllByLabelText(/^y$/i)[0];
    await fireEvent.input(xInput, { target: { value: 'Jan' } });
    await fireEvent.input(yInput, { target: { value: '1000' } });

    const generateButton = screen.getByRole('button', { name: /generate chart/i });
    await fireEvent.click(generateButton);

    expect(spy).toHaveBeenCalledWith(
      'bar',
      [{ x: 'Jan', y: 1000 }],
      'Month',
      'Sales',
      'My Chart',
      '#F97316'
    );
  });
});
