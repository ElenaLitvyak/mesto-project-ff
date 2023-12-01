let activeDomElement = null;

export function openModal(domElement) {
    activeDomElement = domElement;
    domElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
    domElement.classList.add('popup_is-animated'); 
}

export function closeModal(domElement) {
    activeDomElement = null;
    domElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc); 
};

function closeModalEsc(evt) { 
    if (evt.key === 'Escape' && activeDomElement !== null) {
        closeModal(activeDomElement);
    };
};