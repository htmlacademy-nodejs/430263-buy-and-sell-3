'use strict';

const {ExitCode} = require(`../enums`);

class ErrorHandler {
  static handleError(error) {
    console.error(error.message);

    process.exit(ExitCode.Error);
  }
}

module.exports = {
  ErrorHandler
};
