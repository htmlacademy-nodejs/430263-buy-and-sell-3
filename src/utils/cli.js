'use strict';

const {USER_ARGV_INDEX} = require(`../constants`);

module.exports.getUserArgs = () => {
  return process.argv.slice(USER_ARGV_INDEX);
};

module.exports.parseUserCommand = (command) => {
  return command && command.replace(/^--/, ``);
};
