import '../pages/index.css';
import { createCard, handleDeleteCard } from './card';
import { openModal, closeModal, closeModalOnBg } from './modal';
import { enableValidation, clearValidation } from './validation';
import { getUserInformation, getInitialCards, patchUserInformation, postNewCard, patchAvatar } from './api';

const content = document.querySelector('.content');
export const cardContainer = content.querySelector('.places__list');
const popupProfile = document.querySelector('.popup_type_edit');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close');
const formProfile = document.querySelector('div.popup_type_edit .popup__form');
export const inputName = formProfile.querySelector('.popup__input_type_name');
export const inputJob = formProfile.querySelector('.popup__input_type_description');
const profileAvatar = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const buttonUpdeteProfile = formProfile.querySelector('.popup__button');
const popupUpdateAvatar = document.querySelector('.popup_type_avatar');
const buttonOpenPopupAvatar = document.querySelector('.profile__image');
const buttonClosePopupUpdateAvatar = popupUpdateAvatar.querySelector('.popup__close');
const formAvatar = document.querySelector('div.popup_type_avatar .popup__form');
export const inputAvatar = formAvatar.querySelector('.popup__input_type_avatar');
const buttonUpdateAvatar = formAvatar.querySelector('.popup__button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');
const buttonClosePopupAddNewCard = popupAddNewCard.querySelector('.popup__close');
const formAddNewCard = document.querySelector('div.popup_type_new-card .popup__form');
export const inputPlace = formAddNewCard.querySelector('.popup__input_type_card-name');
export const inputLink = formAddNewCard.querySelector('.popup__input_type_url');
const buttonAddNewCard = formAddNewCard.querySelector('.popup__button');
const popupFullImage = document.querySelector('.popup_type_image');
const buttonClosePopupFullImage = popupFullImage.querySelector('.popup__close');
const photoPopupimage = popupFullImage.querySelector('.popup__image');
const popupCardTitle = document.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');
export const popupDeleteCard = document.querySelector('.popup_type_delete');
const buttonClosePopupDeleteCard = popupDeleteCard.querySelector('.popup__close');
const buttonAgreeDeleteCard = popupDeleteCard.querySelector('.popup__button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function renderCard(cardElement, isprepend = false) {
  if (isprepend) {
    cardContainer.prepend(cardElement);
  } else {
  cardContainer.append(cardElement);
  };
};

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  buttonUpdeteProfile.textContent = 'Сохранение...';
  patchUserInformation()
  .then((data) => {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonUpdeteProfile.textContent = 'Сохранить';
    closeModal(popupProfile);
  })   
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

  buttonAddNewCard.textContent = 'Сохранение...';
  postNewCard()
  .then((newCard) => {
    renderCard(createCard(newCard, handleDeleteCard, handleClickImage, profileId), true);
    closeModal(popupAddNewCard);
    formAddNewCard.reset();
    clearValidation(popupAddNewCard, validationConfig);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonAddNewCard.textContent = 'Создать';
    closeModal(popupAddNewCard);
  }) 
};

function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  buttonUpdateAvatar.textContent = 'Сохранение...';
  patchAvatar()
  .then((newAvatar) => {
    profileAvatar.style.backgroundImage = `url(${newAvatar.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonUpdateAvatar.textContent = 'Сохранить';
    closeModal(popupUpdateAvatar);
  })
};
  
let profileId;

const promises = [getUserInformation(), getInitialCards()];

Promise.all(promises)
.then(([profile, cards]) => {
  profileAvatar.style.backgroundImage = `url(${profile.avatar})`;
  profileName.textContent = profile.name;
  profileJob.textContent = profile.about;
  profileId = profile._id;
  cards.forEach((card) => { 
    renderCard(createCard(card, handleDeleteCard, handleClickImage, profile._id)); 
  })   
})
.catch((err) => {
  console.log(err);
})   

buttonOpenPopupProfile.addEventListener('click', function(evt) {
  evt.preventDefault();
  openModal(popupProfile);
  clearValidation(popupProfile, validationConfig);
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

buttonOpenPopupAvatar.addEventListener('click', function(evt) {
  evt.preventDefault();
  openModal(popupUpdateAvatar);
});

buttonClosePopupUpdateAvatar.addEventListener('click', function(evt) {
  evt.preventDefault();
  closeModal(popupUpdateAvatar);
});

formAvatar.addEventListener('submit', handleFormAvatarSubmit);

buttonClosePopupFullImage.addEventListener('click', function(evt) {
  evt.preventDefault();
  closeModal(popupFullImage);
});

buttonClosePopupDeleteCard.addEventListener('click', function(evt) {
  evt.preventDefault();
  closeModal(popupDeleteCard);
});

buttonAgreeDeleteCard.addEventListener('click', handleDeleteCard);

popups.forEach((popup) => {
  popup.addEventListener('click', closeModalOnBg);
});

enableValidation(validationConfig);