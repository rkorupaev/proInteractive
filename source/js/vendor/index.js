import IMask from 'imask';

let phoneMask = IMask(
  document.getElementById('phone-mask'), {
    mask: '+{7}(000)000-00-00'
  });

