let activeDomElement = null;

export function openModal(domElement) {
  activeDomElement = domElement;
  domElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalOnEsc);
  domElement.classList.add('popup_is-animated'); 
  domElement.addEventListener('click', closeModalOnBg);
};

export function closeModal(domElement) {
  activeDomElement = null;
  domElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalOnEsc); 
  domElement.removeEventListener('click', closeModalOnBg);
};

function closeModalOnEsc(evt) { 
  if (evt.key === 'Escape' && activeDomElement !== null) {
    closeModal(activeDomElement);
  };
};

function closeModalOnBg(evt) {
  if (evt.target === activeDomElement && activeDomElement !== null) {
    closeModal(activeDomElement);
  };
};