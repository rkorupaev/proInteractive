import {mapCards} from "./map_cards";
import {debounce} from "./utils";

const DOWNLOAD_URL = "https://603e38c548171b0017b2ecf7.mockapi.io/homes";
const STATUS_CODE_OK = "200";
const FILTER_INPUT_CLASS = ".filter-block__input";
const ERROR_MESSAGE = ".filter-block__error-message";
const APART_LIST = ".main-body__aparts-list";
const MIN_INPUT_VALUE_LENGTH = 3;
const DELAY = 250;

const fetchData = (onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', () => {
    if (xhr.readyState === 4 && xhr.status == STATUS_CODE_OK) {
      onLoad(xhr.response);
    } else {
      onError(xhr.status);
    }
  });

  xhr.addEventListener('error', () => {
    onError('Произошла ошибка. Обратитесь к администратору.');
  });

  xhr.addEventListener('timeout', () => {
    onError('Превышено время ожидания ответа от сервера.');
  });

  xhr.timeout = 10000;

  xhr.open('GET', DOWNLOAD_URL, true);
  xhr.send();
}


fetchData((data) => {
    if (data) {
      let filteredData = data;
      const cardBlock = document.querySelector(APART_LIST);
      mapCards(filteredData, cardBlock);
      const filterInput = document.querySelector(FILTER_INPUT_CLASS);
      const errorMessage = document.querySelector(ERROR_MESSAGE);
      console.log(errorMessage);
      let onChange = (evt) => {
        if (evt.target.value.length > MIN_INPUT_VALUE_LENGTH) {
          errorMessage.style.display = "none";
          filteredData = filterData(data, evt);
          mapCards(filteredData, cardBlock);
        } else if (evt.target.value.length === 0) {
          errorMessage.style.display = "none";
          mapCards(data, cardBlock);
        } else {
          errorMessage.style.display = "block";
        }
      }
      onChange = debounce(onChange, DELAY);
      filterInput.addEventListener("input", onChange);
    }
  },
  (status) => {
    console.log(status);
  }
);

const filterData = (data, evt) => {
  let filteredData = data.filter(appart => appart.title.toLowerCase().includes(evt.target.value.toLowerCase()));
  return filteredData;
};
