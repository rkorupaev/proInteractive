import {swiper} from "./swiper";
import {mapPhotoBooth} from "./map_photobooth";
import {yandexMapDelayLoad} from "./yandexmap_delayload";
import {mapNewsCards} from "./map_newscards";
import {youtubeLazyLoad} from "./youtube_lazyload";

youtubeLazyLoad();
mapPhotoBooth();
mapNewsCards();
swiper('.swiper-container');
yandexMapDelayLoad();

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
