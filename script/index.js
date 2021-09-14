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
const popupBigImg = document.querySelector('.popup_big-size-image');
const popupCloseBigImg = document.querySelector('.popup__close_type_big-image');
//лайки и контейнер
// const hearts = document.querySelectorAll('.element__heart');
const cardContainer = document.querySelector('.elements');
const openedPopup = document.querySelector('.popup_opened')



//Функция открытия и закрытия popup
const openPopup = popup => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape);
}

const closePopup = popup => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape);
}

// Открытие попапа profile
const openProfilePopup = popup => {
  openPopup(popup)
  popupInputName.value = nameProfile.textContent;
  popupInputJobs.value = jobProfile.textContent;
}



//обработчик клика для карточки
function elementClickHandler(event) {
  const imgSrc = event.target.src;
  const nameImg = event.target.parentNode.textContent
  openPopup(popupBigImg);
  document.querySelector('.popup__big-img').src = imgSrc;
  document.querySelector('.popup__name-big-img').textContent = nameImg;
}

// Реализация постановки лайков.
// function heartFillToggle(event) {
//     event.target.classList.toggle('element__heart_fill');

//     for (let i = 0; i <hearts.length; i++) {
//     hearts[i].addEventListener('click', heartFillToggle);
//   }
// }

// Отправка формы редактирования профиля
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = popupInputName.value;
    jobProfile.textContent = popupInputJobs.value;
    closePopup (popupProfile);
    evt.target.querySelector('.popup__button').classList.add('popup__button_invalid')
}

//создание карточки
function createCard(imageValue, nameValue) {
  const cardTemplate = document.querySelector('#element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = imageValue;
  cardImage.alt = nameValue;
  cardElement.querySelector('.element__name').textContent = nameValue;
  cardElement.querySelector('.element__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_fill');
  });
  cardElement.querySelector('.element__delete').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  cardImage.addEventListener('click', elementClickHandler)
  return cardElement;
}

// добавление карточки
function addCard (imageValue, nameValue) {
  cardContainer.prepend( createCard(imageValue, nameValue) );
}

// Отправка формы добавления карточки
function formSubmitCard(evt) {
  evt.preventDefault();
  const image = document.querySelector('.popup__field_type_card-link');
  const name = document.querySelector('.popup__field_type_card-name');
  addCard(image.value, name.value);
  image.value = '';
  name.value = '';
  closePopup (popupAddCard);
  evt.target.querySelector('.popup__button').classList.add('popup__button_invalid')
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
//загрузка карточек из массива
initialCards.forEach((card) => {
  const cardElement = createCard(card.link, card.name);
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = card.link;
  cardContainer.prepend(cardElement);
});

// закрытие popup на esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}
// закрытие popup на клик вне его
const popupList = document.querySelectorAll('.popup');
popupList.forEach(pop => {
  pop.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(event.target)
    }
  })
})

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'error_visible'
};

enableValidation(validationConfig);

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
popupCloseBigImg.addEventListener('click', () => closePopup(popupBigImg));


