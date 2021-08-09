// youtube lazyload
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
  const youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/default.jpg';
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

