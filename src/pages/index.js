import './index.css';

import {
  openPopupProfileButton,
  openPopupAddCardButton,
  nameInputElement,
  jobInputElement,
  avatarInputElement,
  avatarEdit,
  saveButtonCardAdd,
  saveButtonProfile,
  saveButtonAvatar,
  buttonDeliteСonfirmation

} from '../utils/constants.js'

//Импорт создания карточки
import { Card } from '../components/Card.js';
import Section from '../components/Section.js'
import {
  popupWithFormCardConfig,
  validationConfig,
  removeCardPopupConfig,
  popupWithFormAvatarConfig,
  popupWithFormProfileConfig
} from '../utils/Settings.js'
import {renderLoading} from '../utils/renderLoading.js'
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
      userId = userData._id
      cardsList.renderInitialItems(getInitialCards);
    })
    .catch(err => console.log(`Ошибка загрузки инициирующих данных: ${err}`))

// экземпляр класса попап - редактирование профиля
const popupWithFormEditProfile = new PopupWithForm (popupWithFormProfileConfig.popupSelector,
{submitForm: (data) => {
  renderLoading(saveButtonProfile, 'Сохранение...')
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
    .catch((err) => {
      console.log(`Ошибка при обновлении информации о пользователе: ${err}`);
    })
    .finally(() => {
      renderLoading(saveButtonProfile, 'Сохранить')
    });
 }
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
const popupWithFormAvatar = new PopupWithForm(popupWithFormAvatarConfig.popupSelector, {submitForm:(data) => {
  renderLoading(saveButtonAvatar, 'Сохранение...')
  api.editAvatar(data.avatar)
    .then((info) => {
      userInfo.setUserInfo({
          avatar: info.avatar,
      });
      popupWithFormAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении информации о пользователе: ${err}`);
    })
    .finally(() => {
      renderLoading(saveButtonAvatar, 'Сохранить')
    });
 }
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

const popupWithFormCard = new PopupWithForm(popupWithFormCardConfig.popupSelector, {submitForm:(data) => {
  renderLoading(saveButtonCardAdd, 'Сохранение...')
  api.addPlaceCard(data)
  .then(data => {
    cardsList.addItem(createCard(data))
    popupWithFormCard.close()
})
.catch(err => console.log(`Не удалось сохранить карточку: ${err}`))
.finally(() => {
    renderLoading(saveButtonCardAdd, 'Сохранить')
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
  containerSelector: '.elements',
  renderer: (item) => {
    const cardElement = createCard(item);
    const cardLikesCount = cardElement.querySelector('.element__likes-count');
    cardLikesCount.textContent = item.likes.length;
    cardsList.addItem(cardElement);
  }
});

//Функция создает карточку по шаблону
function createCard(data) {
  const cardObj = new Card({
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
          renderLoading(buttonDeliteСonfirmation,'Удаление...')

          api

              .deletePlaceCard(card.getId())

              .then(() => {
                card.deleteCard()
                  removeCardPopup.close()
              })
              .catch(err => console.log(`Не удалось удалить карточку: ${err}`))

              .finally(() => {
                  renderLoading(buttonDeliteСonfirmation, 'Да')
              })
      })
  },
  elementClickHandler
})

  return cardObj.generateCard();
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
