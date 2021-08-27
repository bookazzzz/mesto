let openPopupButton = document.querySelector('.profile__edit');
let openPopupAddCardButton = document.querySelector('.profile__add-card');
let popup = document.querySelector('.popup');
let popupAddCard = document.querySelector('.popup_type_add-card');
let closePopupButton = document.querySelector('.popup__close');
let closePopupAddCardButton = document.querySelector('.popup__close_type_add-card');
let formElement = document.querySelector('.popup__form')
let formElementAddCard = document.querySelector('.popup__form_type_add-card')
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');
let popupInputName = document.querySelector('.popup__field_type_name');
let popupInputJobs = document.querySelector('.popup__field_type_jobs');
let hearts = document.querySelectorAll('.element__heart');
const cardContainer = document.querySelector('.elements');


// Открытие и закрытие попапа profile
function openPofilePopup () {
  popup.classList.add('popup_opened');
  popupInputName.value = nameProfile.textContent;
  popupInputJobs.value = jobProfile.textContent;
}

function closePofilePopup () {
  popup.classList.remove('popup_opened');
}

// Открытие и закрытие попапа add_card

function openAddCardPopup () {
  popupAddCard.classList.add('popup_opened');
}

function closeAddCardPopup () {
  popupAddCard.classList.remove('popup_opened');
}

// Реализация постановки лайков.
function heartFillToggle(event) {
    event.target.classList.toggle('element__heart_fill');
  }

 for (let i = 0; i <hearts.length; i++) {
   hearts[i].addEventListener('click', heartFillToggle);
 }


// Отправка формы редактирования профиля
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent=popupInputName.value;
    jobProfile.textContent=popupInputJobs.value;
    closePofilePopup ();
}

// добавление карточки
function addCard (imageValue, nameValue) {
  const cardTemplate = document.querySelector('#element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = imageValue;
  cardElement.querySelector('.element__name').textContent = nameValue;
  cardElement.querySelector('.element__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_fill');
  });
  cardElement.querySelector('.element__delete').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  cardContainer.prepend(cardElement);
}
// Отправка формы добавления карточки
function formSubmitCard(evt) {
  evt.preventDefault();
  const image = document.querySelector('.popup__field_type_card-link');
  const name = document.querySelector('.popup__field_type_card-name');
  addCard(image.value, name.value);
  image.value = '';
  name.value = '';
  closeAddCardPopup ();
}

//загрузка карточек из массива

// Массив с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((card) => {
  const cardTemplate = document.querySelector('#element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__name').textContent = card.name;
  cardElement.querySelector('.element__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_fill');
  });
  cardElement.querySelector('.element__delete').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  cardContainer.prepend(cardElement);
});

// Обработчики кликов на кнопку редактирования профиля
openPopupButton.addEventListener('click', openPofilePopup);
closePopupButton.addEventListener('click', closePofilePopup);
// Обработчики кликов на кнопку добавления карточки
openPopupAddCardButton.addEventListener('click', openAddCardPopup);
closePopupAddCardButton.addEventListener('click', closeAddCardPopup);
// Обработчики кликов на кнопку отправки формы
formElement.addEventListener('submit', formSubmitHandler);
// Обработчики кликов на кнопку отправки формы добавления карточки
formElementAddCard.addEventListener('submit', formSubmitCard);