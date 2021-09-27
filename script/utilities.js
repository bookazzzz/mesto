export {
  elementTemplate,
  popupViewerImage,
  popupViewerTitle,
  popupImage,
  openPopup,
  closePopup
};

const elementTemplate = document.querySelector("#element-template").content;
const popupViewerImage = document.querySelector(".popup__big-img");
const popupViewerTitle = document.querySelector(".popup__name-big-img");
const popupImage = document.querySelector(".popup_big-size-image");

//Функция открытия popup
const openPopup = popup => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape);
}

//Функция закрытия popup
const closePopup = popup => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape);
}

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
