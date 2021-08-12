// youtube lazyload
import {getRandomInt} from "./utils";

const videos = document.querySelectorAll('.video-modal__video-placeholder');

const generateUrl = (id) => {
  const query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
};

const createIframe = (id) => {
  const iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay; encrypted-media');
  iframe.setAttribute('src', generateUrl(id));
  iframe.setAttribute(`width`, `315`);
  iframe.setAttribute(`height`, `188`);

  return iframe;
};

videos.forEach(el => {
  const videoHref = el.getAttribute('data-video');

  const deletedLength = 'https://youtu.be/'.length;

  const videoId = videoHref.substring(deletedLength, videoHref.length);

  const placeholderImg = el.querySelector('.video-placeholder__image');
  const youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg';
  placeholderImg.setAttribute('src', youtubeImgSrc);
  const mainBodyVideoBlockPlaceHolder = document.querySelector(`.video-block__inner-block`);
  mainBodyVideoBlockPlaceHolder.style.backgroundImage = `url(` + youtubeImgSrc + `)`;


  el.addEventListener('click', e => {
    e.preventDefault();

    const iframe = createIframe(videoId);
    el.querySelector('.video-placeholder__image').remove();
    el.appendChild(iframe);
    el.querySelector('.video-placeholder__button').remove();
  });
});

// custom select
const selectDefaultValue = document.querySelector(`.photo-booth__select-default-value`);
const selectList = document.querySelector(`.photo-booth__filter-select`);
const selectListItems = document.querySelectorAll(`.photo-booth__filter-select li`);
const selectArrow = document.querySelector(`.photo-booth__filter-arrow`);

const openSelectMenu = () => {
  selectDefaultValue.style.display = `none`;
  selectList.style.display = `block`;
  selectArrow.classList.add(`photo-booth__filter-arrow--active`);
}

const closeSelectMenu = (item) => {
  selectDefaultValue.textContent = item.textContent;
  selectDefaultValue.style.display = `block`;
  selectList.style.display = `none`;
  selectArrow.classList.remove(`photo-booth__filter-arrow--active`);
}

selectDefaultValue.addEventListener(`click`, evt => {
  openSelectMenu();
});

selectListItems.forEach(item => {
  item.addEventListener(`click`, evt => {
    closeSelectMenu(item);
  })
});

selectArrow.addEventListener(`click`, evt => {
  openSelectMenu();
});

// map photo-booth card
const photoBoothBlock = document.querySelector(`.photo-booth__list`);
for (let i = 0; i < 3; i++) {
  const card = document.createElement(`li`);

  card.classList.add(`photo-booth__item`);
  card.append(document.getElementById(`photo-booth-card`).content.cloneNode(true));

  for (let j = 0; j < 5; j++) {
    const cardPrice = 17500 + 100 * j;
    const extraOptionsBlock = card.querySelector(`.extra-options__list`);
    const extraOption = document.createElement(`li`);
    extraOption.classList.add(`extra-options__item`);
    extraOption.append(document.getElementById(`extra-option`).content.cloneNode(true));
    extraOption.querySelector(`.extra-options__item-title`).textContent = `Разработка макета рамки #` + (j + 1);
    extraOption.querySelector(`.extra-options__item-price`).textContent = `от ` + cardPrice + `₽`;
    extraOption.querySelector(`.extra-option__item-checkbox`).value = cardPrice;

    extraOptionsBlock.append(extraOption);
  }

  photoBoothBlock.append(card);
}

//mock price generator
let cardTotalPrice = document.querySelectorAll(`.price-block__price span`);
cardTotalPrice.forEach(item => {
  item.textContent = getRandomInt(15000, 20000);
});

let defaultBoothPrice = [];
cardTotalPrice.forEach(item => {
  defaultBoothPrice.push(item.textContent);
});

//get card price
const extraOptionsList = document.querySelectorAll(`.extra-options__list`);

extraOptionsList.forEach((list, index) => {
  const DEFAULT_PRICE = parseInt(cardTotalPrice[index].textContent);
  list.addEventListener('click', (evt) => {
    if (evt.target.className === `extra-option__item-checkbox`) {
      let totalExtraOptionsPrice = 0;
      const checkedOptions = list.querySelectorAll(`input[type="checkbox"]:checked`);
      checkedOptions.forEach(item => {
        totalExtraOptionsPrice += parseInt(item.value, 10);
      });
      cardTotalPrice[index].textContent = DEFAULT_PRICE + totalExtraOptionsPrice;
    }
  });
});


//map mobile order
const referenceElement = document.querySelector(`.order-modal__title`);
const orderBody = document.createElement(`div`);
orderBody.classList.add(`order-modal__dynamic-data`);
orderBody.append(document.getElementById(`mobile-order-card`).content.cloneNode(true));

const nodes = Array.prototype.slice.call(document.querySelector(`.photo-booth__list`).children);

