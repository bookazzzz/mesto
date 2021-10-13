import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super (popupSelector);

    this._bigImageSelector = '.popup__big-img';
    this._image = this._popup.querySelector(this._bigImageSelector)
    this._bigImageTitlelSelector = '.popup__name-big-img';
    this._imageTitle = this._popup.querySelector(this._bigImageTitlelSelector)
  }

  open(title, src) {
    super.open();

    this._image.src = src;
    this._image.alt = title;
    this._imageTitle.textContent = title;
  }
}
