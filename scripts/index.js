const content = document.querySelector('.content');
const cardContainer = content.querySelector('.places__list');

function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
   
  initialCards.forEach(function(cardData) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;

    addCard(cardElement);

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function(event) {
      let item = event.target.closest('.card');
      item.remove();
    });   
  });    
}

function addCard(cardElement) {
  cardContainer.append(cardElement);
}

const addButton = content.querySelector('.profile__add-button');
addButton.addEventListener('click', createCard);


// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
