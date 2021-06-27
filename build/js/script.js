'use strict';

(function() {
  let monthToggler = document.querySelectorAll(".months-list__item");
  monthToggler = Array.prototype.slice.call(monthToggler, 0);

  monthToggler.forEach((toggler) => {
    toggler.addEventListener("click", (evt) => {
      evt.preventDefault();
      let tabIndex = document.querySelector(toggler.getAttribute("href"));
      document.querySelector(".months-list .months-list__item--active").classList.remove("months-list__item--active");
      document.querySelector(".passtype-list--active").classList.remove("passtype-list--active");
      toggler.classList.add('months-list__item--active');
      tabIndex.classList.add('passtype-list--active');
    })
  })
})();
