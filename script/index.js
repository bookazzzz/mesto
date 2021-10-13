//Импорт создания карточки
import { Card } from './Card.js';
import Section from './Section.js'
import {
  initialCards
} from './Settings.js'
//Импорт валидации
import FormValidator from "./FormValidator.js";
import PopupWithImage from './PopupWithImage.js'

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




//отрисовываем элементы на странице
const section = new Section ({
  items: initialCards,
  renderer: renderCard
}, '.elements');

section.renderInitialItems();

//Функция добавляет карточку в DOM
function renderCard({name, link}) {
  const card = createCard(name, link)
  cardContainer.prepend(card.generateCard());
}
//Функция создает карточку по шаблону
function createCard(name, link) {
  return new Card(name, link,  '#element-template', elementClickHandler);
}

//создаём попап с картинкой
const popupWithImage = new PopupWithImage('.popup_big-size-image')
popupWithImage.setEventListeners()
//функция открытия попапа с картинкой
function elementClickHandler() {
  popupWithImage.open(this._name, this._link);
}


















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
// popupCloseBigImg.addEventListener('click', () => closePopup(popupImage));
