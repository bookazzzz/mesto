let openPopupButton = document.querySelector('.profile__vector');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form')
let formSubmitButton = document.querySelector('.popup__button')
let nameInput = document.querySelector('.profile__title');
let jobInput = document.querySelector('.profile__subtitle');
let popupInputName = document.querySelector('.popup__field_name');
let popupInputJobs = document.querySelector('.popup__field_jobs');
let hearts = document.querySelectorAll('.element__heart');


function togglePopup () {
  popup.classList.toggle('popup_opened');
  popupInputName.value = nameInput.innerText;
  popupInputJobs.value = jobInput.innerText;
}

openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);


function heartFillToggle(event) {
   event.target.classList.toggle('element__heart_fill');
 }

for (let i = 0; i <hearts.length; i++) {
  hearts[i].addEventListener('click', heartFillToggle);
}


function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInput.textContent=popupInputName.value;
    jobInput.textContent=popupInputJobs.value;
    togglePopup ();
}
 formElement.addEventListener('submit', formSubmitHandler);

