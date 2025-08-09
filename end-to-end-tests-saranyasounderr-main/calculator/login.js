/*
 * This function "authenticated" the user by comparing their provided email
 * address and password against the locally stored credentials.  This is only
 * a fake registration function.  It's not secure.
 */
function authenticateUser(email, password) {
  const userJson = window.localStorage.getItem("user");
  if (userJson) {
    const user = JSON.parse(userJson);
    return user && user.email === email && user.password === password;
  } else {
    return false;
  }
}

/*
 * This function stores an authentication "token" locally to indicate that
 * the user is successfully logged in.
 */
function storeAuthToken() {
  window.localStorage.setItem("token", "1234567890abcdef");
}

/*
 * This function displays an error message to let the user know the credentials
 * they entered were not valid.
 */
function displayError(form) {
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
    </h3>`;
  errorDiv.innerHTML += "<p>The credentials you entered are invalid.</p>";

  form.appendChild(errorDiv);
}

/*
 * This function removes any error message or success message currently being
 * displayed to the user.
 */
function clearStatusMessages(form) {
  const statuses = form.querySelectorAll(".status");
  statuses.forEach(function (status) {
    status.remove();
  });
}

/**
 * Initialize form validation and feedback
 */
export function initializeFormValidation() {
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (!form || !emailInput || !passwordInput) {
    throw new Error("Form or input elements not found in the DOM");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearStatusMessages(form);

    const email = emailInput.value;
    const password = passwordInput.value;

    if (authenticateUser(email, password)) {
      storeAuthToken();
      window.location.href = "/";
    } else {
      displayError(form);
    }
  });
}

document.addEventListener("DOMContentLoaded", initializeFormValidation);
