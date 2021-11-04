import Popup from "../components/Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, formSelector }) {
    super(popupSelector)

    this._formElement = document.querySelector(formSelector)
  }

  setSubmitHandler(handleSubmit) {
    this._handleSubmit = handleSubmit
  }

  setEventListeners() {
    super.setEventListeners()

    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault()

      this._handleSubmit()
    })
  }
}
