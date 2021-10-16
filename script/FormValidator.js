export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    this._errorElement.innerText = errorMessage;
    this._errorElement.classList.add(this._validationConfig.errorClass);
  }

  hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    this._errorElement.classList.remove(this._validationConfig.errorClass);
    this._errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    !inputElement.validity.valid ?
      this._showInputError(inputElement, inputElement.validationMessage) :
      this.hideInputError(inputElement);
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  toggleButtonState() {

    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(
        this._validationConfig.inactiveButtonClass
      );
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(
        this._validationConfig.inactiveButtonClass
      );
      this._buttonElement.removeAttribute("disabled", false);
    }
  }

  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach(input => {
      this.hideInputError(input);
    });

    this.toggleButtonState();
  }
}
