'use strict';

const {DEFAULT_COMMAND} = require(`../constants`);
const utils = require(`../utils`);
const cli = require(`./cli`);

const userArgs = utils.getUserArgs();

const [command] = userArgs;
const parsedCommand = utils.parseUserCommand(command);

const commandArgs = userArgs.slice(1);

if (!command || !cli[parsedCommand]) {
  cli[DEFAULT_COMMAND].run(commandArgs);
} else {
  cli[parsedCommand].run(commandArgs);
}


