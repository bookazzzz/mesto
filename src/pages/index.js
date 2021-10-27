import './index.css';

import {
  openPopupProfileButton,
  cardContainer,
  openPopupAddCardButton
} from '../script/constants.js'

//Импорт создания карточки
import { Card } from '../components/Card.js';
import Section from '../components/Section.js'
import {
  initialCards,
  validationConfig
} from '../script/Settings.js'

//Импорт валидации
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from "../components/Api.js"

// ========================== ПР 9 ====================================================


// Идентефикация
const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-29/',
  headers: {
    authorization: 'f0580056-984e-4f07-9580-70b86980b58c',
    'Content-Type': 'application/json'
  }
})

//Создаем информацию о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});


api
    .getAppInfo()
    .then(([ userInfoRes, getInitialCards ]) => {
        console.log(getInitialCards)
        userInfo.setUserInfo({
            name: userInfoRes.name,
            description: userInfoRes.about,
            avatar: userInfoRes.avatar
        })
    })
    .catch(err => console.log(`Ошибка загрузки инициирующих данных: ${err}`))







// Promise.all([api.getUserInfo(), api.getInitialCards()])
//     .then(([properties, initialCards]) => {
//         userInfo.setUserInfo(properties);
//         userId = properties._id;
//         cardContainer.renderInitialItems(initialCards);
//     })
//     .catch((err) => {
//         console.log(err);
//     })



// ============================================================================================
//отрисовываем элементы на странице
const section = new Section ({
  items: initialCards,
  renderer: renderCard
}, '.elements');

section.renderInitialItems();

//Функция добавляет карточку в DOM
function renderCard({name, link}) {
  const card = createCard(name, link)
  return cardContainer.prepend(card);
}
//Функция создает карточку по шаблону
function createCard(name, link) {
  const card = new Card(name, link,  '#element-template', elementClickHandler);

  return card.generateCard();
}

//================= Popup большой картинки ============================

//создаём попап с картинкой
const popupWithImage = new PopupWithImage('.popup_big-size-image')
popupWithImage.setEventListeners()

//функция открытия попапа с картинкой
function elementClickHandler() {
  popupWithImage.open(this._name, this._link);
}

//================= Popup профиля ============================



//Создаем попап формы редактирования профиля
const popupWithFormEditProfile = new PopupWithForm ('.popup_type_profile-edit', (data) => {
  api.editUserInfo(data)
  .then((res) => {
    userInfo.setUserInfo(res);
    popupWithFormEditProfile.close();
  })
  .catch((err) => {
      console.log(err);
  })
});

popupWithFormEditProfile.setEventListeners();

// Отправка формы редактирования профиля
const editProfileFormSubmit = () => {
  const data = userInfo.getUserInfo()
  validFormProfile.toggleButtonState();
  validFormProfile.resetValidation();
  for (let key in data) {
    popupWithFormEditProfile.form.elements[key].value = data[key]
  }
  popupWithFormEditProfile.open()
}

//валидация формы редактирования профиля
const validFormProfile = new FormValidator(validationConfig, popupWithFormEditProfile.form)
validFormProfile.enableValidation()

//слушатель клика по кнопке редактирования профиля
openPopupProfileButton.addEventListener('click', editProfileFormSubmit)

//================= Popup добавления карточки ============================

const popupWithFormCard = new PopupWithForm('.popup_type_add-card',

  ({ cardNameField, cardLinkField }) => {
    section.addItem(createCard(cardNameField, cardLinkField))
  });

popupWithFormCard.setEventListeners()

//слушатель клика по кнопке добавления карточки
openPopupAddCardButton.addEventListener('click', () => {
  validFormCard.toggleButtonState();
  validFormCard.resetValidation();
  popupWithFormCard.open();
})

//валидация формы редактирования карточки
const validFormCard = new FormValidator(validationConfig, popupWithFormCard.form)
validFormCard.enableValidation()

