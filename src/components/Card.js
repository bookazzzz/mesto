export class Card {
  constructor(name, link, owner, _id, likes, currentUserId, cardSelector, elementClickHandler) {
      this._name = name;
      this._link = link;

      this._owner = owner;
      this._id = _id;
      this._likes = likes;
      this._currentUserId = currentUserId;

      this._cardSelector = cardSelector;
      this._elementClickHandler = elementClickHandler;
  }
  _getTemplate() {
      return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
  }
  generateCard() {
      this._element = this._getTemplate();
      const image = this._element.querySelector('.element__image');
      image.src = this._link;
      image.alt = this._name;
      this._element.querySelector('.element__name').textContent = this._name;
      this._likeButtonElement = this._element.querySelector('.element__heart');
      this._likeCounterElement = this._element.querySelector('.element__likes-count');
      this._deleteButtonElement = this._element.querySelector('.element__delete');
      this._setEventListeners();
      return this._element;
  }



  _deleteCard() {
      this._element.remove();
      this._element = null;
  }
  _likeCard() {
      const buttonLike = this._element.querySelector('.element__heart');
      buttonLike.classList.toggle('element__heart_fill');
  }
  _setEventListeners() {
      this._element.querySelector('.element__heart').addEventListener('click', () => {
          this._likeCard()
      });
      this._element.querySelector('.element__delete').addEventListener('click', () => {
          this._deleteCard()
      });
      this._element.querySelector('.element__image').addEventListener('click', this._elementClickHandler.bind(this));
  }

setCardInfo({_id, name, link, likes}) {
    this._name = name;
    this.link = link;
    this._id = _id;
    this.setLikes(likes);
    this._updateViewsCard();
  }


}
