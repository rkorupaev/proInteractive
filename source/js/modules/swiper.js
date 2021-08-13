// swiper initiation
import SwiperCore, {Navigation, Pagination} from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);

export const swiper = (element) => {
  return new SwiperCore(element, {
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
}
