import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCard, renderCard, handleDeleteCard, likeCard, handleClickImage } from './components/card';
import { openModal, closeModal } from './components/modal';

initialCards.forEach((card) => { 
  renderCard(createCard(card, handleDeleteCard, likeCard, handleClickImage));
});  

const popupEdit = document.querySelector('.popup_type_edit');
const openPopupEdit = document.querySelector('.profile__edit-button');
const closePopupEdit = popupEdit.querySelector('.popup__close');
const formElement = document.querySelector('div.popup_type_edit .popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

openPopupEdit.addEventListener('click', function(evt) {
  evt.preventDefault();
  openModal(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
  
closePopupEdit.addEventListener('click', function(evt) {
  evt.preventDefault();
  closeModal(popupEdit);
  nameInput.value = '';
  jobInput.value = '';
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupEdit.classList.remove('popup_is-opened');
};
  
formElement.addEventListener('submit', handleFormSubmit);

const popupNewCard = document.querySelector('.popup_type_new-card');
const openPopupNewCard = document.querySelector('.profile__add-button');
const closePopupNewCard = popupNewCard.querySelector('.popup__close');

openPopupNewCard.addEventListener('click', function(evt) {
  evt.preventDefault();
  openModal(popupNewCard);
});
  
closePopupNewCard.addEventListener('click', function(evt) {
  evt.preventDefault();
  closeModal(popupNewCard);
});

const formNewPlace = document.querySelector('div.popup_type_new-card .popup__form');
const placeInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkInput = formNewPlace.querySelector('.popup__input_type_url');

function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();

  const card = {
  name: placeInput.value,
  link: linkInput.value,
  };

  renderCard(createCard(card, handleDeleteCard, likeCard, handleClickImage), true);
  popupNewCard.classList.remove('popup_is-opened');
  evt.target.reset();
};

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

export const popupImage = document.querySelector('.popup_type_image');
const closePopupImage = popupImage.querySelector('.popup__close');

closePopupImage.addEventListener('click', function(evt) {
  evt.preventDefault();
  closeModal(popupImage);
});