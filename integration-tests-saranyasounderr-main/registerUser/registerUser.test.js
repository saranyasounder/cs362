/**
 * @vitest-environment jsdom
 */

import fs from "fs";
import path from "path";
import { describe, test, expect, beforeEach } from "vitest";
import {
  verifyEmail,
  verifyPassword,
  initializeFormValidation,
} from "./registerUser.js";
import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";


describe("Registration form end-to-end", () => {
  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, "./registerUser.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");
    document.body.innerHTML = htmlContent;
    initializeFormValidation();
  });

  const submit = async (email, password) => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);
    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);

    const form = document.getElementById("registration-form");
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  };

  //register success
  test("displays success message and clears inputs on valid submission", async () => {
    
    const email = "user@example.com";
    const password = "Saranya17!";
    
    await submit(email, password);
 
    const success = await screen.findByRole("status");
    const alert = await screen.queryByRole("alert");
    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    expect(success).toHaveTextContent(/registration successful/i);
    expect(alert).not.toBeInTheDocument();
    expect(emailField).toHaveDisplayValue("");
    expect(passwordField).toHaveDisplayValue("");
  });

//registerFail1 (email invlaid, password valid)
  test("adds red border to invalid email and green border to valid password", async () => {
    
    const email = "hello@example.c";
    const password = "Saranya17!";
    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);

    await submit(email, password);
    
    await waitFor(() => {
      expect(emailField.className).toMatch(/border-red-500/);
      expect(passwordField.className).toMatch(/border-green-500/);
    });
  });

  test("displays email error message on invalid email", async () => {
    
    const email = "hello@example.c";
    const password = "Saranya17!";

    await submit(email, password);
    
    await waitFor(() => {
      const alert = screen.queryByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(alert?.textContent).toMatch(/email address you entered is invalid/i);
    });
  });

  //resgisterFail2 (email valid but password lacks lowercase letters, uppercase letters, and symbols)
  test("shows only password errors when email is valid", async () => {
    
    const email = "hello@example.com";
    const password = "12345678";
    
    await submit(email, password);
    
    await waitFor(() => {
      const alert = screen.queryByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(alert?.textContent).not.toMatch(/email address you entered is invalid/i);
      expect(alert?.textContent).toMatch(/password you entered is invalid/i);
      expect(alert?.textContent).toMatch(/password needs a lower case letter/i);
      expect(alert?.textContent).toMatch(/password needs an upper case letter/i);
      expect(alert?.textContent).toMatch(/password needs a symbol/i);
    });
  });

  test("adds green border to valid email and red border to invalid password", async () => {
    
    const email = "hello@example.com";
    const password = "12345678";

    await submit(email, password);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i).className).toMatch(/border-green-500/);
      expect(screen.getByLabelText(/password/i).className).toMatch(/border-red-500/);
    });
  });

  //registerFail3 (email valid, but password lacks uppercase letters and symbol)
  test("shows password errors for missing uppercase and symbol, but no error for lowercase letters", async () => {
    
    const email = "hello@example.com";
    const password = "1234abcd";
    
    await submit(email, password);
    
    await waitFor(() => {
      const alert = screen.queryByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(alert?.textContent).not.toMatch(/email address you entered is invalid/i);
      expect(alert?.textContent).toMatch(/password you entered is invalid/i);
      expect(alert?.textContent).toMatch(/password needs an upper case letter/i);
      expect(alert?.textContent).toMatch(/password needs a symbol/i);
    });
  });

  //registerFail4 (invalid email and invalid password)
  test("shows errors for invalid email and password missing uppercase, digit, and symbol", async () => {
    
    const email = "hello@example.c";
    const password = "password";
    
    await submit(email, password);
    
    await waitFor(() => {
      const alert = screen.queryByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(alert?.textContent).toMatch(/email address you entered is invalid/i);
      expect(alert?.textContent).toMatch(/password you entered is invalid/i);
      expect(alert?.textContent).toMatch(/password needs an upper case letter/i);
      expect(alert?.textContent).toMatch(/password needs a numeric digit/i);
      expect(alert?.textContent).toMatch(/password needs a symbol/i);
      expect(alert?.textContent).not.toMatch(/password needs a lower case letter/i);
    });
  });

  test("adds red border to both invalid email and invalid password", async () => {

    const email = "hello@example.c";
    const password = "password";

    await submit(email, password);

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i).className).toMatch(/border-red-500/);
      expect(screen.getByLabelText(/password/i).className).toMatch(/border-red-500/);
    });
  });

  //additional test cases
  test("shows error for password with characters that are not allowed", async () => {
    const email = "user@example.com";
    const password = "abcd1234!A~";
  
    await submit(email, password);
  
    await waitFor(() => {
      const alert = screen.queryByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(alert?.textContent).toMatch(/invalid characters/i);
    });
  });
 
  
  test("clears previous error on valid resubmission", async () => {
    const invalidEmail = "invalid@";
    const invalidPassword = "123";
  
    await submit(invalidEmail, invalidPassword);
  
    const error = await screen.findByRole("alert");
    expect(error).toBeVisible();
  
    const validEmail = "hello@example.com";
    const validPassword = "Saranya17!";
  
    await submit(validEmail, validPassword);
  
    await waitFor(() => {
      const alert = screen.queryByRole("alert");
      const status = screen.getByRole("status");
      expect(alert).not.toBeInTheDocument();
      expect(status).toBeInTheDocument();
    });
  });
  

});
