import Popup from "../components/Popup.js";
export default class PopupWithForm extends Popup {
  constructor (popupSelector, formSubmit) {
    super (popupSelector)

    this._formSubmit = formSubmit;
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
      this._formSubmit(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this.form.reset();
  }
}
