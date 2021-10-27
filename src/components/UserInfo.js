  export default class UserInfo {
  _userName
  _userId
  _userAvatar
  _userAbout

  constructor ({nameSelector, aboutSelector, avatarSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {name:   this._userName.textContent,
            about:  this._userAbout.textContent,
            id:     this._userId,
            avatar: this._userAvatar.src};
  }

  setUserInfo(properties) {
    this._userName.textContent = properties.name;
    this._userAbout.textContent = properties.about;
    this._userAvatar.src = properties.avatar;
    this._userId = properties._id;
  }
}
