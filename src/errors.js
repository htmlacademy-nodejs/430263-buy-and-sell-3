'use strict';

class MockOffersMaxCountExceededError extends Error {
  constructor(maxCount) {
    super(`Не больше ${maxCount} объявлений.`);

    this.maxCount = maxCount;
  }
}

class FileGenerationFailedError extends Error {
  constructor(message) {
    super(`Ошибка при записи в файл: ${message}.`);
  }
}

module.exports = {
  FileGenerationFailedError,
  MockOffersMaxCountExceededError
};
