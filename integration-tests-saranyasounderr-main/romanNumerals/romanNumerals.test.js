/**
 * @vitest-environment jsdom
 */

import fs from "fs";
import path from "path";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import {
  initializeApp
} from "./romanNumerals.js";


function getOldBox() {
  return document.getElementById("old-roman-result");
}

function getModernBox() {
  return document.getElementById("modern-roman-result");
}

describe("Roman Numeral Converter Integration Tests", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        const htmlPath = path.resolve(__dirname, "./romanNumerals.html");
        const htmlContent = fs.readFileSync(htmlPath, "utf-8");
        document.body.innerHTML = htmlContent;
        initializeApp();
      });


  //numerals live typing

  test("displays old Roman numeral live as user types", async () => {
    const input = screen.getByLabelText(/arabic number/i);
    const Old = getOldBox();

    await userEvent.type(input, "3567");
    expect(Old).toHaveTextContent("MMMCCCCCLXVII");
  });

  //numerals convert to modern

  test("converts to modern numeral when submit is clicked", async () => {
    const mockResult = { result: "CMXCIX" };
  
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResult),
      })
    );
  
    const input = screen.getByLabelText(/arabic number/i);
    const button = screen.getByRole("button", {
      name: /convert to "modern" roman numerals/i,
    });
    const Modern = getModernBox();
  
    await userEvent.type(input, "999");
    await userEvent.click(button);
  
    await waitFor(() => {
      expect(Modern).toHaveTextContent("CMXCIX");
    });
  
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
        "https://romans.justyy.workers.dev/api/romans/?n=999"
      );      
  });
  

  //numerals update after conversion
  test("updates old Roman numeral when input changes from 999 to 9", async () => {
    const input = screen.getByLabelText(/arabic number/i);
    const Old = getOldBox();

    await userEvent.type(input, "999");
    expect(Old).toHaveTextContent("CCCCCCCCCLXXXXVIIII");

    await userEvent.clear(input);
    await userEvent.type(input, "9");
    expect(Old).toHaveTextContent("VIIII");
  });

  //additional tests
  test("modern numeral clears after input is changed post-conversion", async () => {
    const mockResult = { result: "IX" };
  
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResult),
      })
    );
  
    const input = screen.getByLabelText(/arabic number/i);
    const button = screen.getByRole("button", {
      name: /convert to "modern" roman numerals/i,
    });
    const Modern = getModernBox();
  
    await userEvent.type(input, "9");
    await userEvent.click(button);
  
    await waitFor(() => {
      expect(Modern).toHaveTextContent("IX");
    });
  
    await userEvent.clear(input);
    await userEvent.type(input, "12");
  
    expect(Modern).toHaveTextContent("");
  });
  
  test("old Roman numeral clears when input is out of range", async () => {
    const input = screen.getByLabelText(/arabic number/i);
    const Old = getOldBox();
  
    await userEvent.type(input, "9999");
    expect(Old).toHaveTextContent(""); // Should clear because out-of-range
  });
  

  
  test("that the form does not submit modern conversion for empty input", async () => {
    const input = screen.getByLabelText(/arabic number/i);
    const button = screen.getByRole("button", {
      name: /convert to "modern" roman numerals/i,
    });
    const Modern = getModernBox();
  
    await userEvent.clear(input);
    await userEvent.click(button);
  
    expect(Modern).toHaveTextContent("");
    expect(fetch).not.toHaveBeenCalled();
  });
  

});
