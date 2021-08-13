//map news cards

export const mapNewsCards = () => {
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
}
