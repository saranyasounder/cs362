/**
 * Email validation function
 * @param {string} email - Email address to validate
 * @returns {boolean} - Whether the email is valid
 */
function verifyEmail(email) {
  if (!email || typeof email !== "string") {
    return false;
  }

  // Email regex from Regular Expressions Cookbook by Jan Goyvaerts and Steven Levithan
  const emailRegex =
    /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-z0-9-]+\.)+[a-z]{2,6}$/i;
  return emailRegex.test(email);
}

/**
 * Password validation helper functions
 */
const passwordValidators = {
  length: (password) => password && password.length >= 8,
  lowercase: (password) => /[a-z]/.test(password),
  uppercase: (password) => /[A-Z]/.test(password),
  digit: (password) => /[0-9]/.test(password),
  symbol: (password) => /[!@#$%^&*]/.test(password),
  noInvalid: (password) => !/[^a-zA-Z0-9!@#$%^&*]/.test(password),
};

/**
 * Comprehensive password validation
 * @param {string} password - Password to validate
 * @returns {object} - Validation results
 */
function verifyPassword(password) {
  if (!password || typeof password !== "string") {
    return { pass: false };
  }
  const checks = {
    length: passwordValidators.length(password),
    lowercase: passwordValidators.lowercase(password),
    uppercase: passwordValidators.uppercase(password),
    digit: passwordValidators.digit(password),
    symbol: passwordValidators.symbol(password),
    noInvalid: passwordValidators.noInvalid(password),
  };
  const pass = Object.values(checks).every((check) => check === true);
  return { ...checks, pass };
}

/**
 * Clear any existing status messages
 * @param {HTMLElement} form - The form element
 */
function clearStatusMessages(form) {
  const statuses = form.querySelectorAll(".status");
  statuses.forEach((status) => status.remove());
}

/**
 * Display success message with TailwindCSS styling
 * @param {HTMLElement} form - The form element
 */
function displaySuccess(form) {
  const successDiv = document.createElement("div");
  successDiv.classList.add(
    "status",
    "mt-4",
    "p-4",
    "rounded-md",
    "bg-green-50",
    "border",
    "border-green-200"
  );
  successDiv.setAttribute("role", "status");
  successDiv.innerHTML = `
      <h3 class="font-semibold text-green-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 mr-2">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
        </svg>
        Registration Successful
      </h3>
    `;
  form.appendChild(successDiv);
}

/**
 * Display error message with TailwindCSS styling
 * @param {HTMLElement} form - The form element
 * @param {boolean} emailValid - Email validation result
 * @param {object} passwordValid - Password validation results
 */
function displayError(form, emailValid, passwordValid) {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add(
    "status",
    "mt-4",
    "p-4",
    "rounded-md",
    "bg-red-50",
    "border",
    "border-red-200"
  );
  errorDiv.setAttribute("role", "alert");
  errorDiv.innerHTML = `
      <h3 class="font-semibold text-red-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 mr-2">
          <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
        </svg>
        Registration Error
      </h3>
    `;

  if (!emailValid) {
    errorDiv.innerHTML += `<p class="text-red-700 mt-2">The email address you entered is invalid.</p>`;
  }
  if (!passwordValid.pass) {
    errorDiv.innerHTML += `<p class="text-red-700 mt-2">The password you entered is invalid:</p>`;
    let listHtml = `<ul class="list-disc pl-5 mt-1 text-red-700 space-y-1">`;
    if (!passwordValid.length)
      listHtml += `<li>Password needs to be at least 8 characters</li>`;
    if (!passwordValid.lowercase)
      listHtml += `<li>Password needs a lower case letter</li>`;
    if (!passwordValid.uppercase)
      listHtml += `<li>Password needs an upper case letter</li>`;
    if (!passwordValid.digit)
      listHtml += `<li>Password needs a numeric digit (0-9)</li>`;
    if (!passwordValid.symbol)
      listHtml += `<li>Password needs a symbol (!@#$%^&*)</li>`;
    if (!passwordValid.noInvalid)
      listHtml += `<li>Password contains invalid characters (only letters, numbers, and !@#$%^&* are allowed)</li>`;
    listHtml += `</ul>`;
    errorDiv.innerHTML += listHtml;
  }
  form.appendChild(errorDiv);
}

/*
 * This function "registers" the user by storing their username and password
 * locally.  This is only a fake registration function.  It's not secure.
 */
function doRegistration(email, password) {
  const user = {
    email: email,
    password: password,
  };
  window.localStorage.setItem("user", JSON.stringify(user));
}

/**
 * Initialize form validation and feedback
 */
export function initializeFormValidation() {
  const form = document.getElementById("registration-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (!form || !emailInput || !passwordInput) {
    throw new Error("Form or input elements not found in the DOM");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearStatusMessages(form);

    emailInput.classList.remove("border-red-500", "border-green-500");
    passwordInput.classList.remove("border-red-500", "border-green-500");

    const email = emailInput.value;
    const password = passwordInput.value;

    const emailValid = verifyEmail(email);
    const passwordValid = verifyPassword(password);

    emailInput.classList.add(
      emailValid ? "border-green-500" : "border-red-500"
    );
    passwordInput.classList.add(
      passwordValid.pass ? "border-green-500" : "border-red-500"
    );

    if (emailValid && passwordValid.pass) {
      emailInput.value = "";
      passwordInput.value = "";
      doRegistration(email, password);
      displaySuccess(form);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      displayError(form, emailValid, passwordValid);
    }
  });
}

document.addEventListener("DOMContentLoaded", initializeFormValidation);

export {
  verifyEmail,
  verifyPassword,
  clearStatusMessages,
  displaySuccess,
  displayError,
};
