import Popup from "../components/Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, formSelector }) {
    super(popupSelector)

    this._formElement = document.querySelector(`${popupSelector} ${formSelector}`);
  }

  setSubmitHandler(submitForm) {
    this._submitForm = submitForm
  }

  setEventListeners() {
    super.setEventListeners()
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault()
      this._submitForm()
    })
  }
}
