import { cardContainer, popupDeleteCard } from './index';
import { openModal, closeModal } from './modal';
import { deleteMyCard } from './api';

export function createCard(cardData, handleDeleteCard, handleLikeCard, handleClickImage, profileId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLike = cardElement.querySelector('.card__paragraph')
  const buttonBasketDeleteCard = cardElement.querySelector('.card__delete-button');
  const popupDeleteCard = document.querySelector('.popup_type_delete');
  const buttonAgree = document.querySelector('#conformation_popup_agree');

  cardElement.id = cardData._id;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLike.textContent = cardData.likes.length;

  /*cardData.likes ? cardLike.textContent = cardData.likes.length : cardLike.textContent = 0;*/

  
  if (profileId !== cardData.owner._id) {
    buttonBasketDeleteCard.classList.add('button_is-invisible')
  }

   buttonBasketDeleteCard.addEventListener('click', function(evt) {
    evt.preventDefault();
    buttonAgree.setAttribute('data-id', cardData._id);
    openModal(popupDeleteCard);
  })

 /* buttonBasketDeleteCard .addEventListener('click', handleDeleteCard);*/
  cardContainer.addEventListener('click', handleLikeCard);
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




console.log(cardId)



  /*const item = event.target.closest('.card');
  console.log()
  item.remove();*/
};

export function handleLikeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
   evt.target.classList.toggle('card__like-button_is-active'); 
  };
};

