  export default class UserInfo {
  constructor ({nameSelector, aboutSelector, avatarSelector,_id}) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
    this._userAvatar = document.querySelector(avatarSelector);
    this._id =_id;
  }

  getId(){
    return this._id;
  }

  getUserInfo() {
    return {name:   this._userName.textContent,
            about:  this._userAbout.textContent,
            avatar: this._userAvatar.src};
  }

  setUserInfo({ name,about,avatar,_id}) {
    if (name) this._userName.textContent = name;
    if (about) this._userAbout.textContent = about;
    if (avatar) this._userAvatar.src = avatar;
    if (_id) this._id = _id;
  }

}
