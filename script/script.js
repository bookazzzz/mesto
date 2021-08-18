let openPopupButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form')
let nameInput = document.querySelector('.profile__title');
let jobInput = document.querySelector('.profile__subtitle');
let popupInputName = document.querySelector('.popup__field_name');
let popupInputJobs = document.querySelector('.popup__field_jobs');
// это строка нужна для лайка. Будет использована в 5 спринте
//let hearts = document.querySelectorAll('.element__heart');


function openPofilePopup () {
  popup.classList.add('popup_opened');
  popupInputName.value = nameInput.innerText;
  popupInputJobs.value = jobInput.innerText;
}

function closePofilePopup () {
  popup.classList.remove('popup_opened');
}



// Реализация постановки лайков. Использую в 5 спринте
// function heartFillToggle(event) {
//    event.target.classList.toggle('element__heart_fill');
//  }

// for (let i = 0; i <hearts.length; i++) {
//   hearts[i].addEventListener('click', heartFillToggle);
// }


function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInput.textContent=popupInputName.value;
    jobInput.textContent=popupInputJobs.value;
    closePofilePopup ();
}

openPopupButton.addEventListener('click', openPofilePopup);
closePopupButton.addEventListener('click', closePofilePopup);
formElement.addEventListener('submit', formSubmitHandler);

