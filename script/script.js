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
const hearts = document.querySelectorAll('.element__heart');
const cardContainer = document.querySelector('.elements');



//Функция открытия и закрытия popup
const openPopup = popup => {
  popup.classList.add('popup_opened')
}

const closePopup = popup => {
  popup.classList.remove('popup_opened')
}

// Открытие и закрытие попапа profile
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
function heartFillToggle(event) {
    event.target.classList.toggle('element__heart_fill');

    for (let i = 0; i <hearts.length; i++) {
    hearts[i].addEventListener('click', heartFillToggle);
  }
}

// Отправка формы редактирования профиля
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = popupInputName.value;
    jobProfile.textContent = popupInputJobs.value;
    closePopup (popupProfile);
}

//создание карточки
function createCard(imageValue, nameValue) {
  const cardTemplate = document.querySelector('#element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = imageValue;
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
  const cardTemplate = document.querySelector('#element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = card.link;
  cardElement.querySelector('.element__name').textContent = card.name;
  cardElement.querySelector('.element__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_fill');
  });
  cardElement.querySelector('.element__delete').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  cardImage.addEventListener('click', elementClickHandler)
  cardContainer.prepend(cardElement);
});

// закрытие popup на esc
document.addEventListener ('keydown', function(evt) {
  if(evt.keyCode == 27) {
    closePopup(document.querySelector('.popup_opened'));
    }
  })



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
