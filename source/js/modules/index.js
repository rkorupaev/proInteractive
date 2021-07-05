const photoBoothSwiper = (el) => {
  return new Swiper(el, {
    // Optional parameters
    direction: `horizontal`,
    loop: true,
    grabCursor: true,
    speed: 1500,
    // Navigation arrows
    navigation: {
      nextEl: `.swiper-button-next`,
      prevEl: `.swiper-button-prev`,
    }
  });
};

const photoBoothItem = document.querySelector('.photo-booth__slider');

if (photoBoothItem) {
  photoBoothSwiper(photoBoothItem);
}
