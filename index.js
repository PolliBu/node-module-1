// process.env.TEST = "Hello!!!";
// console.log(process.env);

// console.log(global);

// console.log(__dirname);

// console.log(__filename);

import "colors";
import readline from "readline";
import { promises as fs } from "fs";
import { program } from "commander";
import { log } from "console";

program.option(
  "-f, --file <type>",
  "file for saving game results",
  "game_results.log"
);
program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// rl.on("line", (txt) => {
//   console.log(txt);
//   process.exit();
// });

let counter = 0;

const mind = Math.ceil(Math.random() * 10);

const logFile = program.opts().file;

/**
 * @category validator
 * @author Polina
 * @param {number}  -value to validate
 * @returns {boolean}
 */

const isValid = (num) => {
  if (!Number.isNaN(num) && num > 0 && num <= 10) return true;
  if (Number.isNaN(num)) console.log("Pleas, enter a number!".red);
  if (num < 1 || num > 10) console.log("between 1 and 10".red);
  return false;
};

/**
 * @category logger
 * @author Polina
 * @param {string} msg -massage to write
 * @param {string} logFile
 * @returns {Promise<void>}
 */

const logger = async (msg, logFile) => {
  try {
    console.log(msg.magenta);
    await fs.appendFile(
      logFile,
      `${new Date().toLocaleString("uk-UA")}-${msg}`
    );
    console.log(`Successfully ${logFile}`);
  } catch (err) {
    console.log(`Something went very wrong...${err.message}`.red);
  }
};

const game = () => {
  rl.question("Pleas, enter any number from 1 to 10!".green, (value) => {
    const number = +value;

    if (!isValid(number)) return game();

    counter += 1;

    if (number !== mind) {
      console.log("Oh no!".red);

      return game();
    }

    logger(
      `Congratulations! You guessed the number in ${counter} step(s) :] `,
      logFile
    );

    rl.close();
  });
};

game();
