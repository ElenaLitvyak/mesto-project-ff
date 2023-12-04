import { cardContainer } from './index';

export function createCard(cardData, handleDeleteCard, handleLikeCard, handleClickImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const buttonBasketDeleteCard = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  buttonBasketDeleteCard .addEventListener('click', handleDeleteCard);
  cardContainer.addEventListener('click', handleLikeCard);
  cardImage.addEventListener('click', (evt) => handleClickImage(evt.target.alt, evt.target.src));
  
  return cardElement;
};

export function handleDeleteCard(event) {
  const item = event.target.closest('.card');

  item.remove();
};

export function handleLikeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
   evt.target.classList.toggle('card__like-button_is-active'); 
  };
};