import { updateNavbar, runCalculator } from "./calculator.js";

document.addEventListener("DOMContentLoaded", () => {
  updateNavbar();
  runCalculator();
});

function logout() {
  window.localStorage.removeItem("token");
  window.location.href = "/";
}

function unregister() {
  window.localStorage.clear();
  window.location.href = "/";
}

window.logout = logout;
window.unregister = unregister;
