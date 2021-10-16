export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButtonClass = 'popup__close';
    this._openedPopupClass = 'popup_opened';
    this._closeEscHandle = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add(this._openedPopupClass);
    document.addEventListener('keydown', this._closeEscHandle);
  }

  close() {
    this._popup.classList.remove(this._openedPopupClass);
    document.removeEventListener('keydown', this._closeEscHandle);
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(this._openedPopupClass)) {
          this.close();
      }
      if (evt.target.classList.contains(this._closeButtonClass)) {
          this.close();
      }
    })
  }
}
