// map photo-booth card
import {getRandomInt} from "./utils";

export const mapPhotoBooth = () => {
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
      orderTotalPrice.textContent = orderDefaultPrice * evt.target.value + ` ₽`;
    });
  }


  // filter setup
  const selectList = document.querySelector(`.photo-booth__filter-select`);

  selectList.addEventListener(`click`, (evt) => {
    filterPhotoBooths(evt.target.attributes.value.value);
  });

  const photoBoothItems = document.querySelectorAll(`.photo-booth__item`);
  const filterPhotoBooths = (value) => {
    let mappedArray = [];
    let filteredArray = [];
    photoBoothItems.forEach((item, index) => {
      let obj = {price: defaultBoothPrice[index], item: item}
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
}
