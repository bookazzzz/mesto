// Импорт Открытия и закрытия popup
import {
  popupViewerImage,
  popupViewerTitle,
  popupImage,
  openPopup,
  closePopup
}from "./utilities.js";

//Импорт создания карточки
import { Card } from './Card.js';

//Импорт валидации
import FormValidator from "./FormValidator.js";

//попап редактирования профиля
const openPopupProfileButton = document.querySelector('.profile__edit');
const closePopupProfileButton = document.querySelector('.popup__close_type_profile-edit');
const popupProfile = document.querySelector('.popup_type_profile-edit');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const popupInputName = document.querySelector('.popup__field_type_name');
const popupInputJobs = document.querySelector('.popup__field_type_jobs');
const formElementProfile = document.querySelector('.popup__form')
//попап добавления карточки
const openPopupAddCardButton = document.querySelector('.profile__add-card');
const closePopupAddCardButton = document.querySelector('.popup__close_type_add-card');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formElementAddCard = document.querySelector('.popup__form_type_add-card')
//попап открытия картинки
const popupCloseBigImg = document.querySelector('.popup__close_type_big-image');
const cardContainer = document.querySelector('.elements');
const openedPopup = document.querySelector('.popup_opened')

// Открытие попапа profile
const openProfilePopup = popup => {
  openPopup(popup)
  popupInputName.value = nameProfile.textContent;
  popupInputJobs.value = jobProfile.textContent;
}

// Отправка формы редактирования профиля
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = popupInputName.value;
    jobProfile.textContent = popupInputJobs.value;
    closePopup (popupProfile);
    validFormProfile.toggleButtonState();
}

function formSubmitCard(evt) {
  evt.preventDefault();
  const image = document.querySelector('.popup__field_type_card-link');
  const name = document.querySelector('.popup__field_type_card-name');
  renderCard( name.value, image.value);
  image.value = '';
  name.value = '';
  closePopup (popupAddCard);
  validformSubmitCard.toggleButtonState();
}

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

function renderCard(name, link, cardSelector, elementClickHandler) {
  const card = new Card(name, link,  '#element-template', elementClickHandler);
  cardContainer.prepend(card.generateCard());
}

function renderInitialCards() {
  initialCards.forEach((card) => renderCard(card.name, card.link,  '#element-template', elementClickHandler))
}

renderInitialCards();

function elementClickHandler(event) {
  const imgSrc = event.target.src;
  const nameImg = event.target.parentNode.textContent
  openPopup(popupBigImg);
  document.querySelector('.popup__big-img').src = imgSrc;
  document.querySelector('.popup__name-big-img').textContent = nameImg;
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'error_visible'
};

// классы для валидации форм //
const validformSubmitCard = new FormValidator(validationConfig, popupAddCard);
validformSubmitCard.enableValidation();
const validFormProfile = new FormValidator(validationConfig, popupProfile);
validFormProfile.enableValidation();

openPopupProfileButton.addEventListener('click', () => openProfilePopup(popupProfile));
closePopupProfileButton.addEventListener('click', () => closePopup(popupProfile));
// Обработчики кликов на кнопку добавления карточки
openPopupAddCardButton.addEventListener('click', () => openPopup(popupAddCard));
closePopupAddCardButton.addEventListener('click', () => closePopup(popupAddCard));
// Обработчики кликов на кнопку отправки формы
formElementProfile.addEventListener('submit', formSubmitHandler);
// Обработчики кликов на кнопку отправки формы добавления карточки
formElementAddCard.addEventListener('submit', formSubmitCard);
// Обработчики кликов на карточку
popupCloseBigImg.addEventListener('click', () => closePopup(popupImage));
