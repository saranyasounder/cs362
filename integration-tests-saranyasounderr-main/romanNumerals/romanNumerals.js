/**
 * Roman Numeral Converter
 * This module converts Arabic numbers to both old and modern Roman numerals.
 */

// Conversion table for Roman numerals
const CONVERSION_TABLE = Object.freeze({
  M: 1000,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1,
});

/**
 * Converts an Arabic number into the corresponding "old" Roman numeral.
 * Old Roman numerals use only additive notation (e.g., 9 is "VIIII").
 *
 * @param {number} input - Arabic number to convert (1-3999)
 * @returns {string} Old Roman numeral representation
 * @throws {Error} If input is not a number
 * @throws {RangeError} If input is outside the range 1-3999
 */
function convertToOldRoman(input) {
  if (input === undefined || typeof input !== "number") {
    throw new Error("Expected a number parameter");
  }
  if (input < 1 || input > 3999) {
    throw new RangeError("Input must be in range 1-3999");
  }

  const romanDigits = Object.keys(CONVERSION_TABLE);
  let currRomanIdx = 0;
  let result = "";
  let remainingValue = Math.floor(input);

  while (remainingValue > 0 && currRomanIdx < romanDigits.length) {
    const currRomanDigit = romanDigits[currRomanIdx];
    const currArabicValue = CONVERSION_TABLE[currRomanDigit];

    while (remainingValue >= currArabicValue) {
      result += currRomanDigit;
      remainingValue -= currArabicValue;
    }
    currRomanIdx++;
  }

  return result;
}

/**
 * Simple delay function that returns a promise
 * @param {number} ms - Time to wait in milliseconds
 * @returns {Promise<void>} Promise that resolves after the specified time
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetches the modern Roman numeral conversion from an external API
 *
 * @param {number} arabicNumber - The number to convert
 * @returns {Promise<string>} The modern Roman numeral
 * @throws {Error} If the API request fails
 */
async function fetchModernRoman(arabicNumber) {
  await delay(800);

  const response = await fetch(
    `https://romans.justyy.workers.dev/api/romans/?n=${arabicNumber}`
  );

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data.result;
}

/**
 * Displays an error message with TailwindCSS styling
 *
 * @param {string} errorMsg - Error message to display
 */
function displayError(form, errorMsg) {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add(
    "error",
    "mt-4",
    "p-4",
    "bg-red-50",
    "border",
    "border-red-200",
    "rounded-md",
    "text-red-700"
  );
  errorDiv.setAttribute("role", "alert");

  errorDiv.innerHTML = `
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 mr-2">
          <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium">Error Converting Number</h3>
        <div class="mt-2 text-sm" id="error-message-text"></div>
      </div>
    </div>
  `;

  const errorMsgElement = errorDiv.querySelector("#error-message-text");
  errorMsgElement.textContent = errorMsg;

  form.appendChild(errorDiv);
}

/**
 * Clears any existing error messages
 */
function clearErrorMessages(form) {
  const errors = form.querySelectorAll(".error");
  errors.forEach(function (error) {
    error.remove();
  });
}

/**
 * Adds loading indicator to the modern Roman numeral result with TailwindCSS styling
 */
function showLoadingIndicator(modernRomanResult) {
  modernRomanResult.innerHTML = `
    <div class="flex items-center space-x-2">
      <svg class="animate-spin size-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  `;
}

/**
 * Initialize event listeners and setup
 */
export function initializeApp() {
  const arabicNumberInput = document.getElementById("arabic-number");
  const form = document.getElementById("arabic-number-form");
  const oldRomanResult = document.getElementById("old-roman-result");
  const modernRomanResult = document.getElementById("modern-roman-result");

  // Update the "old" Roman numeral result as the user types
  arabicNumberInput.addEventListener("input", function () {
    modernRomanResult.textContent = "";
    const arabicNumber = parseInt(arabicNumberInput.value);

    try {
      oldRomanResult.textContent = convertToOldRoman(arabicNumber);
    } catch (err) {
      oldRomanResult.textContent = "";
    }
  });

  // Handle form submission to convert to modern Roman numerals
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    clearErrorMessages(form);

    const arabicNumber = arabicNumberInput.value;

    if (!arabicNumber) {
      displayError(form, "Please enter a number");
      return;
    }

    showLoadingIndicator(modernRomanResult);

    try {
      const modernRoman = await fetchModernRoman(arabicNumber);
      modernRomanResult.textContent = modernRoman;
    } catch (err) {
      modernRomanResult.textContent = "";
      displayError(form, err.message);
    }
  });
}

// Initialize the application when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeApp);

// Export functions for potential testing or reuse - This is the single export point
export {
  clearErrorMessages,
  displayError,
  fetchModernRoman,
  convertToOldRoman,
};
