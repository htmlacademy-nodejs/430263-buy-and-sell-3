'use strict';

const fs = require(`fs`);
const utils = require(`../../utils`);
const {FileGenerationFailedError, MockOffersMaxCountExceededError} = require(`../../errors`);

// region Constants
const FILE_NAME = `mocks.json`;

const OffersCount = {
  DEFAULT: 1,
  MAX: 1000,
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`
};

const TITLES = {
  [OfferType.OFFER]: [
    `Куплю антиквариат.`,
    `Куплю породистого кота.`,
    `Куплю детские санки.`
  ],
  [OfferType.SALE]: [
    `Продам книги Стивена Кинга.`,
    `Продам новую приставку Sony Playstation 5.`,
    `Продам отличную подборку фильмов на VHS.`,
    `Продам коллекцию журналов «Огонёк».`,
    `Отдам в хорошие руки подшивку «Мурзилка».`,
    `Продам советскую посуду. Почти не разбита.`
  ]
};

// region Sentences
const SENTENCES = {
  [OfferType.OFFER]: [
    `Куплю СРОЧНО!`,
    `Можем договориться об обмене на интересующую вас вещь.`,
    `Всю жизнь мечтал приобрести, и вот нашел.`
  ],
  [OfferType.SALE]: [
    `Товар в отличном состоянии.`,
    `Пользовались бережно и только по большим праздникам.`,
    `Продаю с болью в сердце...`,
    `Бонусом отдам все аксессуары.`,
    `Даю недельную гарантию.`,
    `Если товар не понравится — верну всё до последней копейки.`,
    `Это настоящая находка для коллекционера!`,
    `Если найдёте дешевле — сброшу цену.`,
    `Таких предложений больше нет!`,
    `Две страницы заляпаны свежим кофе.`,
    `При покупке с меня бесплатная доставка в черте города.`,
    `Кажется, что это хрупкая вещь.`,
    `Мой дед не мог её сломать.`,
    `Кому нужен этот новый телефон, если тут такое...`,
    `Не пытайтесь торговаться. Цену вещам я знаю.`
  ]
};
const SentencesCountRestriction = {
  MIN: 1,
  MAX: 5
};
// endregion Sentences

// region Categories
const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];
const CategoriesCountRestriction = {
  MIN: 1,
  MAX: CATEGORIES.length
};
// endregion Categories

const PriceRestriction = {
  MIN: 1000,
  MAX: 100000
};

const PictureNumberRestriction = {
  MIN: 1,
  MAX: 16
};
// endregion Constants

function generateOffers(count = OffersCount.DEFAULT) {
  if (count > OffersCount.MAX) {
    utils.ErrorHandler.handleError(new MockOffersMaxCountExceededError(OffersCount.MAX));

    return undefined;
  }

  return Array(count).fill(null).map(() => {
    const type = getRandomItemFromCollection(Object.values(OfferType));

    return {
      type,
      category: getRandomItemsFromCollection(CATEGORIES, CategoriesCountRestriction),
      title: getRandomItemFromCollection(TITLES[type]),
      picture: getPictureFileName(getRandomRestrictedNumber(PictureNumberRestriction)),
      description: getRandomItemsFromCollection(SENTENCES[type], SentencesCountRestriction).join(` `),
      price: getRandomRestrictedNumber(PriceRestriction),
    };
  });
}

// region Utility functions
function getRandomItemFromCollection(collection) {
  return collection[utils.getRandomInt(0, collection.length - 1)];
}

function getRandomItemsFromCollection(collection, restriction) {
  const count = getRandomRestrictedNumber(restriction);

  return utils.shuffle(collection).slice(0, count);
}

function getRandomRestrictedNumber(restriction) {
  const {MIN = 0, MAX = MIN} = restriction;

  return utils.getRandomInt(MIN, MAX);
}

function getPictureFileName(pictureNumber) {
  const maxNumberLength = String(PictureNumberRestriction.MAX).length;
  const formattedPictureNumber = String(pictureNumber).padStart(maxNumberLength, `0`);

  return `item${formattedPictureNumber}.jpg`;
}

// endregion Utility functions

module.exports = {
  name: `generate`,
  run(args = []) {
    const [count] = args;

    const normalizedCount = Number.parseInt(count, 10) || OffersCount.DEFAULT;

    const content = JSON.stringify(generateOffers(normalizedCount), null, `\t`);

    fs.writeFile(FILE_NAME, content, (error) => {
      if (error) {
        utils.ErrorHandler.handleError(new FileGenerationFailedError(error.message));

        return;
      }

      console.info(`Файл ${FILE_NAME} сформирован.`);
    });
  }
};
