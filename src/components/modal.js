let activeDomElement = null;

export function openModal(domElement) {
  activeDomElement = domElement;
  domElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalOnEsc);
};

export function closeModal(domElement) {
  activeDomElement = null;
  domElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalOnEsc); 
  let form = domElement.querySelector('.popup__form');
  if (form !== null) {
    clearModal(form);
  }
};

function closeModalOnEsc(evt) { 
  if (evt.key === 'Escape' && activeDomElement !== null) {
    closeModal(activeDomElement);
  };
};

export function closeModalOnBg(evt) {
  if (evt.target === activeDomElement && activeDomElement !== null) {
    closeModal(activeDomElement);
  };
};

export function clearModal(form) {
  form.reset();
}