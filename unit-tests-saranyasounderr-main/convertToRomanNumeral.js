const convertToRomanNumeral = (numeral) => {
  // Check if the input is a valid number between 1 and 3999
  if (typeof numeral !== "number" || numeral < 1 || numeral > 3999) {
    throw new Error("Input must be a number between 1 and 3999");
  }

  // List of Roman numeral symbols and their corresponding values
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 100, numeral: 'C' },
    { value: 50, numeral: 'L' },
    { value: 10, numeral: 'X' },
    { value: 5, numeral: 'V' },
    { value: 1, numeral: 'I' }
  ];

  // We'll use this to build the final Roman numeral string
  let romanNum = '';

  // Go through each Roman numeral from largest to smallest
  for (const { value, numeral: symbol } of romanNumerals) {
    // Keep adding the Roman symbol while numeral is big enough
    while (numeral >= value) {
      romanNum += symbol;   // Add the Roman letter to the romanNum
      numeral -= value;   // Decrease the numeral by that value
    }
  }

  // Return the complete Roman numeral
  return romanNum;
};

// Export the function so it can be used elsewhere
export default convertToRomanNumeral;
