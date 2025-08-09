// @vitest-environment jsdom
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Component from '../../src/lib/components/chartBuilder.svelte'

describe('ChartBuilder Integration Tests (Bar Plot)', () => {
	
	//Test 1: adding new input pair
	it('adds a new coordinate input pair by clicking the add button', async () => {
		const user = userEvent.setup();
		render(Component, {props:{type : 'bar'}});

		const getXInputs = () => screen.getAllByLabelText(/^X$/i);
		const getYInputs = () => screen.getAllByLabelText(/^Y$/i);
		const addButton = screen.getByRole('button', { name: '+' });

		// Get the current number of X and Y inputs
		const currXnum = getXInputs().length;
		const currYnum = getYInputs().length;

		// Simulate user clicking the add button to add inputs
		await user.click(addButton);

		// Make sure a new input was added
		const newXnum = getXInputs().length;
		const newYnum = getYInputs().length;

		expect(newXnum).toBe(currXnum + 1);
		expect(newYnum).toBe(currYnum + 1);
	});

	//Test 2: show alert when axis labels are missing
	it(' should display an alert message when trying to generate chart with missing axis labels', async () => {
		const user = userEvent.setup();
		render(Component, {props:{type : 'bar'}});
	  
		const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
	  
		// Fill in data points but leave axis labels blank
		await user.type(screen.getAllByLabelText(/^X$/i)[0], 'Jan');
		await user.type(screen.getAllByLabelText(/^Y$/i)[0], '100');
	  
		const generateButton = screen.getByRole('button', { name: /generate chart/i });
		await user.click(generateButton);
	  
		// Expect the alert to notify about missing labels
		expect(alertSpy).toHaveBeenCalledWith('Error: Must specify a label for both X and Y!');
	  });
	  
	  //Test 3:  Should show alert when there are no data points
	  it(' should display an alert message when trying to generate chart without data points', async () => {
		const user = userEvent.setup();
		render(Component, {props:{type : 'bar'}});
	  
		const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
	  
		// Fill in axis labels
		await user.type(screen.getByLabelText(/x label/i), 'Month');
		await user.type(screen.getByLabelText(/y label/i), 'Sales');
	  
		// Make sure the data fields are empty
		const xInput = screen.getAllByLabelText(/^X$/i)[0];
		const yInput = screen.getAllByLabelText(/^Y$/i)[0];
		await user.clear(xInput);
		await user.clear(yInput);
	  
		const generateButton = screen.getByRole('button', { name: /generate chart/i });
		await user.click(generateButton);
	  
		// Expect an alert because no data was entered
		expect(alertSpy).toHaveBeenCalledWith('Error: No data specified!');
	  });
	  
});
