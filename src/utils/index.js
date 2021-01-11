'use strict';

const arrayUtils = require(`./array`);
const cliUtils = require(`./cli`);
const numberUtils = require(`./number`);

module.exports = {
  ...arrayUtils,
  ...cliUtils,
  ...numberUtils
};
