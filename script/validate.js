//включение видимости ошибки
const showInputError = (formElement,inputElement,errorElement,inputErrorClass,errorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass)
};


//скрытие видимости ошибки
const hideInputError = (formElement,inputElement,errorElement,inputErrorClass,errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Функция проверяет валидность поля
const checkInputValidity = (formElement,inputElement,inputErrorClass,errorClass) => {
  const errorElement = formElement.querySelector('#${inputElement.id}-error');
  if (!inputElement.validity.valid) {
    showInputError(formElement,inputElement,errorElement,inputErrorClass,errorClass);
  } else {
    hideInputError(formElement,inputElement,errorElement,inputErrorClass,errorClass);
  }
};

//Поиск ошибки в форме
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

//Выключение кнопки
const disableSubmitButton = (buttonElement,inactiveButtonClass) => {
   buttonElement.classList.add(inactiveButtonClass);
};
//Включение кнопки
const enableSubmitButton = (buttonElement,inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
};
// Проверка кнопки сабмита и переключение состояния кнопки
const toggleButtonState = (formElement,inputList, submitButtonSelector,inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }
};


//Навешиваем обработчики событий на формы
const setEventListeners = (formElement,inputSelector,submitButtonSelector, inputErrorClass,errorClass, inactiveButtonClass) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
   });

   const inputList = Array.from(formElement.querySelectorAll(inputSelector)); // ищем поля у формы
   inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement,inputElement,inputErrorClass,errorClass);
        toggleButtonState(formElement,inputList,submitButtonSelector,inactiveButtonClass);
      });
   });
};

//Функция валидации форм
const enableValidation = (config) => {
   const formList = document.querySelectorAll(config.formSelector); // ищем все формы
   formList.forEach(formElement => {
    setEventListeners(formElement,config.inputSelector,config.submitButtonSelector,config.inputErrorClass,config.errorClass,config.inactiveButtonClass);
   });
};


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
