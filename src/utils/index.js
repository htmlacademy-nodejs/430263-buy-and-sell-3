'use strict';

const arrayUtils = require(`./array`);
const cliUtils = require(`./cli`);
const errorsUtils = require(`./errors`);
const numberUtils = require(`./number`);

module.exports = {
  ...arrayUtils,
  ...cliUtils,
  ...errorsUtils,
  ...numberUtils
};
