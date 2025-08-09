[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/iOOZsq6F)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=19483120)
# CS 362: Integration Tests

For this assignment, you will need to:

1. write UI-based integration tests for a user registration form
2. write UI-based integration tests for a roman numeral converter application

If you want to run the applications to test them out, first run:

```shell
npm install
```

This will install the `http-server` package.

Then run either of these:

```shell
npm run serve:registerUser
```

```shell
npm run serve:numerals
```

You can find demonstration videos of both apps in their respective directories: `/registerUser` and `/romanNumerals`.

Styling is done with [TailwindCSS](https://tailwindcss.com/) instead of vanilla CSS.

Vitest is already included in the dependencies, but you'll need additional tools and libraries:

- The [jsdom](https://github.com/jsdom/jsdom) library for creating a virtual DOM environment. You need to setup the [vitest jsdom environment](https://vitest.dev/guide/environment.html#jsdom).
- The [@testing-library/dom library](https://github.com/testing-library/dom-testing-library) for locating UI elements as a user would.
- The [@testing-library/jest-dom/vitest](https://github.com/testing-library/jest-dom) library for extending Vitest’s expect function with DOM-specific matchers.
- The [@testing-library/user-event](https://github.com/testing-library/user-event) library for simulating user interactions with the apps.
- The [Mock Service Worker API](https://mswjs.io/) for mocking responses from web API data requests.

Read the assignment details and rubrics on Canvas before you start. Don't forget to push your repository back to GitHub Classroom once you are done.

Submit your GitHub Classroom repository link to Canvas.
