import { cardContainer, popupDeleteCard } from './index';
import { openModal, closeModal } from './modal';
import { deleteMyCard, putLikeCard, patchUserInformation, deleteLikeCard } from './api';

export function createCard(cardData, handleDeleteCard, handleClickImage, profileId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLike = cardElement.querySelector('.card__paragraph')
  const buttonBasketDeleteCard = cardElement.querySelector('.card__delete-button');
  const buttonLikeCard = cardElement.querySelector('.card__like-button');
  const popupDeleteCard = document.querySelector('.popup_type_delete');
  const buttonAgree = document.querySelector('#conformation_popup_agree');

  cardElement.id = cardData._id;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLike.textContent = cardData.likes.length;

  if (cardLike.textContent !== 0 && cardData.likes.some(like => like._id === profileId)) {
    buttonLikeCard.classList.add('card__like-button_is-active')
  }
 
  if (profileId !== cardData.owner._id) {
    buttonBasketDeleteCard.classList.add('button_is-invisible')
  }

  buttonBasketDeleteCard.addEventListener('click', function(evt) {
  evt.preventDefault();
  buttonAgree.setAttribute('data-id', cardData._id);
  openModal(popupDeleteCard);
  });

  buttonLikeCard.addEventListener('click', function(evt) {
    evt.preventDefault();
    buttonLikeCard.setAttribute('data-id', cardData._id);
    const cardId = evt.target.getAttribute('data-id');

    if (!evt.target.classList.contains('card__like-button_is-active')) {
      putLikeCard(cardId)
      .then(() => {
        evt.target.classList.toggle('card__like-button_is-active');
        cardLike.textContent = cardData.likes.length+1;
      })
      .catch((err) => {
      console.log(err);
      }) 
    } else{
      deleteLikeCard(cardId)
      .then(() => {
        evt.target.classList.toggle('card__like-button_is-active');
        cardLike.textContent = cardData.likes.length;
      })
      .catch((err) => {
        console.log(err);
      }) 
    }
  });

  cardImage.addEventListener('click', (evt) => handleClickImage(evt.target.alt, evt.target.src));
  
  return cardElement;
};

export function handleDeleteCard(event) {
  const cardId = event.target.getAttribute('data-id');

  deleteMyCard(cardId)
  .then(() => {
  const cardDelete = document.getElementById(cardId)
  cardDelete.remove();
  closeModal(popupDeleteCard);
  })
  .catch((err) => {
  console.log(err);
  })
}