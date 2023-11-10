const content = document.querySelector('.content');
const cardContainer = content.querySelector('.places__list');

function createCard(cardData, handleDeleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', handleDeleteCard);

  return cardElement;
}

function renderCard(cardElement) {
  cardContainer.append(cardElement);
}

function handleDeleteCard(event) {
  const item = event.target.closest('.card');
  item.remove();
}

initialCards.forEach((card) => { 
  renderCard(createCard(card, handleDeleteCard))
});  

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
