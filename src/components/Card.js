export class Card {
  constructor({data,currentUserId,cardSelector,handleLike,handleRemove,elementClickHandler}) {
    this._id = data._id
    this._name = data.name
    this._link = data.link
    this._likes = data.likes
    this._ownerId = data.owner._id

    this._currentUserId = currentUserId
    this._cardSelector = cardSelector;
    this._handleLike = handleLike
    this._handleRemove = handleRemove
    this._elementClickHandler = elementClickHandler;
  }
  _getTemplate() {
    return this._cardSelector.content.querySelector('.element').cloneNode(true)
  }

  generateCard() {
      this._element = this._getTemplate();
      const image = this._element.querySelector('.element__image');
      image.src = this._link;
      image.alt = this._name;
      this._element.querySelector('.element__name').textContent = this._name;
      this._element.querySelector('.element__delete').classList.add(
        this._currentUserId === this._ownerId ? 'element__delete_active' : 'element__delete_hidden'
    )
    this._likeButtonElement = this._element.querySelector('.element__heart')
    this._updateLikes()
    this._setEventListeners()

    return this._element

  }

  isLiked() {
    return Boolean(this._likes.find(user => user._id === this._currentUserId))
  }

  setLikes(likes) {
    this._likes = likes
    this._updateLikes()
  }

  deleteCard() {
      this._element.remove();
      this._element = null;
  }
  _likeCard() {
      const buttonLike = this._element.querySelector('.element__heart');
      buttonLike.classList.toggle('element__heart_fill');
  }

  getId() {
    return this._id
  }


  _setEventListeners() {
      this._element.querySelector('.element__heart').addEventListener('click', () => {
          this._likeCard()
      });
      this._element.querySelector('.element__delete').addEventListener('click', () => {
          this.deleteCard()
      });
      this._element.querySelector('.element__image').addEventListener('click', this._elementClickHandler.bind(this));
  }

  _updateLikes() {
    this._element.querySelector('.element__likes-count').textContent = this._likes.length

    if (this.isLiked()) {
      this._likeButtonElement.classList.add('element__heart_fill')
    } else {
      this._likeButtonElement.classList.remove('element__heart_fill')
    }
  }
}
