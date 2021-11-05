import Popup from "../components/Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, formSelector }) {
    super(popupSelector)

    this._formElement = document.querySelector(formSelector)
    this._buttonDelete = document.querySelector('.popup_delete-cofirm').querySelector('.popup__submit-delete')
  }

  setSubmitHandler(submitForm) {

    this._submitForm = submitForm

  }

  setEventListeners() {

    super.setEventListeners()
    this._buttonDelete.addEventListener('click', (event) => {
      event.preventDefault()
      this._submitForm()
    })

  }
}
