'use strict';

const helpCliCommand = require(`./service/cli/help`);

const defaultCliCommand = helpCliCommand;

module.exports = {
  DEFAULT_COMMAND: defaultCliCommand.name,
  USER_ARGV_INDEX: 2,
};
