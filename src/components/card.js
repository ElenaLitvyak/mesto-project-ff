import { popupDeleteCard } from './index';
import { openModal, closeModal } from './modal';
import { deleteMyCard, putLikeCard, deleteLikeCard } from './api';

export function createCard(cardData, handleDeleteCard, handleLikeCard, handleClickImage, profileId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likesCounter = cardElement.querySelector('.card__paragraph')
  const buttonBasketDeleteCard = cardElement.querySelector('.card__delete-button');
  const buttonLikeCard = cardElement.querySelector('.card__like-button');
 
  cardElement.id = cardData._id;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likesCounter.textContent = cardData.likes.length;

  if (likesCounter.textContent !== 0 && cardData.likes.some(like => like._id === profileId)) {
    buttonLikeCard.classList.add('card__like-button_is-active')
  }
 
  if (profileId !== cardData.owner._id) {
    buttonBasketDeleteCard.classList.add('button_is-invisible')
  }

  buttonBasketDeleteCard.addEventListener('click', (evt) => handleDeleteCard(cardData._id));

  buttonLikeCard.addEventListener('click', function(evt) {
    buttonLikeCard.setAttribute('data-id', cardData._id);
    const cardId = evt.target.getAttribute('data-id');
    handleLikeCard(evt, cardId, likesCounter);
  });

  cardImage.addEventListener('click', (evt) => handleClickImage(evt.target.alt, evt.target.src));
  
  return cardElement;
};

export function handleLikeCard(evt, cardId, likesCounter) {
    if (!evt.target.classList.contains('card__like-button_is-active')) {
    putLikeCard(cardId)
    .then((res) => {
      evt.target.classList.toggle('card__like-button_is-active');
      likesCounter.textContent = res.likes.length;
    })
    .catch((err) => {
    console.log(err);
    }) 
  } else{
    deleteLikeCard(cardId)
    .then((res) => {
      evt.target.classList.toggle('card__like-button_is-active');
      likesCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    }) 
  }
};

export function handleDeleteCard(cardId) {
  const popupDeleteCard = document.querySelector('.popup_type_delete');
  const buttonAgreeDeleteCard = document.querySelector('#conformation_popup_agree');
  buttonAgreeDeleteCard.setAttribute('data-id', cardId);
  openModal(popupDeleteCard);
};

export function deleteCard(event) {
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
};