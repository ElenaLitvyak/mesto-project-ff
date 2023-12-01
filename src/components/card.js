import { cardContainer, popupImage, image, popupCardTitle } from '../index';
import { openModal } from './modal';

export function createCard(cardData, handleDeleteCard, handleClickImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', handleDeleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', handleClickImage);

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
}

export function handleClickImage(evt) {
  evt.preventDefault();
  openModal(popupImage);
  image.src=evt.target.src;
  image.alt=evt.target.alt;
  popupCardTitle.textContent=evt.target.alt;
}