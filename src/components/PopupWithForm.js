import Popup from "../components/Popup.js";
export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitForm) {
    super (popupSelector)

    this._submitForm = submitForm;
    this.form = this._popup.querySelector('.popup__form');
    this._formInputs = Array.from(this.form.querySelectorAll('.popup__field'));
  }

 //Получаем все поля инпутов
  _getInputValues() {
    const inputValues = {};

    this._formInputs.forEach(formInput => {
      inputValues[formInput.name] = formInput.value;
    });

    return inputValues;
  }
 //добавляем обработчик сабмита формы при закрытии
  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this.form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
        this._popupButton.textContent = 'Сохранение...'
    } else {
        this._popupButton.textContent = this._popupButtonTextContent
    }
}
}
