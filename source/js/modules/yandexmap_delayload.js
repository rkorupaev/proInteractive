// yandex map load delay
export const yandexMapDelayLoad = () => {
  const OFFSET_DELTA = 2000;
  let isMapLoaded = false;
  window.addEventListener(`scroll`, () => {
    let scrollY = window.scrollY;
    const mapOfset = document.querySelector(`.main-footer__map`).offsetTop;
    const yandexMapIframe = document.querySelector(`.main-footer__map iframe`);
    if ((scrollY >= mapOfset - OFFSET_DELTA) && !isMapLoaded) {
      yandexMapIframe.setAttribute(`src`, `https://yandex.ru/map-widget/v1/?um=constructor%3A1b97a04e7331790991a43985e7d598975ac27abd4a9bd941dcacab9270473858&amp;source=constructor`);
      isMapLoaded = true;
    }
  });
}
