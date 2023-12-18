import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, handleDeleteCard, handleLikeCard} from './card';
import { openModal, closeModal, closeModalOnBg } from './modal';
import { enableValidation, clearValidation } from './validation';

const content = document.querySelector('.content');
export const cardContainer = content.querySelector('.places__list');
const popupProfile = document.querySelector('.popup_type_edit');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close');
const formProfile = document.querySelector('div.popup_type_edit .popup__form');
const inputName = formProfile.querySelector('.popup__input_type_name');
const inputJob = formProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');
const buttonClosePopupAddNewCard = popupAddNewCard.querySelector('.popup__close');
const formAddNewCard = document.querySelector('div.popup_type_new-card .popup__form');
const inputPlace = formAddNewCard.querySelector('.popup__input_type_card-name');
const inputLink = formAddNewCard.querySelector('.popup__input_type_url');
const popupFullImage = document.querySelector('.popup_type_image');
const buttonClosePopupFullImage = popupFullImage.querySelector('.popup__close');
const photoPopupimage = popupFullImage.querySelector('.popup__image');
const popupCardTitle = document.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');

function renderCard(cardElement, isprepend = false) {
  if (isprepend) {
    cardContainer.prepend(cardElement);
  } else {
  cardContainer.append(cardElement);
  };
};

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeModal(popupProfile);
};

export function handleClickImage(name, link) {
  openModal(popupFullImage);
  photoPopupimage.src=link;
  photoPopupimage.alt=name;
  popupCardTitle.textContent=name;
};

function handleFormAddNewCardSubmit(evt) {
  evt.preventDefault();

  const card = {
  name: inputPlace.value,
  link: inputLink.value,
  };

  renderCard(createCard(card, handleDeleteCard, handleLikeCard, handleClickImage), true);
  closeModal(popupAddNewCard);
  formAddNewCard.reset();
  clearValidation(popupAddNewCard, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
};

buttonOpenPopupProfile.addEventListener('click', function(evt) {
  evt.preventDefault();
  openModal(popupProfile);
  clearValidation(popupProfile, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
  });
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});
 
buttonClosePopupProfile.addEventListener('click', function(evt) {
  evt.preventDefault();
  closeModal(popupProfile);
});

formProfile.addEventListener('submit', handleFormProfileSubmit);

buttonOpenPopupAddNewCard.addEventListener('click', function(evt) {
  evt.preventDefault();
  openModal(popupAddNewCard);
});
 
buttonClosePopupAddNewCard.addEventListener('click', function(evt) {
  evt.preventDefault();
  closeModal(popupAddNewCard);
});

formAddNewCard.addEventListener('submit', handleFormAddNewCardSubmit);

buttonClosePopupFullImage.addEventListener('click', function(evt) {
  evt.preventDefault();
  closeModal(popupFullImage);
});

initialCards.forEach((card) => { 
  renderCard(createCard(card, handleDeleteCard, handleLikeCard, handleClickImage));
});

popups.forEach((popup) => {
  popup.addEventListener('click', closeModalOnBg);
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 