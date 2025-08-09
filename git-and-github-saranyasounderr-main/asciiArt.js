const figlet = require("figlet");

// Get the user input from the command line
const userInput = process.argv[2];

if (!userInput) {
    console.log("Please provide a string to convert to ASCII art.");
  } else {
    figlet(userInput, (err, string) => {
      if (err) {
        console.log("Error!");
        console.dir(err);
        return;
      }
      console.log(string);
    });
  }
