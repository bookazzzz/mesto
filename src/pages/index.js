import './index.css';

import {
  openPopupProfileButton,
  cardContainer,
  openPopupAddCardButton,
  popupButtonList,
  profileName,
  profileJob,
  profilePopup,
  nameInputElement,
  jobInputElement,
  avatarInputElement,
  avatarEdit
} from '../script/constants.js'

//Импорт создания карточки
import { Card } from '../components/Card.js';
import Section from '../components/Section.js'
import {
  initialCards,
  validationConfig,
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

//Загрузка имени пользователя и карточек с сервера
  api.getAppInfo()
    .then(([ userData, getInitialCards ]) => {
      userInfo.setUserInfo({
        name:userData.name,
        about:userData.about,
        avatar:userData.avatar
      })
      console.log(getInitialCards)
      api.getInitialCards()
      .then(arrayCards => {
        section.renderInitialItems(arrayCards);
      })
      .catch(err => {
        console.error(err);
      })

    })
    .catch(err => console.log(`Ошибка загрузки инициирующих данных: ${err}`))

// экземпляр класса попап - редактирование профиля
const popupWithFormEditProfile = new PopupWithForm ('.popup_type_profile-edit',
(data) => {
  console.log(data)
  api.editUserInfo({
      name: data.name,
      about: data.about
    })
    .then((info) => {
      userInfo.setUserInfo({
          name: info.name,
          about: info.about
      })
      popupWithFormEditProfile.close();
    })
    .catch(err => console.log(`Ошибка при обновлении информации о пользователе: ${err}`));
  });

  popupWithFormEditProfile.setEventListeners();

// Отправка формы редактирования профиля
const editProfileFormSubmit = () => {
  const data = userInfo.getUserInfo()
  validFormProfile.toggleButtonState();
  validFormProfile.resetValidation();
  nameInputElement.value = data.name;
  jobInputElement.value = data.about;
  popupWithFormEditProfile.open()
}

//валидация формы редактирования профиля
const validFormProfile = new FormValidator(validationConfig, popupWithFormEditProfile.form)
validFormProfile.enableValidation()

//слушатель клика по кнопке редактирования профиля
openPopupProfileButton.addEventListener('click', editProfileFormSubmit)

//Экземпляр формы редактирования аватара
const popupWithFormAvatar = new PopupWithForm(".popup_avatar", (data) => {
  api.setUserAvatar({
      avatar: data.avatar
    })
    .then((info) => {
      userInfo.setUserInfo({
          avatar: info.avatar,
      });
      popupWithFormAvatar.close();
    })
    .catch(err => console.log(`При изменении аватара пользователя: ${err}`));
});

// Отправка формы редактирования аватара
const editAvatarFormSubmit = () => {
  const data = userInfo.getUserInfo()
  validFormAvatar.toggleButtonState();
  validFormAvatar.resetValidation();
  avatarInputElement.value = data.avatar;
  popupWithFormAvatar.open()
}

//валидация формы редактирования avatar
const validFormAvatar = new FormValidator(validationConfig, popupWithFormAvatar.form)
validFormAvatar.enableValidation()

//слушатель клика по кнопке редактирования avatar

avatarEdit.addEventListener('click', editAvatarFormSubmit)


// ======================  экземпляр класса попап - Новая карточка  ===============================





// ============================================================================================

const section = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    const cardLikesCount = cardElement.querySelector('.element__likes-count');
    cardLikesCount.textContent = item.likes.length;
    section.addItem(cardElement, 'append');
  }
}, '.elements');
//отрисовываем элементы на странице
// const section = new Section ({
//   items: initialCards,
//   renderer: renderCard
// }, '.elements');

// section.renderInitialItems();

//Функция добавляет карточку в DOM
function renderCard({name, link}) {
  const card = createCard(name, link)
  return cardContainer.prepend(card);
}
//Функция создает карточку по шаблону
function createCard(item) {
  const card = new Card(item.name, item.link,  '#element-template', elementClickHandler);

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



// //Создаем попап формы редактирования профиля
// const popupWithFormEditProfile = new PopupWithForm ('.popup_type_profile-edit', (data) => {
//   api.editUserInfo(data)
//   .then((res) => {
//     userInfo.setUserInfo(res);
//     popupWithFormEditProfile.close();
//   })
//   .catch((err) => {
//       console.log(err);
//   })
// });

// popupWithFormEditProfile.setEventListeners();

// Отправка формы редактирования профиля
// const editProfileFormSubmit = () => {
//   const data = userInfo.getUserInfo()
//   validFormProfile.toggleButtonState();
//   validFormProfile.resetValidation();
//   for (let key in data) {
//     popupWithFormProfile.form.elements[key].value = data[key]
//   }
//   popupWithFormProfile.open()
// }

//валидация формы редактирования профиля
// const validFormProfile = new FormValidator(validationConfig, popupWithFormProfile.form)
// validFormProfile.enableValidation()

// //слушатель клика по кнопке редактирования профиля
// openPopupProfileButton.addEventListener('click', editProfileFormSubmit)

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
