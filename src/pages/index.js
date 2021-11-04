import './index.css';

import {
  openPopupProfileButton,
  openPopupAddCardButton,
  nameInputElement,
  jobInputElement,
  avatarInputElement,
  avatarEdit,
} from '../script/constants.js'

//Импорт создания карточки
import { Card } from '../components/Card.js';
import Section from '../components/Section.js'
import {
  popupWithFormCardConfig,
  validationConfig,
  removeCardPopupConfig
} from '../script/Settings.js'
import {renderLoading} from '../script/renderLoading.js'
//Импорт валидации
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from "../components/Api.js"
import PopupWithConfirmation from "../components/PopupWithConfirmation.js"

// ========================== ПР 9 ====================================================


// Идентефикация
const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-29/',
  headers: {
    authorization: 'f0580056-984e-4f07-9580-70b86980b58c',
    'Content-Type': 'application/json'
  }
})
let userId = null
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
        cardsList.renderInitialItems(arrayCards);
      })
      .catch(err => {
        console.log(err);
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
  api.editAvatar(data.avatar)
    .then((info) => {
      userInfo.setUserInfo({
          avatar: info.avatar,
      });
      popupWithFormAvatar.close();
    })
    .catch(err => console.log(`При изменении аватара пользователя: ${err}`));
});
popupWithFormAvatar.setEventListeners();

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

const popupWithFormCard = new PopupWithForm({popupWithFormCardConfig, handleSubmit:(data) => {
  renderLoading(popupWithFormCard, true, 'Создать', 'Создание...')
  api.addPlaceCard(data)
  .then(data => {
    cardsList.addItem(createCard(data))
    popupWithFormCard.close()
})
.catch(err => console.log(`Не удалось сохранить карточку: ${err}`))
.finally(() => {
    renderLoading(popupWithFormCard, false, 'Создать', 'Создание...')
})
}})

popupWithFormCard.setEventListeners();
document.querySelector('.profile__add-card').addEventListener('click', () => popupWithFormCard.open())

// //слушатель клика по кнопке добавления карточки
openPopupAddCardButton.addEventListener('click', () => {
  validFormCard.toggleButtonState();
  validFormCard.resetValidation();
  popupWithFormCard.open();
})

// //валидация формы редактирования карточки
const validFormCard = new FormValidator(validationConfig, popupWithFormCard.form)
validFormCard.enableValidation()
// ============================================================================================

// отрисовка карточки
const cardsList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    const cardLikesCount = cardElement.querySelector('.element__likes-count');
    cardLikesCount.textContent = item.likes.length;
    cardsList.addItem(cardElement, 'append');
  }
}, '.elements');

//Функция создает карточку по шаблону
function createCard(data) {
  const card = new Card({
    data,
    currentUserId: userId,
    cardSelector:'#element-template',
    handleLike: (card) => {
      api
          .updateCardLike(card.getId(), !card.isLiked())
          .then(data => card.setLikes(data.likes))
          .catch(err => console.log(`Не удалось изменить состояние лайка карточки: ${err}`))
  },
  handleRemove: (card) => {
      removeCardPopup.open()
      removeCardPopup.setSubmitHandler(() => {
          renderLoading(removeCardPopup, true, 'Да', 'Удаление...')

          api
              .deletePlaceCard(card.getId())
              .then(() => {
                  card.deleteCard()
                  removeCardPopup.close()
              })
              .catch(err => console.log(`Не удалось удалить карточку: ${err}`))
              .finally(() => {
                  renderLoading(removeCardPopup, false, 'Да', 'Удаление...')
              })
      })
  },
  elementClickHandler
})

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

//================= Popup подтверждения удаления карточки ============================

const removeCardPopup = new PopupWithConfirmation(removeCardPopupConfig)
removeCardPopup.setEventListeners()