const orderButton = document.querySelectorAll(`.price-block__button`);
orderButton.forEach(button => {
  button.addEventListener('click', (evt) => {
    const target = evt.target.parentElement.parentElement;
    const index = nodes.indexOf(target);
    const boothDefaultPrice = orderBody.querySelector(`.order-modal__booth-price`);
    boothDefaultPrice.textContent = defaultBoothPrice[0] + ` ₽`;


    const totalPrice = target.querySelector(`.price-block__price span`).textContent;
    orderBody.querySelector(`.order-modal__total-price`).textContent = totalPrice + ` ₽`;
    const extraOptionsList = target.querySelector(`.extra-options__list`);
    const checkedOptions = extraOptionsList.querySelectorAll(`input[type="checkbox"]:checked`);
    const checkedOptionsList = document.querySelector(`.order-modal__options-list`);
    checkedOptionsList.innerHTML = ``;


    //map extra options list in mobile order
    if (checkedOptions.length > 0) {
      checkedOptions.forEach(item => {
        const checkedOption = document.createElement(`li`);
        checkedOption.classList.add(`order-modal__options-item`);
        checkedOption.append(document.getElementById(`order-modal-checked-option`).content.cloneNode(true));
        checkedOption.querySelector(`.order-modal__options-item span`).textContent = item.value + ` ₽`;
        checkedOption.querySelector(`.order-modal__options-item p`).textContent = item.parentElement.querySelector(`.extra-options__item-title`).textContent;
        ;

        checkedOptionsList.append(checkedOption);
      });
    }

    getTotalPriceDurationDep();
  });
});

referenceElement.after(orderBody);

//multiply total price by day chosen
const getTotalPriceDurationDep = () => {
  const daysDurationSelect = document.querySelector(`.order-modal__duration-select`);
  let orderTotalPrice = orderBody.querySelector(`.order-modal__total-price`);
  const orderDefaultPrice = parseInt(orderTotalPrice.textContent)

  daysDurationSelect.addEventListener('change', (evt) => {
    orderTotalPrice.textContent = orderDefaultPrice * evt.target.value;
  });
}


// rent time activation
const rentTimeButtonBlock = document.querySelectorAll(`.rent-time__list`);
rentTimeButtonBlock.forEach(item => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(`rent-time__item`)) {
      const activeButton = item.querySelector(`.rent-time__item--active`);
      if (activeButton) {
        activeButton.classList.remove('rent-time__item--active');
      }
      evt.target.classList.toggle(`rent-time__item--active`);
    }
  });
});

// filter setup
selectList.addEventListener(`click`, (evt) => {
  filterPhotoBooths(evt.target.attributes.value.value);
});

const photoBoothItems = document.querySelectorAll(`.photo-booth__item`);
const filterPhotoBooths = (value) => {
  let mappedArray = [];
  let filteredArray = [];
  photoBoothItems.forEach((item, index) => {
    const itemPrice = item.querySelector(`.price-block__price span`);
    let obj = {price: itemPrice.textContent, item: item}
    mappedArray.push(obj);
  });
  switch (value) {
    case `priceup`:
      mappedArray.sort((a, b) => parseInt(a.price) - parseInt(b.price));
      break;
    case `pricedown`:
      mappedArray.sort((a, b) => parseInt(b.price) - parseInt(a.price));
      break;
  }

  mappedArray.map(item => filteredArray.push(item.item));
  photoBoothBlock.innerHTML = '';
  for (let i = 0; i < filteredArray.length; i++) {
    photoBoothBlock.append(filteredArray[i]);
  }
}

// swiper initiation
import SwiperCore, {Navigation, Pagination} from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);

const swiper = new SwiperCore('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

//faq setup
const faqItemsList = document.querySelectorAll(`.faq__item`);

faqItemsList.forEach((item, index) => {
  item.addEventListener(`click`, evt => {
    const hidedText = item.querySelector(`.faq__hiding-text`);
    const faqArrow = item.querySelector(`.faq__item-arrow`);
    const faqTitleWrapper = item.querySelector(`.faq__title-wrapper`);
    hidedText.classList.toggle(`faq__hiding-text--active`);
    item.classList.toggle(`faq__item--active`);
    faqArrow.classList.toggle(`faq__item-arrow--active`);
    faqTitleWrapper.classList.toggle(`faq__title-wrapper--active`);
  });
});

//map news cards
const MAX_NEWS_LENGTH = 20;
const NEWS_PER_CLICK = 3;

const mapNews = (cardCount) => {
  for (let i = 0; i < cardCount; i++) {
    const newsCard = document.createElement(`li`);
    const newsBlock = document.querySelector(`.news__list`);
    newsCard.classList.add(`news__item`);
    newsCard.append(document.getElementById(`news-card`).content.cloneNode(true));

    newsBlock.append(newsCard);
  }
}

window.addEventListener(`load`, (evt) => {
  mapNews(NEWS_PER_CLICK);
});

const showMoreNewsButton = document.querySelector(`.news__button`);
showMoreNewsButton.addEventListener('click', (evt) => {
  const newsLength = document.querySelectorAll(`.news__item`).length;
  const lengthDelta = MAX_NEWS_LENGTH - newsLength;
  if (newsLength < MAX_NEWS_LENGTH && lengthDelta >= 3) {
    mapNews(NEWS_PER_CLICK);
  } else {
    mapNews(lengthDelta);
  }

  if (MAX_NEWS_LENGTH <= newsLength + NEWS_PER_CLICK) {
    showMoreNewsButton.style.display = `none`;
  }
});
