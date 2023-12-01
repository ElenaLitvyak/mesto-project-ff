import { popupImage } from '../index';
import { openModal } from './modal';

const content = document.querySelector('.content');
const cardContainer = content.querySelector('.places__list');

export function createCard(cardData, handleDeleteCard, likeCard, handleClickImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', handleDeleteCard);
  cardContainer.addEventListener('click', likeCard);
  cardImage.addEventListener('click', handleClickImage);
  return cardElement;
}

export function renderCard(cardElement, isprepend = false) {
  if (isprepend) {
   cardContainer.prepend(cardElement);
  } else {
   cardContainer.append(cardElement);
  };
};

export function handleDeleteCard(event) {
  const item = event.target.closest('.card');
  item.remove();
};

export function handleClickImage(evt) {
  evt.preventDefault();
  openModal(popupImage);
  const image = popupImage.querySelector('.popup__image');
  const popupCardTitle = document.querySelector('.popup__caption');
  image.src=evt.target.src;
  image.alt=evt.target.alt;
  popupCardTitle.textContent=evt.target.alt;
};

export function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
   evt.target.classList.toggle('card__like-button_is-active'); 
  };
};